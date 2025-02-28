import { Glob } from "./glob.js";
import { Settings } from "./settings.js";
import { Audio } from "./audio.js";
import { Instruments } from "./instruments.js";
import { Measure } from "./measure.js";
import { Measures } from "./measures.js";
import { Presets } from "./presets.js";
import { Test } from "./test.js";

let activeSources = [];
let overlayContext;
let patternContext;

Glob.init();

function applyPresetPattern() {
  let column = 0;
  let hit = 0;
  let hits = [];
  let nStart = 0;
  let nStop = 0;
  let odd = false;
  const row = Glob.tryParseInt(document.getElementById("presetPatternInstrument").value, 0);
  const pattern = Glob.tryParseInt(document.getElementById("presetPatternSelector").value, 0);
  const clearOtherColumns = document.getElementById("presetPatternClear").checked;
  const allMeasures = document.getElementById("presetPatternAllMeasures").checked;
  if (allMeasures) {
    nStart = 0;
    nStop = Measures.measures.length - 1;
  } else {
    nStart = Glob.currentMeasure;
    nStop = nStart;
  }
  for (let m = nStart; m <= nStop; m++) {
    odd = false;
    const measure = Measures.measures[m];
    Glob.currentMeasure = m;
    for (let i = 0; i < measure.beats; i++) {
      for (let j = 0; j < measure.divisions; j++) {
        odd = !odd;
        column = (i * measure.divisions) + j;
        if (clearOtherColumns) {
          Instruments.setCell(column, row, 0);
        }
        switch (pattern) {
          case 0:
            // Never (clear row)
            Instruments.setCell(column, row, 0);
            break;
          case 1:
            // Every beat
            if (j === 0) {
              Instruments.setCell(column, row, 1);
            }
            break;
          case 2:
            // Every column
            Instruments.setCell(column, row, 1);
            break;
          case 3:
            // Odd columns
            if (odd) {
              Instruments.setCell(column, row, 1);
            }
            break;
          case 4:
            // Even column
            if (!odd) {
              Instruments.setCell(column, row, 1);
            }
            break;
          case 5:
            // Random
            if (Math.random() > 0.5) {
              Instruments.setCell(column, row, 1);
            }
            break;
          case 6:
            // Every column of last beat
            if (i === measure.beats - 1) {
              Instruments.setCell(column, row, 1);
            }
            break;
          case 7:
          case 8:
            // Every column of last beat (soft to hard)
            if (i === measure.beats - 1) {
              switch (measure.divisions) {
                case 1:
                  hits = [1];
                  break;
                case 2:
                  hits = [2, 1];
                  break;
                case 3:
                  hits = [2, 1, 3];
                  break;
                case 4:
                  hits = [4, 2, 1, 3];
                  break;
                case 5:
                  hits = [4, 2, 1, 3, 5];
                  break;
                case 6:
                  hits = [4, 4, 2, 1, 3, 5];
                  break;
                case 7:
                  hits = [4, 4, 2, 2, 1, 3, 5];
                  break;
                case 8:
                  hits = [4, 4, 2, 2, 1, 1, 3, 5];
                  break;
                case 9:
                  hits = [4, 4, 2, 2, 1, 1, 3, 3, 5];
                  break;
                case 10:
                  hits = [4, 4, 2, 2, 1, 1, 3, 3, 5, 5];
                  break;
                default:
                  hits = [4, 4, 4, 2, 2, 2, 1, 1, 1, 3, 3, 3, 5, 5, 5];
                  break;
              }
              if (pattern === 8) {
                hits.reverse();
              }
              hit = j;
              if (hit >= hits.length) {
                hit = hits.length - 1;
              }
              Instruments.setCell(column, row, hits[hit]);
            }
            break;
          default:
            break;
        }
      }
    }
  }
  drawPattern();
}

function disableWhilePlaying() {
  Glob.settings.instrumentSetSelector.disabled = Glob.playing;
  Glob.settings.loadRhythmButton.disabled = Glob.playing;
  Glob.settings.newButton.disabled = Glob.playing;
  Glob.settings.openButton.disabled = Glob.playing;
  Glob.settings.saveButton.disabled = Glob.playing;
  Glob.settings.previousMeasureButton.disabled = Glob.playing;
  Glob.settings.nextMeasureButton.disabled = Glob.playing;
  Glob.settings.clearMeasureButton.disabled = Glob.playing;
  Glob.settings.addMeasureButton.disabled = Glob.playing;
  Glob.settings.deleteMeasureButton.disabled = Glob.playing;
  Glob.settings.addBeatButton.disabled = Glob.playing;
  Glob.settings.deleteBeatButton.disabled = Glob.playing;
  Glob.settings.incDivisionButton.disabled = Glob.playing;
  Glob.settings.decDivisionButton.disabled = Glob.playing;
  Glob.settings.copyMeasureButton.disabled = Glob.playing;
  Glob.settings.expertCheckbox.disabled = Glob.playing;
  Glob.settings.applyPresetPatternButton.disabled = Glob.playing;
}

