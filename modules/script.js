import { Glob } from "./glob.js";
import { Settings } from "./settings.js";
import { Audio } from "./audio.js";
import { Instruments } from "./instruments.js";
import { Measure } from "./measure.js";
import { Measures } from "./measures.js";

Glob.init();

function drawPattern(currentColumn = -1) {
  let ch = 0;
  let columns = 0;
  let cw = 0;
  let dx1 = 0;
  let dy1 = 0;
  let factor = 1;
  let fontSize = 0;
  let labelWidth;
  let n = 0;
  let divisionsPerBeat = 0;
  let divisionsPerMeasure = 0;
  let measureStatus = "";
  let radius = 0;
  let rows = 0;
  let text = "";

  const pattern = Glob.settings.pattern;
  pattern.height = pattern.clientHeight * 2;
  pattern.width = pattern.clientWidth * 2;
  const patternContext = pattern.getContext("2d");

  patternContext.reset();

  // console.log(
  //   `Width: ${pattern.width}, Height: ${pattern.height}, ClientWidth: ${pattern.clientWidth}, ClientHeight: ${pattern.clientHeight}`
  // );

  const measure = Measures.measures[Glob.currentMeasure];
  divisionsPerBeat = measure.divisions;
  divisionsPerMeasure = measure.bassDrum.length;
  columns = divisionsPerMeasure;
  rows = 16;
  labelWidth = 275;
  ch = pattern.height;
  cw = pattern.width;
  dx1 = (cw - labelWidth) / columns;
  dy1 = ch / (rows + 1);
  if (dx1 > dy1) {
    dx1 = dy1;
  } else {
    dy1 = dx1;
  }
  // Labels
  patternContext.lineWidth = 2;
  patternContext.strokeStyle = "white";
  fontSize = Glob.minMax(dy1 - 15, 5, dy1 - 10);
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
    patternContext.fillText(Instruments.names[i], 10, i * dy1 + (dy1 * 1.75));
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
      const cellValue = getCell(j, i);

      patternContext.lineWidth = 2;
      if (currentColumn === j) {
        patternContext.fillStyle = "black";
        patternContext.strokeStyle = "white";
      } else {
        patternContext.fillStyle = "white";
        patternContext.strokeStyle = "black";
      }
      patternContext.beginPath;
      patternContext.fillRect(j * dx1 + labelWidth, i * dy1 + dy1, dx1, dy1);
      patternContext.strokeRect(j * dx1 + labelWidth, i * dy1 + dy1, dx1, dy1);
      if (currentColumn === j) {
        patternContext.fillStyle = "white";
      } else {
        patternContext.fillStyle = "black";
      }

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
      } else if ((cellValue >= 10) && (cellValue <= 13)) {
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

async function openTextFile() {
  let fileVersion = 0;
  try {
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: "Text Files",
          accept: { "text/plain": [".txt"] },
        },
      ],
      multiple: false,
    });
    const file = await fileHandle.getFile();
    const text = await file.text();
    const lines = text.split("\n");
    fileVersion = Glob.tryParseInt(lines[0], 0);
    Glob.settings.tempo = Glob.tryParseInt(lines[1], 0);
    Measures.measures = JSON.parse(lines[2]);
    drawPattern();
    document.getElementById("tempoSlider").value = Glob.settings.tempo;
    tempoChanged();
  } catch (err) {
    console.error("Error opening file:", err);
  }
}