function drawPattern(currentColumn = -1) {
  let columns = 0;
  let dx1 = 0;
  let dy1 = 0;
  let factor = 1;
  let fontSize = 0;
  let n = 0;
  let divisionsPerBeat = 0;
  let divisionsPerMeasure = 0;
  let measureStatus = "";
  let radius = 0;
  let text = "";

  const measure = Measures.measures[Glob.currentMeasure];
  divisionsPerBeat = measure.divisions;
  divisionsPerMeasure = measure.bassDrum.length;
  const rows = Instruments.sets[Glob.settings.instrumentSet].length;
  columns = divisionsPerMeasure;
  const labelWidth = 135;
  dx1 = 25;
  dy1 = 25;

  const pattern = Glob.settings.pattern;

  resizeCanvasIfNeeded(pattern, labelWidth, columns, dx1, rows, dy1);

  overlayContext.clearRect(0, 0, overlay.width, overlay.height);
  if (currentColumn !== -1) {
    overlayContext.fillStyle = 'rgba(255, 0, 0, 0.3)';
    overlayContext.fillRect(currentColumn * dx1 + labelWidth, 0, dx1, overlay.height);
    return;
  }

  patternContext.clearRect(0, 0, pattern.width, pattern.height);

  // console.log(
  //   `Width: ${pattern.width}, Height: ${pattern.height}, ClientWidth: ${pattern.clientWidth}, ClientHeight: ${pattern.clientHeight}`
  // );

  // Labels
  patternContext.lineWidth = 2;
  patternContext.strokeStyle = "white";
  fontSize = dy1 * 0.6;
  patternContext.font = `${fontSize}px arial`;
  patternContext.textAlign = "left";
  patternContext.beginPath;
  measureStatus = `Measure ${Glob.currentMeasure + 1}/${Measures.measures.length}`;
  patternContext.fillText(measureStatus, 10, dy1 * 0.75);
  patternContext.strokeStyle = "white";
  for (let i = 0; i < rows; i++) {
    patternContext.beginPath;
    patternContext.fillStyle = "blue";
    patternContext.fillRect(0, i * dy1 + dy1, labelWidth, dy1);
    patternContext.strokeRect(0, i * dy1 + dy1, labelWidth, dy1);
    patternContext.fillStyle = "white";
    patternContext.fillText(Instruments.sets[Glob.settings.instrumentSet][i].name, 10, i * dy1 + (dy1 * 1.75));
  }
  patternContext.textAlign = "center";
  n = 1;
  for (let i = 0; i < columns; i++) {
    patternContext.beginPath;
    patternContext.fillStyle = "blue";
    patternContext.fillRect(i * dx1 + labelWidth, 0, dx1, dy1);
    patternContext.strokeRect(i * dx1 + labelWidth, 0, dx1, dy1);
    patternContext.fillStyle = "white";
    if ((i % divisionsPerBeat) === 0) {
      patternContext.fillText(n.toString(), i * dx1 + labelWidth + (dx1 / 2), dy1 * 0.75, dx1 * 0.9);
      n++;
    }
  }
  // Pattern
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const cellValue = Instruments.getCell(Glob.currentMeasure, j, i);

      patternContext.lineWidth = 2;
      patternContext.fillStyle = "white";
      patternContext.strokeStyle = "black";
      patternContext.beginPath;
      patternContext.fillRect(j * dx1 + labelWidth, i * dy1 + dy1, dx1, dy1);
      patternContext.strokeRect(j * dx1 + labelWidth, i * dy1 + dy1, dx1, dy1);
      patternContext.fillStyle = "black";

      if ((cellValue >= 7) && (cellValue <= 9)) {
        // Additional hit
        switch (cellValue) {
          case 7:
            factor = 0.2;
            break;
          case 8:
            factor = 0.3;
            break;
          case 9:
            factor = 0.1;
            break;
          default:
            factor = 0.2;
            break;
        }
        patternContext.lineWidth = 4;
        patternContext.beginPath();
        patternContext.moveTo(j * dx1 + labelWidth + (dx1 * factor), i * dy1 + (1.5 * dy1));
        patternContext.lineTo(j * dx1 + labelWidth + (dx1 * (1 - factor)), i * dy1 + (1.5 * dy1));
        patternContext.moveTo(j * dx1 + labelWidth + (dx1 * 0.5), i * dy1 + ((1 + factor) * dy1));
        patternContext.lineTo(j * dx1 + labelWidth + (dx1 * 0.5), i * dy1 + ((1 + (1 - factor)) * dy1));
        patternContext.stroke();
      } else if ((cellValue >= 10) && (cellValue <= 15)) {
        switch (cellValue) {
          case 10:
            text = "E";
            break;
          case 11:
            text = "e";
            break;
          case 12:
            text = "F";
            break;
          case 13:
            text = "f";
            break;
          case 14:
            text = "3";
            break;
          case 15:
            text = "4";
            break;
          default:
            text = "-";
            break;
        }
        patternContext.fillText(text, j * dx1 + labelWidth + (dx1 / 2), i * dy1 + dy1 * 1.75, dx1 * 0.9);
      } else if (cellValue > 0) {
        switch (cellValue) {
          case 1:
            factor = 0.6;
            break;
          case 2:
            factor = 0.4;
            break;
          case 3:
            factor = 0.8;
            break;
          case 4:
            factor = 0.2;
            break;
          case 5:
            factor = 1;
            break;
          default:
            factor = 0.6;
            break;
        }
        radius = dx1 * 0.4 * factor;
        if (cellValue === 6) {
          // Flam
          patternContext.beginPath();
          patternContext.ellipse(j * dx1 + labelWidth + (dx1 * 0.65), i * dy1 + (1.5 * dy1), radius, radius, 0, 0, 2 * Math.PI);
          patternContext.fill();
          radius = dx1 * 0.4 * 0.35;
          patternContext.ellipse(j * dx1 + labelWidth + (dx1 * 0.2), i * dy1 + (1.5 * dy1), radius, radius, 0, 0, 2 * Math.PI);
          patternContext.fill();
        } else {
          patternContext.beginPath();
          patternContext.ellipse(j * dx1 + labelWidth + (dx1 / 2), i * dy1 + (1.5 * dy1), radius, radius, 0, 0, 2 * Math.PI);
          patternContext.fill();
        }
      }
    }
  }
  updateEndsWithFill();
}

function expertClicked() {
  Glob.settings.expert = document.getElementById("expert").checked;
  if (Glob.settings.expert) {
    alert("Be careful, you are now in Expert mode!!");
  }
}

function fillPatternInstruments() {
  let selector = document.getElementById("presetPatternInstrument");
  selector.innerHTML = ""; // Remove all options
  Instruments.sets[Glob.settings.instrumentSet].forEach((instrument, index) => {
    const name = instrument.name;
    let option = document.createElement("option");
    option.textContent = name;
    option.value = index;
    selector.appendChild(option);
  });
  switch (Glob.settings.instrumentSet) {
    case 0:
      // Drums
      selector.selectedIndex = 8;
      break;
    case 1:
      // Greek percussion
      selector.selectedIndex = 2;
      break;
    default:
      selector.selectedIndex = 0;
      break;
  }
}

function instrumentSetChanged() {
  Glob.settings.instrumentSet = Glob.tryParseInt(document.getElementById("instrumentSetSelector").value, 0);
  drawPattern();
  fillPatternInstruments();
}

function loopClicked() {
  Glob.settings.loop = document.getElementById("loop").checked;
}

async function openTextFile() {
  let fileVersion = 0;
  try {
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: "Text Files",
          accept: { "text/plain": [".dr"] },
        },
      ],
      multiple: false,
    });
    Glob.currentMeasure = 0;
    Glob.settings.instrumentSet = 0;
    const file = await fileHandle.getFile();
    if (!file.name.toLowerCase().endsWith(".dr")) {
      alert("Invalid file type. Please select a .dr file.");
      return;
    }
    const text = await file.text();
    const lines = text.split("\n");
    fileVersion = Glob.tryParseInt(lines[0], 0);
    Glob.settings.measuresToPlay = lines[1];
    Glob.settings.tempo = Glob.tryParseInt(lines[2], 0);
    if (fileVersion >= 2) {
      Glob.settings.instrumentSet = Glob.tryParseInt(lines[3], 0);
      Measures.measures = JSON.parse(lines[4]);
    } else {
      Measures.measures = JSON.parse(lines[3]);
    }
    Measures.addMissingProps();
    document.getElementById("instrumentSetSelector").selectedIndex = Glob.settings.instrumentSet;
    instrumentSetChanged();
    drawPattern();
    document.getElementById("measuresToPlayInput").value = Glob.settings.measuresToPlay;
    document.getElementById("tempoSlider").value = Glob.settings.tempo;
    tempoChanged();
  } catch (err) {
    console.error("Error opening file:", err);
  }
}