async function playPattern() {
  let factor = 1;
  let humanizeDeltaTime = 0;
  let humanizeTiming = 0;
  let humanizeVolumeFactor = 1;
  let humanizeVolumes = 0;
  let odd = false;
  let ok = true;
  let openHiHat = [];
  let prevEndsWithFill = false;
  let volume = 0.75;

  if (Glob.playing || (Measures.measures.length === 0)) {
    ok = false;
  }
  if (ok) {
    Glob.playing = true;
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

    prevEndsWithFill = false;
    while (!Glob.stop) {
      for (let i = 0; i < Measures.measures.length && !Glob.stop; i++) {
        odd = !odd;
        Glob.currentMeasure = i;
        drawPattern();
        const measure = Measures.measures[i];
        const beatsPerMeasure = measure.beats;
        const divisionsPerMeasure = measure.bassDrum.length;

        let flamTime = Math.min(0.025, (60 / Glob.settings.tempo) * 0.1);
        const secondsPerBeat = 60.0 / Glob.settings.tempo;
        const timeBetweenDivisions = (secondsPerBeat * beatsPerMeasure) / divisionsPerMeasure;

        for (let j = 0; j < divisionsPerMeasure && !Glob.stop; j++) {
          drawPattern(j);
          // Create and configure BufferSource nodes for each audio buffer
          Instruments.fileNames.forEach((url, idx) => {
            let cellValue = getCell(j, idx);

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

            if (cellValue === 0) return;

            const audioBuffer = Audio.getCachedAudioBuffer(url);
            const source = audioCtx.createBufferSource();
            source.buffer = audioBuffer;
            const gainNode = audioCtx.createGain();
            const sourceFlam = audioCtx.createBufferSource();
            sourceFlam.buffer = audioBuffer;
            let gainNodeFlam;

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

            gainNode.gain.value = 0.9 * factor * humanizeVolumeFactor * volume;
            source.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            if (cellValue === 6) {
              gainNodeFlam = audioCtx.createGain();
              gainNodeFlam.gain.value = 0.9 * 0.4 * humanizeVolumeFactor * volume; // First hit of flam
              sourceFlam.connect(gainNodeFlam);
              gainNodeFlam.connect(audioCtx.destination);
            }

            if (idx === 7) {
              source.started = false;  // Add a custom property to track if the source has started
              setTimeout(() => {
                openHiHat.push({ source, gainNode });
              }, (nextNoteTime + humanizeDeltaTime - audioCtx.currentTime) * 1000); // Add at actual play time
              source.onended = () => {
                openHiHat = openHiHat.filter(oh => oh.source !== source); // Remove from list when it naturally ends
              };

              if (cellValue === 6) {
                sourceFlam.started = false;
                setTimeout(() => {
                  openHiHat.push({ sourceFlam, gainNodeFlam });
                }, (nextNoteTime + humanizeDeltaTime - flamTime - audioCtx.currentTime) * 1000);
                source.onended = () => {
                  openHiHat = openHiHat.filter(oh => oh.source !== sourceFlam);
                };
              }
            }

            let sourceStart = nextNoteTime + humanizeDeltaTime;
            if (sourceStart < audioCtx.currentTime + 0.001) {
              sourceStart = audioCtx.currentTime + 0.001;
              //showMessage("sourceStart was too small");
            }
            source.start(sourceStart);
            source.started = true;  // Mark as started

            // Memory cleanup after the note ends
            source.onended = () => {
              source.disconnect();
              gainNode.disconnect();
            };
            if (cellValue === 6) {
              // Flam
              let sourceFlamStart = nextNoteTime - flamTime + humanizeDeltaTime;
              if (sourceFlamStart < audioCtx.currentTime + 0.001) {
                sourceFlamStart = audioCtx.currentTime + 0.001;
                //showMessage("sourceFlamStart was too small");
              }
              sourceFlam.start(sourceFlamStart);
              sourceFlam.started = true;

              sourceFlam.onended = () => {
                sourceFlam.disconnect();
                gainNodeFlam.disconnect();
              };
            }

            if (idx === 8 || idx === 15) { // Closed Hi-Hat or Pedal Hi-Hat
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

          //const currentTime = audioCtx.currentTime;
          // if (nextNoteTime > currentTime + lookahead) {
          //   await new Promise(resolve => setTimeout(resolve, (nextNoteTime - currentTime - lookahead) * 1000));
          // }

          while (audioCtx.currentTime < nextNoteTime - lookahead) {
            await new Promise(resolve => setTimeout(resolve, 5)); // Check every 5ms
          }
        }
        prevEndsWithFill = measure.endsWithFill;
      }
    }
  }
  Glob.playing = false;
  Glob.stop = false;
  drawPattern();
}

async function saveTextFile() {
  const fileVersion = 1;
  try {
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: "myPattern.txt", // Default filename
      types: [
        {
          description: "Text Files",
          accept: { "text/plain": [".txt"] },
        },
      ],
    });
    const writable = await fileHandle.createWritable();
    await writable.write(fileVersion.toString() + "\n");
    await writable.write(Glob.settings.tempo.toString() + "\n");
    await writable.write(JSON.stringify(Measures.measures) + "\n");
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

function getCell(c, r) {
  const measure = Measures.measures[Glob.currentMeasure];
  const map = [
    measure.cowbell[c],
    measure.crashCymbal1[c],
    measure.crashCymbal2[c],
    measure.chineseCymbal[c],
    measure.splashCymbal[c],
    measure.rideBell[c],
    measure.rideCymbal[c],
    measure.openHiHat[c],
    measure.closedHiHat[c],
    measure.highTom[c],
    measure.midTom[c],
    measure.lowTom[c],
    measure.crossStick[c],
    measure.snareDrum[c],
    measure.bassDrum[c],
    measure.pedalHiHat[c],
  ];
  return map[r];
}

function setCell(c, r, value) {
  const measure = Measures.measures[Glob.currentMeasure];
  switch (r) {
    case 0:
      measure.cowbell[c] = value;
      break;
    case 1:
      measure.crashCymbal1[c] = value;
      break;
    case 2:
      measure.crashCymbal2[c] = value;
      break;
    case 3:
      measure.chineseCymbal[c] = value;
      break;
    case 4:
      measure.splashCymbal[c] = value;
      break;
    case 5:
      measure.rideBell[c] = value;
      break;
    case 6:
      measure.rideCymbal[c] = value;
      break;
    case 7:
      measure.openHiHat[c] = value;
      break;
    case 8:
      measure.closedHiHat[c] = value;
      break;
    case 9:
      measure.highTom[c] = value;
      break;
    case 10:
      measure.midTom[c] = value;
      break;
    case 11:
      measure.lowTom[c] = value;
      break;
    case 12:
      measure.crossStick[c] = value;
      break;
    case 13:
      measure.snareDrum[c] = value;
      break;
    case 14:
      measure.bassDrum[c] = value;
      break;
    case 15:
      measure.pedalHiHat[c] = value;
      break;
    default:
      break;
  }
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
  const rows = 16;
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
      if (getCell(c, r) > 0) {
        setCell(c, r, 0);
      } else {
        setCell(c, r, hit);
      }
      drawPattern();
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
      document.getElementById("rhythmSelector").value = "Rock2";
      Measures.load("Rock2");
      document.getElementById("message").style.visibility = "hidden";
      document.getElementById("tempoSlider").value = Glob.settings.tempo;
      tempoChanged();
      volumeChanged();
      drawPattern();
      additionalChanged();
      humanizeVolumesChanged();
      humanizeTimingChanged();
    }
  });

  document.getElementById("loadRhythmButton").addEventListener("click", (e) => {
    let rhythm = "Rock2";

    if (!Glob.playing) {
      rhythm = document.getElementById("rhythmSelector").value;
      const userChoice = window.confirm(`Load rhythm?`);
      if (userChoice) {
        Measures.load(rhythm);
        document.getElementById("tempoSlider").value = Glob.settings.tempo;
        tempoChanged();
        volumeChanged();
        drawPattern();
      }
    }
  });

  document.getElementById("tempoSlider").addEventListener("input", (e) => {
    tempoChanged();
  });

  document.getElementById("volumeSlider").addEventListener("input", (e) => {
    volumeChanged();
  });

  document.getElementById("startStopButton").addEventListener("click", (e) => {
    if (Glob.playing) {
      Glob.stop = true;
    } else {
      playPattern();
    }
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
    if (!Glob.playing) {
      const userChoice = window.confirm(`Clear measure ${Glob.currentMeasure + 1}?`);
      if (userChoice) {
        const measure = Measures.measures[Glob.currentMeasure];
        for (let r = 0; r < Instruments.names.length; r++) {
          for (let c = 0; c < measure.bassDrum.length; c++) {
            setCell(c, r, 0);
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
    if (!Glob.playing && Measures.measures.length > 1) {
      const userChoice = window.confirm(`Delete measure ${Glob.currentMeasure + 1}?`);
      if (userChoice) {
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
    const measure = Measures.measures[Glob.currentMeasure];
    if (!Glob.playing) {
      const userChoice = window.confirm(`Add a beat to the current measure?`);
      if (userChoice) {
        measure.beats++;
        Measure.fixMeasure(measure);
        drawPattern();
      }
    }
  });

  document.getElementById("deleteBeatButton").addEventListener("click", (e) => {
    const measure = Measures.measures[Glob.currentMeasure];
    if (!Glob.playing && (measure.beats > 1)) {
      const userChoice = window.confirm(`Delete the last beat of the current measure?`);
      if (userChoice) {
        measure.beats--;
        Measure.fixMeasure(measure);
        drawPattern();
      }
    }
  });

  document.getElementById("incDivisionButton").addEventListener("click", (e) => {
    const measure = Measures.measures[Glob.currentMeasure];
    if (!Glob.playing) {
      const userChoice = window.confirm(`Increase the beat division of the current measure?`);
      if (userChoice) {
        measure.divisions++;
        Measure.fixMeasure(measure);
        drawPattern();
      }
    }
  });

  document.getElementById("decDivisionButton").addEventListener("click", (e) => {
    const measure = Measures.measures[Glob.currentMeasure];
    if (!Glob.playing && (measure.divisions > 1)) {
      const userChoice = window.confirm(`Decrease the beat division of the current measure?`);
      if (userChoice) {
        measure.divisions--;
        Measure.fixMeasure(measure);
        drawPattern();
      }
    }
  });

  document.getElementById("copyMeasureButton").addEventListener("click", (e) => {
    let copyFrom = 1;
    let copyTo = 1;

    if (!Glob.playing && Measures.measures.length > 1) {
      copyFrom = Glob.tryParseInt(document.getElementById("copyMeasureFrom").value, -1);
      copyTo = Glob.tryParseInt(document.getElementById("copyMeasureTo").value, -1);
      if ((copyFrom >= 1) && (copyTo >= 1) && (copyFrom !== copyTo) &&
        (copyFrom <= Measures.measures.length) && (copyTo <= Measures.measures.length)) {
        const userChoice = window.confirm(`Copy measure ${copyFrom} to measure ${copyTo}?`);
        if (userChoice) {
          Measures.copyMeasure(copyFrom, copyTo);
          drawPattern();
        }
      }
    }
  });

  document.getElementById("pattern").addEventListener("mousedown", (e) => {
    patternClicked(e)
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

  document.getElementById("endsWithFill").addEventListener("click", (e) => {
    endsWithFillClicked();
  });

  document.getElementById("message").addEventListener("click", (e) => {
    document.getElementById("message").style.visibility = "hidden";
  });

  document.getElementById("saveButton").addEventListener("click", (e) => {
    if (!Glob.playing) {
      saveTextFile();
    }
  });

  document.getElementById("openButton").addEventListener("click", (e) => {
    if (!Glob.playing) {
      openTextFile();
    }
  });

  Instruments.init();
  Audio.init();
} catch (e) {
  if (typeof window !== 'undefined') {
    console.log(e);
  }
}