async function playPattern() {
  let currentTempo = 0;
  let factor = 1;
  let first = true;
  let found = false;
  let humanizeDeltaTime = 0;
  let humanizeTiming = 0;
  let humanizeVolumeFactor = 1;
  let humanizeVolumes = 0;
  const lookAheadFlam = 4;
  let numberOfGhostNotes = 0;
  let odd = false;
  let ok = true;
  let openHiHat = [];
  let playMeasures = [];
  let prevEndsWithFill = false;
  let volume = 0.75;
  const set = Glob.settings.instrumentSet;

  if (Glob.playing || (Measures.measures.length === 0)) {
    ok = false;
  }
  if (ok) {
    Glob.playing = true;
    disableWhilePlaying();
    odd = false;

    // Check if all URLs are cached
    if (!Instruments.fileNames.every(url => Audio.audioCache.has(url))) {
      await Audio.preloadAudioFiles(Instruments.fileNames);
    }

    const audioCtx = Audio.audioContext;
    //showMessage(audioCtx.state);
    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }

    let nextNoteTime = audioCtx.currentTime;  // Start at current time

    playMeasures = [];
    if (Glob.settings.measuresToPlay.trim() === "") {
      for (let i = 0; i < Measures.measures.length; i++) {
        playMeasures.push(i);
      }
    } else {
      const measureList = Glob.settings.measuresToPlay.split(",");
      for (let i = 0; i < measureList.length; i++) {
        const m = Glob.tryParseInt(measureList[i], -1);
        if ((m >= 1) && (m <= Measures.measures.length)) {
          playMeasures.push(m - 1);
        }
      }
    }

    const calculateFlamOffset = (measureIdx, columnIdx) => {
      let totalTime = 0;
      for (let i = 0; i < lookAheadFlam; i++) {
        const result = Measures.calculateMeasureAndColumn(measureIdx, columnIdx + i, playMeasures);
        const beatsPerMeasure = Measures.measures[result.measure].beats;
        const secondsPerBeat = 60.0 / currentTempo;
        totalTime += (secondsPerBeat * beatsPerMeasure) / Measures.measures[result.measure].bassDrum.length;
      }
      return totalTime;
    };

    first = true;
    prevEndsWithFill = false;
    while (!Glob.stop && (Glob.settings.loop || first)) {
      for (let i = 0; i < playMeasures.length && !Glob.stop; i++) {
        currentTempo = Glob.settings.tempo;
        odd = !odd;
        Glob.currentMeasure = playMeasures[i];
        scheduleDraw();
        const measure = Measures.measures[Glob.currentMeasure];
        const beatsPerMeasure = measure.beats;
        const divisionsPerMeasure = measure.bassDrum.length;

        let flamTime = Math.min(0.025, (60 / currentTempo) * 0.35);
        flamTime = 0.04;
        let ghostNoteTime = flamTime;
        const secondsPerBeat = 60.0 / currentTempo;
        const timeBetweenDivisions = (secondsPerBeat * beatsPerMeasure) / divisionsPerMeasure;

        // Check if there is a flam or roll
        let startDivision = 0;
        if (first && (i === 0)) {
          found = false;
          for (let c = 0; c < lookAheadFlam; c++) {
            Instruments.sets[set].forEach((instrument, idx) => {
              const checkFlam = Measures.calculateMeasureAndColumn(i, c, playMeasures);
              if ([6, 14, 15].includes(Instruments.getCell(checkFlam.measure, checkFlam.column, idx))) {
                found = true;
              }
            });
          }
          if (found) {
            startDivision = -lookAheadFlam;
          }
        }

        for (let j = startDivision; j < divisionsPerMeasure && !Glob.stop; j++) {
          if (j >= 0) {
            scheduleDraw(j);
          }

          const checkFlam = Measures.calculateMeasureAndColumn(i, j + lookAheadFlam, playMeasures);

          // Create and configure BufferSource nodes for each audio buffer
          Instruments.sets[set].forEach((instrument, idx) => {
            let url = instrument.fileName;
            let cellValue = 0;
            if (j >= 0) {
              cellValue = Instruments.getCell(Glob.currentMeasure, j, idx);
            }
            let cellValueFlam = Instruments.getCell(checkFlam.measure, checkFlam.column, idx);

            if ((cellValue >= 7) && (cellValue <= 9)) {
              // Additional hit
              if (Glob.settings.additional === 0) {
                cellValue = 0;
              }
              if (Glob.settings.additional === 2) {
                if (Math.random() > 0.5) {
                  cellValue = 0;
                }
              }
            }
            if (((cellValue === 10) && odd) || ((cellValue === 11) && !odd)) {
              cellValue = 0;
            }
            if (((cellValue === 12) && !prevEndsWithFill) || ((cellValue === 13) && prevEndsWithFill)) {
              cellValue = 0;
            }

            if ((cellValue === 0) && (cellValueFlam !== 6) && (cellValueFlam !== 14) && (cellValueFlam !== 15)) return;

            const audioBuffer = Audio.getCachedAudioBuffer(url);
            let source;
            let gainNode;

            if (cellValue > 0) {
              source = audioCtx.createBufferSource();
              source.started = false;
              source.isGhostNote = false;
              source.buffer = audioBuffer;
              gainNode = audioCtx.createGain();

              switch (cellValue) {
                case 1:
                case 7:
                case 10:
                case 11:
                case 12:
                case 13:
                  factor = 0.6;
                  break;
                case 2:
                case 8:
                  factor = 0.4;
                  break;
                case 3:
                case 9:
                  factor = 0.8;
                  break;
                case 4:
                  factor = 0.2;
                  break;
                case 5:
                  factor = 1;
                  break;
                case 6:
                  // Flam
                  factor = 0.6;
                  break;
                default:
                  factor = 0.6;
                  break;
              }
            }

            volume = Glob.settings.volume / 100;

            // Humanize
            humanizeVolumes = Glob.settings.humanizeVolumes / 10;
            if (humanizeVolumes > 0) {
              humanizeVolumeFactor = 1 + (0.5 * humanizeVolumes) - (Math.random() * humanizeVolumes);
            } else {
              humanizeVolumeFactor = 1;
            }
            humanizeTiming = Glob.settings.humanizeTiming / 35;
            if (humanizeTiming > 0) {
              humanizeDeltaTime = timeBetweenDivisions * ((0.5 * humanizeTiming) - (Math.random() * humanizeTiming));
            } else {
              humanizeDeltaTime = 0;
            }

            if (cellValue > 0) {
              gainNode.gain.value = 0.9 * factor * humanizeVolumeFactor * volume;
              source.connect(gainNode);
              gainNode.connect(audioCtx.destination);
            }

            let ghostNotes = [];
            switch (cellValueFlam) {
              case 6:
                numberOfGhostNotes = 1;
                break;
              case 14:
                numberOfGhostNotes = 2;
                break;
              case 15:
                numberOfGhostNotes = 3;
                break;
              default:
                numberOfGhostNotes = 0;
                break;
            }

            if (numberOfGhostNotes > 1) {
              ghostNoteTime = flamTime * 1;
            } else {
              ghostNoteTime = flamTime;
            }

            for (let g = 0; g < numberOfGhostNotes; g++) {
              ghostNotes.push({ source: audioCtx.createBufferSource(), gainNode: audioCtx.createGain() });
              ghostNotes[ghostNotes.length - 1].source.buffer = audioBuffer;
              ghostNotes[g].gainNode.gain.value = 0.9 * 0.4 * humanizeVolumeFactor * volume;
              ghostNotes[g].source.connect(ghostNotes[g].gainNode);
              ghostNotes[g].gainNode.connect(audioCtx.destination);
              ghostNotes[g].source.started = false;
              ghostNotes[g].source.isGhostNote = true;
            }

            if ((set === 0) && (idx === 7)) {
              if (cellValue > 0) {
                setTimeout(() => {
                  if (Glob.playing && !Glob.stop) {
                    openHiHat.push({ source, gainNode });
                  }
                }, (nextNoteTime + humanizeDeltaTime - audioCtx.currentTime) * 1000);
              }

              // Handle multiple ghost notes
              for (let g = 0; g < ghostNotes.length; g++) {
                setTimeout(() => {
                  if (Glob.playing && !Glob.stop) {
                    openHiHat.push({
                      source: ghostNotes[g].source,
                      gainNode: ghostNotes[g].gainNode
                    });
                  }
                }, (nextNoteTime + calculateFlamOffset(i, j) + (humanizeDeltaTime * 0.3) - ((g + 1) * ghostNoteTime) - audioCtx.currentTime) * 1000);
              }
            }

            if (cellValue > 0) {
              let sourceStart = nextNoteTime + humanizeDeltaTime;
              if (sourceStart < audioCtx.currentTime + 0.001) {
                sourceStart = audioCtx.currentTime + 0.001;
                //showMessage("sourceStart was too small");
              }
              source.onended = () => {
                openHiHat = openHiHat.filter(oh => oh.source !== source);
                source.disconnect();
                gainNode.disconnect();
                activeSources = activeSources.filter(active => active.source !== source);
              };
              source.start(sourceStart);
              source.started = true;  // Mark as started
              activeSources.push({ source, gainNode });
            }

            for (let g = 0; g < ghostNotes.length; g++) {
              let sourceFlamStart = nextNoteTime + calculateFlamOffset(i, j) + (humanizeDeltaTime * 0.3) - ((g + 1) * ghostNoteTime);
              if (sourceFlamStart < audioCtx.currentTime + 0.001) {
                sourceFlamStart = audioCtx.currentTime + 0.001;
                //showMessage("sourceFlamStart was too small");
              }
              ghostNotes[g].source.onended = () => {
                openHiHat = openHiHat.filter(oh => oh.source !== ghostNotes[g].source);
                ghostNotes[g].source.disconnect();
                ghostNotes[g].gainNode.disconnect();
                activeSources = activeSources.filter(active => active.source !== ghostNotes[g].source);
              };
              ghostNotes[g].source.start(sourceFlamStart);
              ghostNotes[g].source.started = true;
              activeSources.push({ source: ghostNotes[g].source, gainNode: ghostNotes[g].gainNode });
            }

            if ((set === 0) && (idx === 8 || idx === 15)) { // Closed Hi-Hat or Pedal Hi-Hat
              setTimeout(() => {
                openHiHat.forEach(oh => {
                  if (oh.source.started) {
                    try {
                      const fadeOutTime = Math.min(0.2, timeBetweenDivisions); // Time in seconds
                      oh.gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + fadeOutTime);
                      setTimeout(() => {
                        oh.source.stop();
                      }, fadeOutTime * 1000);
                    } catch (e) {
                      console.error("Error stopping open hi-hat:", e);
                    }
                  }
                });
                openHiHat = openHiHat.filter(oh => oh.source.started); // Keep only started ones
              }, (nextNoteTime + humanizeDeltaTime - audioCtx.currentTime) * 1000);
            }

          });

          nextNoteTime += timeBetweenDivisions;

          // Schedule a small lookahead to keep things running smoothly
          const lookahead = 0.1; // 100ms lookahead

          while (audioCtx.currentTime < nextNoteTime - lookahead) {
            await new Promise(resolve => setTimeout(resolve, 5)); // Check every 5ms
          }
        }
        prevEndsWithFill = measure.endsWithFill;
      }
      first = false;
    }
  }
  Glob.playing = false;
  disableWhilePlaying();
  Glob.stop = false;
  drawPattern();
}

function scheduleDraw(currentColumn = -1) {
  requestAnimationFrame(() => drawPattern(currentColumn));
}

function stopSounds(mode = 0) {
  // mode: 0 = all, 1 = ghost notes
  const audioCtx = Audio.audioContext;
  activeSources.forEach((active) => {
    if (active.source.started && (active.source.isGhostNote || (mode === 0))) {
      try {
        let fadeOutTime = 0.2;
        if (mode === 1) {
          fadeOutTime = 0.05;
        }
        active.gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + fadeOutTime);
        setTimeout(() => {
          active.source.stop();
        }, fadeOutTime * 1000);
      } catch (e) {
        console.error("Error stopping audio source:", e);
      }
    }
  });
  activeSources.length = 0; // Reset after stopping
}

function resizeCanvasIfNeeded(pattern, labelWidth, columns, dx1, rows, dy1) {
  const ratio = window.devicePixelRatio || 1;

  // Desired display size based on updated column/row values
  const displayWidth = labelWidth + (columns * dx1);
  const displayHeight = (rows + 1) * dy1;

  // Check if style dimensions need an update
  if (pattern.style.width !== `${displayWidth}px` || pattern.style.height !== `${displayHeight}px`) {
    pattern.style.width = `${displayWidth}px`;
    pattern.style.height = `${displayHeight}px`;
  }

  // Use getBoundingClientRect AFTER updating style to get the latest size
  const rect = pattern.getBoundingClientRect();
  const desiredCanvasWidth = rect.width * ratio;
  const desiredCanvasHeight = rect.height * ratio;

  // Only resize drawing buffer if needed
  if (pattern.width !== desiredCanvasWidth || pattern.height !== desiredCanvasHeight) {
    pattern.width = desiredCanvasWidth;
    pattern.height = desiredCanvasHeight;

    // Re-fetch and rescale context after resizing
    patternContext = pattern.getContext('2d');
    patternContext.scale(ratio, ratio);

    // Update the overlay
    overlay.width = desiredCanvasWidth;
    overlay.height = desiredCanvasHeight;
    overlay.style.width = pattern.style.width;
    overlay.style.height = pattern.style.height;
    overlayContext = overlay.getContext('2d');
    overlayContext.scale(ratio, ratio);
  }
}



async function saveTextFile() {
  const fileVersion = 2;
  let found = false;
  let saveMeasures = [];
  try {
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: "myPattern.dr", // Default filename
      types: [
        {
          description: "Text Files",
          accept: { "text/plain": [".dr"] },
        },
      ],
    });
    const writable = await fileHandle.createWritable();
    await writable.write(fileVersion.toString() + "\n");
    await writable.write(Glob.settings.measuresToPlay + "\n");
    await writable.write(Glob.settings.tempo.toString() + "\n");
    await writable.write(Glob.settings.instrumentSet.toString() + "\n");

    // Compact saving
    for (let i = 0; i < Measures.measures.length; i++) {
      const measure = Measures.measures[i];
      let saveMeasure = {};
      saveMeasure.beats = measure.beats;
      saveMeasure.divisions = measure.divisions;
      saveMeasure.endsWithFill = measure.endsWithFill;
      for (const prop in measure) {
        if (Array.isArray(measure[prop])) {
          found = false;
          for (let j = 0; j < measure[prop].length; j++) {
            if (measure[prop][j] > 0) {
              found = true;
            }
          }
          if (found) {
            saveMeasure[prop] = [];
            for (let j = 0; j < measure[prop].length; j++) {
              saveMeasure[prop].push(measure[prop][j]);
            }
          }
        }
      }
      saveMeasures.push(saveMeasure);
    }

    await writable.write(JSON.stringify(saveMeasures) + "\n");
    await writable.close();
  } catch (err) {
    console.error("Error saving file:", err);
  }
}

function showMessage(msg) {
  document.getElementById("message").innerText = msg;
  document.getElementById("message").style.visibility = "visible";
}

function updateEndsWithFill() {
  document.getElementById("endsWithFill").checked = Measures.measures[Glob.currentMeasure].endsWithFill;
}

function additionalChanged() {
  Glob.settings.additional = Glob.tryParseInt(document.getElementById("additionalSelector").value, 0);
}

function endsWithFillClicked() {
  Measures.measures[Glob.currentMeasure].endsWithFill = document.getElementById("endsWithFill").checked;
}

function humanizeTimingChanged() {
  Glob.settings.humanizeTiming = Glob.tryParseInt(document.getElementById("humanizeTimingSelector").value, 0);
}

function humanizeVolumesChanged() {
  Glob.settings.humanizeVolumes = Glob.tryParseInt(document.getElementById("humanizeVolumesSelector").value, 0);
}

function patternClicked(event) {
  const columns = Measures.measures[Glob.currentMeasure].bassDrum.length;
  const rows = Instruments.sets[Glob.settings.instrumentSet].length;
  const labelWidth = 275 / 2;
  const pattern = Glob.settings.pattern;
  const rect = pattern.getBoundingClientRect()
  const ch = rect.height;
  const cw = rect.width;
  let c = 0;
  let r = 0;
  let dx1 = 0;
  let dy1 = 0;
  dx1 = (cw - labelWidth) / columns;
  dy1 = ch / (rows + 1);
  if (dx1 > dy1) {
    dx1 = dy1;
  } else {
    dy1 = dx1;
  }
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const hit = Glob.tryParseInt(document.getElementById("inputSelector").value, 1);
  if ((x > labelWidth) && (y > dy1)) {
    c = Math.trunc((x - labelWidth) / dx1);
    r = Math.trunc((y - dy1) / dy1);
    if ((c >= 0) && (r >= 0) && (c < columns) && (r < rows)) {
      if (Instruments.getCell(Glob.currentMeasure, c, r) > 0) {
        Instruments.setCell(c, r, 0);
      } else {
        Instruments.setCell(c, r, hit);
      }
      scheduleDraw();
    }
  }
}

function tempoChanged() {
  Glob.settings.tempo = Glob.settings.tempoSlider.value;
  document.getElementById("tempoValue").innerText = Glob.settings.tempo.toString();
}

function volumeChanged() {
  Glob.settings.volume = Glob.settings.volumeSlider.value;
  document.getElementById("volumeValue").innerText = Glob.settings.volume.toString();
}

// To prevent error when using node
try {
  window.addEventListener("load", (e) => {
    if (Glob.settings === null) {
      Glob.settings = new Settings();
      //console.log("Settings loaded");
      Presets.fillRhythmSelect();
      document.getElementById("rhythmSelector").value = "Rock2";
      Measures.load("Rock2");
      document.getElementById("instrumentSetSelector").selectedIndex = Glob.settings.instrumentSet;
      instrumentSetChanged();
      document.getElementById("message").style.visibility = "hidden";
      document.getElementById("measuresToPlayInput").value = Glob.settings.measuresToPlay;
      document.getElementById("tempoSlider").value = Glob.settings.tempo;
      fillPatternInstruments();
      tempoChanged();
      volumeChanged();
      drawPattern();
      additionalChanged();
      humanizeVolumesChanged();
      humanizeTimingChanged();
    }
  });

  document.getElementById("categorySelector").addEventListener("change", (e) => {
    Presets.fillRhythmSelect();
  });

  document.getElementById("loadRhythmButton").addEventListener("click", (e) => {
    let rhythm = "Rock2";
    let userChoice = false;

    if (!Glob.playing) {
      rhythm = document.getElementById("rhythmSelector").value;
      if (!Glob.settings.expert) {
        userChoice = window.confirm(`Load rhythm?`);
      }
      if (userChoice || Glob.settings.expert) {
        Measures.load(rhythm);
        document.getElementById("instrumentSetSelector").selectedIndex = Glob.settings.instrumentSet;
        instrumentSetChanged();
        tempoChanged();
        document.getElementById("measuresToPlayInput").value = Glob.settings.measuresToPlay;
        volumeChanged();
        drawPattern();
      }
    }
  });

  document.getElementById("newButton").addEventListener("click", (e) => {
    let userChoice = false;
    if (!Glob.playing) {
      if (!Glob.settings.expert) {
        userChoice = window.confirm(`Do you want to create a new rhythm?`);
      }
      if (userChoice || Glob.settings.expert) {
        Glob.currentMeasure = 0;
        Glob.settings.instrumentSet = 0;
        Glob.settings.measuresToPlay = "";
        Glob.settings.tempoSlider.value = 120;
        const measure1 = new Measure();
        measure1.beats = 4;
        measure1.divisions = 4;
        Measure.fixMeasure(measure1);
        Measures.measures = [];
        Measures.measures.push(measure1);
        document.getElementById("instrumentSetSelector").selectedIndex = Glob.settings.instrumentSet;
        instrumentSetChanged();
        tempoChanged();
        document.getElementById("measuresToPlayInput").value = Glob.settings.measuresToPlay;
        drawPattern();
      }
    }
  });

  document.getElementById("openButton").addEventListener("click", (e) => {
    if (!Glob.playing) {
      openTextFile();
    }
  });

  document.getElementById("saveButton").addEventListener("click", (e) => {
    if (!Glob.playing) {
      saveTextFile();
    }
  });

  document.getElementById("tempoSlider").addEventListener("input", (e) => {
    tempoChanged();
    stopSounds(1);
  });

  document.getElementById("volumeSlider").addEventListener("input", (e) => {
    volumeChanged();
  });

  document.getElementById("instrumentSetSelector").addEventListener("change", (e) => {
    instrumentSetChanged();
  });

  document.getElementById('measuresToPlayInput').addEventListener('input', function () {
    Glob.settings.measuresToPlay = document.getElementById('measuresToPlayInput').value;
  });

  document.getElementById("loop").addEventListener("click", (e) => {
    loopClicked();
  });

  document.getElementById("startStopButton").addEventListener("click", (e) => {
    if (Glob.playing) {
      Glob.stop = true;
      stopSounds();
    } else {
      playPattern();
    }
  });

  document.getElementById("pattern").addEventListener("mousedown", (e) => {
    patternClicked(e)
  });

  document.getElementById("previousMeasureButton").addEventListener("click", (e) => {
    if (!Glob.playing && (Glob.currentMeasure > 0)) {
      Glob.currentMeasure--;
      drawPattern();
    }
  });

  document.getElementById("nextMeasureButton").addEventListener("click", (e) => {
    if (!Glob.playing && (Glob.currentMeasure < Measures.measures.length - 1)) {
      Glob.currentMeasure++;
      drawPattern();
    }
  });

  document.getElementById("clearMeasureButton").addEventListener("click", (e) => {
    let userChoice = false;
    if (!Glob.playing) {
      if (!Glob.settings.expert) {
        userChoice = window.confirm(`Clear measure ${Glob.currentMeasure + 1}?`);
      }
      if (userChoice || Glob.settings.expert) {
        const measure = Measures.measures[Glob.currentMeasure];
        for (let r = 0; r < Instruments.names.length; r++) {
          for (let c = 0; c < measure.bassDrum.length; c++) {
            Instruments.setCell(c, r, 0);
          }
        }
        drawPattern();
      }
    }
  });

  document.getElementById("addMeasureButton").addEventListener("click", (e) => {
    if (!Glob.playing) {
      const measure = Measures.measures[Glob.currentMeasure];
      const newMeasure = new Measure();
      newMeasure.beats = measure.beats;
      newMeasure.divisions = measure.divisions;
      Measures.measures.push(newMeasure);
      Measure.fixMeasure(newMeasure);
      Glob.currentMeasure = Measures.measures.length - 1;
      drawPattern();
    }
  });

  document.getElementById("deleteMeasureButton").addEventListener("click", (e) => {
    let userChoice = false;
    if (!Glob.playing && Measures.measures.length > 1) {
      if (!Glob.settings.expert) {
        userChoice = window.confirm(`Delete measure ${Glob.currentMeasure + 1}?`);
      }
      if (userChoice || Glob.settings.expert) {
        Measures.measures.splice(Glob.currentMeasure, 1);
        Glob.currentMeasure--;
        if (Glob.currentMeasure < 0) {
          Glob.currentMeasure = 0;
        }
        drawPattern();
      }
    }
  });

  document.getElementById("addBeatButton").addEventListener("click", (e) => {
    let userChoice = false;
    const measure = Measures.measures[Glob.currentMeasure];
    if (!Glob.playing) {
      if (!Glob.settings.expert) {
        userChoice = window.confirm(`Add a beat to the current measure?`);
      }
      if (userChoice || Glob.settings.expert) {
        measure.beats++;
        Measure.fixMeasure(measure);
        drawPattern();
      }
    }
  });

  document.getElementById("deleteBeatButton").addEventListener("click", (e) => {
    let userChoice = false;
    const measure = Measures.measures[Glob.currentMeasure];
    if (!Glob.playing && (measure.beats > 1)) {
      if (!Glob.settings.expert) {
        userChoice = window.confirm(`Delete the last beat of the current measure?`);
      }
      if (userChoice || Glob.settings.expert) {
        measure.beats--;
        Measure.fixMeasure(measure);
        drawPattern();
      }
    }
  });

  document.getElementById("incDivisionButton").addEventListener("click", (e) => {
    let userChoice = false;
    const measure = Measures.measures[Glob.currentMeasure];
    if (!Glob.playing) {
      if (!Glob.settings.expert) {
        userChoice = window.confirm(`Increase the beat division of the current measure?`);
      }
      if (userChoice || Glob.settings.expert) {
        measure.divisions++;
        Measure.fixMeasure(measure);
        drawPattern();
      }
    }
  });

  document.getElementById("decDivisionButton").addEventListener("click", (e) => {
    let userChoice = false;
    const measure = Measures.measures[Glob.currentMeasure];
    if (!Glob.playing && (measure.divisions > 1)) {
      if (!Glob.settings.expert) {
        userChoice = window.confirm(`Decrease the beat division of the current measure?`);
      }
      if (userChoice || Glob.settings.expert) {
        measure.divisions--;
        Measure.fixMeasure(measure);
        drawPattern();
      }
    }
  });

  document.getElementById("copyMeasureButton").addEventListener("click", (e) => {
    let copyFrom = 1;
    let copyTo = 1;
    let userChoice = false;

    if (!Glob.playing && Measures.measures.length > 1) {
      copyFrom = Glob.tryParseInt(document.getElementById("copyMeasureFrom").value, -1);
      copyTo = Glob.tryParseInt(document.getElementById("copyMeasureTo").value, -1);
      if ((copyFrom >= 1) && (copyTo >= 1) && (copyFrom !== copyTo) &&
        (copyFrom <= Measures.measures.length) && (copyTo <= Measures.measures.length)) {
        if (!Glob.settings.expert) {
          userChoice = window.confirm(`Copy measure ${copyFrom} to measure ${copyTo}?`);
        }
        if (userChoice || Glob.settings.expert) {
          Measures.copyMeasure(copyFrom, copyTo);
          drawPattern();
        }
      }
    }
  });

  document.getElementById("additionalSelector").addEventListener("change", (e) => {
    additionalChanged();
  });

  document.getElementById("humanizeVolumesSelector").addEventListener("change", (e) => {
    humanizeVolumesChanged();
  });

  document.getElementById("humanizeTimingSelector").addEventListener("change", (e) => {
    humanizeTimingChanged();
  });

  document.getElementById("expert").addEventListener("click", (e) => {
    expertClicked();
  });

  document.getElementById("endsWithFill").addEventListener("click", (e) => {
    endsWithFillClicked();
  });

  document.getElementById("message").addEventListener("click", (e) => {
    document.getElementById("message").style.visibility = "hidden";
  });

  document.getElementById("applyPresetPatternButton").addEventListener("click", (e) => {
    let userChoice = false;
    if (!Glob.playing) {
      if (!Glob.settings.expert) {
        userChoice = window.confirm(`Apply the preset pattern?`);
      }
      if (userChoice || Glob.settings.expert) {
        applyPresetPattern();
      }
    }
  });

  document.getElementById("testButton").addEventListener("click", (e) => {
    Test.runTests();
    drawPattern();
  });


  Instruments.init();
  Audio.init();
} catch (e) {
  if (typeof window !== 'undefined') {
    console.log(e);
  }
}


