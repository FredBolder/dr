import { Audio } from "./audio.js";
import { Distortion } from "./distortion.js";
import { Glob } from "./glob.js";
import { Instruments } from "./instruments.js";
import { Measure } from "./measure.js";
import { Measures } from "./measures.js";
import { Presets } from "./presets.js";
import { Reverb } from "./reverb.js";
import { Settings } from "./settings.js";
import { Test } from "./test.js";

let activeSources = [];
const audioNodePool = [];
const labelWidth = 170;
const msgCanNotChangeWhilePlaying = "This setting can not be changed while playing.";
const msgInstrumentsNotLoaded = "The instruments are not loaded yet. Try again later.";
const msgReverbNotLoaded = "Reverb is not loaded yet. Try again later.";
let patternCtx;
let playPadsBuffers = null;
let playPadsStereoNodes = [];
let reverb;
const settingLabels = ["Mute", "Solo", "Other sound", "Volume", "Pitch", "Pan", "Filter", "Filter freq", "Filter Q", "Distortion", "Reverb"];

Glob.init();

// Create an offscreen canvas
let dbPattern = createDbPattern(document.getElementById("pattern").width, document.getElementById("pattern").height);
let dbPatternCtx = dbPattern.getContext("2d");

function createDbPattern(width, height) {
  let ratio = window.devicePixelRatio || 1;
  let offscreenCanvas = document.createElement("canvas");
  offscreenCanvas.width = width * ratio;
  offscreenCanvas.height = height * ratio;
  let ctx = offscreenCanvas.getContext("2d");
  ctx.scale(ratio, ratio); // Scale so drawing operations remain sharp
  return offscreenCanvas;
}


function initializeAudioNodes(poolSize = 10) {
  const audioCtx = Audio.audioContext;

  for (let i = 0; i < poolSize; i++) {
    const source = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();

    source.connect(gainNode);

    audioNodePool.push({ source, gainNode, inUse: false });
  }
}

function getAvailableNode() {
  for (const node of audioNodePool) {
    if (!node.inUse) {
      node.inUse = true;
      return node;
    }
  }

  // Create a new node if no free ones
  return createNewNode(true);
}

function createNewNode(inUse) {
  const audioCtx = Audio.audioContext;
  const source = audioCtx.createBufferSource();
  const gainNode = audioCtx.createGain();

  source.connect(gainNode);

  const newNode = { source, gainNode, inUse };
  audioNodePool.push(newNode);
  return newNode;
}

function applyPresetPattern() {
  let column = 0;
  let columnsPerMeasure = 0;
  let hit = 0;
  let hits = [];
  let n1 = 0;
  let n2 = 0;
  let n3 = 0;
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
    columnsPerMeasure = measure.beats * measure.divisions;
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
            // 7: Every column of last beat (soft to hard)
            // 8: Every column of last beat (hard to soft)
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
          case 9:
          case 10:
            // 9: 3 per measure with equal times inbetween
            // 10: 6 per measure with equal times inbetween
            if (pattern === 9) {
              n1 = columnsPerMeasure / 3;
            } else {
              n1 = columnsPerMeasure / 6;
            }
            if (n1 === Math.trunc(n1)) {
              if ((column % n1) === 0) {
                Instruments.setCell(column, row, 1);
              }
            }
            break;
          case 11:
          case 12:
            // 11: 3 per measure (3-3-2)
            // 12: 6 per measure (2 x 3-3-2)
            if (pattern === 11) {
              n1 = columnsPerMeasure / 8;
            } else {
              n1 = columnsPerMeasure / 16;
            }
            if (n1 === Math.trunc(n1)) {
              if ((column === 0) || (column === (3 * n1)) || (column === (6 * n1))) {
                Instruments.setCell(column, row, 1);
              }
              if (pattern === 12) {
                if ((column === (8 * n1)) || (column === (11 * n1)) || (column === (14 * n1))) {
                  Instruments.setCell(column, row, 1);
                }
              }
            }
            break;
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
            // 13: 3 per measure (2-1-1)
            // 14: 6 per measure (2 x 2-1-1)
            // 15: 3 per beat (2-1-1)
            // 16: 3 per measure (1-1-2)
            // 17: 6 per measure (2 x 1-1-2)
            // 18: 3 per beat (1-1-2)
            switch (pattern) {
              case 13:
              case 16:
                n1 = columnsPerMeasure / 4;
                n2 = 1;
                break;
              case 14:
              case 17:
                n1 = columnsPerMeasure / 8;
                n2 = 2;
                break;
              case 15:
              case 18:
                n1 = measure.divisions / 4;
                n2 = measure.beats;
                break;
              default:
                n1 = columnsPerMeasure / 4;
                n2 = 1;
                break;
            }
            if (pattern > 15) {
              n3 = 1;
            } else {
              n3 = 0;
            }
            if (n1 === Math.trunc(n1)) {
              for (let k = 0; k < n2; k++) {
                if ((column === ((k * 4) * n1)) || (column === ((2 - n3 + (k * 4)) * n1)) || (column === ((3 - n3 + (k * 4)) * n1))) {
                  Instruments.setCell(column, row, 1);
                }
              }
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
  Glob.settings.reverbTypeSelector.disabled = Glob.playing;
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
  Glob.settings.multiplyDivisionsByTwo.disabled = Glob.playing;
  Glob.settings.divideDivisionsByTwo.disabled = Glob.playing;
}

function drawPads() {
  let columns = 0;
  let fontSize = 0;
  let h = 0;
  let n = 0;
  let rows = 0;
  let w = 0;
  const pads = Glob.settings.canvasPlayScreen;
  const ratio = window.devicePixelRatio || 1;
  const padsContext = pads.getContext('2d');
  const availableHeight = window.innerHeight * 0.9;

  //updateCanvasPlayScreenSize();

  pads.style.width = "100%";
  pads.style.height = availableHeight + "px";

  // Get actual size of the canvas
  const rect = pads.getBoundingClientRect();

  // Set the canvas resolution based on device pixel ratio
  pads.width = rect.width * ratio;
  pads.height = rect.height * ratio;

  // Store logical (CSS) size for drawing
  const logicalWidth = rect.width;
  const logicalHeight = rect.height;

  // Scale to normalize drawing operations
  padsContext.scale(ratio, ratio);

  // Fix stroke and fill properties
  padsContext.strokeStyle = "black";
  padsContext.fillStyle = "white";

  // Clear canvas using logical size
  padsContext.clearRect(0, 0, logicalWidth, logicalHeight);

  rows = 2;
  columns = 5;
  if (Glob.isLandscape()) {
    rows = 2;
    columns = 5;
  } else {
    rows = 5;
    columns = 2;
  }
  w = logicalWidth / columns;
  h = logicalHeight / rows;
  fontSize = h * 0.25;
  padsContext.font = `${fontSize}px arial`;
  padsContext.textAlign = "center";
  padsContext.strokeStyle = "black";
  padsContext.fillStyle = "black";
  let instrList = Instruments.playPadsList();
  n = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      padsContext.strokeRect(col * w, row * h, w, h);
      if (n < instrList.length) {
        const instrument = Instruments.sets[Glob.settings.instrumentSet][instrList[n]];
        padsContext.fillText(instrument.shortName, (col * w) + (w * 0.5), (row * h) + (h * 0.45), w);
        padsContext.fillText(instrument.key, (col * w) + (w * 0.5), (row * h) + (h * 0.75), w);
      }
      n++;
    }
  }
}

function drawPattern(currentColumn = -1) {
  let columns = 0;
  let dx1 = 25;
  let dy1 = 25;
  let dx2 = 25 * 3; // Settings
  let factor = 1;
  let fontSize = 0;
  let n = 0;
  let divisionsPerBeat = 0;
  let divisionsPerMeasure = 0;
  let measureStatus = "";
  let radius = 0;
  const set = Instruments.sets[Glob.settings.instrumentSet];
  let text = "";

  if (Glob.playingPads) {
    return;
  }

  const measure = Measures.measures[Glob.currentMeasure];
  divisionsPerBeat = measure.divisions;
  divisionsPerMeasure = measure.bassDrum.length;
  const rows = Instruments.sets[Glob.settings.instrumentSet].length;
  columns = divisionsPerMeasure;

  if (Glob.settings.showSettings) {
    resizeCanvasIfNeeded(Glob.settings.pattern, settingLabels.length, dx2, rows, dy1);
  } else {
    resizeCanvasIfNeeded(Glob.settings.pattern, columns, dx1, rows, dy1);
  }

  dbPatternCtx.clearRect(0, 0, dbPattern.width, dbPattern.height);

  // Labels
  dbPatternCtx.lineWidth = 2;
  dbPatternCtx.strokeStyle = "white";
  fontSize = dy1 * 0.6;
  dbPatternCtx.font = `${fontSize}px arial`;
  dbPatternCtx.textAlign = "left";
  dbPatternCtx.beginPath;
  measureStatus = `Measure ${Glob.currentMeasure + 1}/${Measures.measures.length}`;
  dbPatternCtx.fillStyle = "black";
  dbPatternCtx.fillText(measureStatus, 10, dy1 * 0.75);
  dbPatternCtx.strokeStyle = "white";
  for (let i = 0; i < rows; i++) {
    dbPatternCtx.beginPath;
    dbPatternCtx.fillStyle = "blue";
    dbPatternCtx.fillRect(0, i * dy1 + dy1, labelWidth, dy1);
    dbPatternCtx.strokeRect(0, i * dy1 + dy1, labelWidth, dy1);
    dbPatternCtx.fillStyle = "white";
    dbPatternCtx.fillText(Instruments.sets[Glob.settings.instrumentSet][i].name, 10, i * dy1 + (dy1 * 1.75));
    dbPatternCtx.fillText(Instruments.sets[Glob.settings.instrumentSet][i].key, 150, i * dy1 + (dy1 * 1.75));
  }
  if (Glob.settings.showSettings) {
    // Setting labels
    dbPatternCtx.textAlign = "center";
    for (let i = 0; i < settingLabels.length; i++) {
      dbPatternCtx.beginPath;
      dbPatternCtx.fillStyle = "blue";
      dbPatternCtx.fillRect(i * dx2 + labelWidth, 0, dx2, dy1);
      dbPatternCtx.strokeRect(i * dx2 + labelWidth, 0, dx2, dy1);
      dbPatternCtx.fillStyle = "white";
      dbPatternCtx.fillText(settingLabels[i], i * dx2 + labelWidth + (dx2 / 2), dy1 * 0.75, dx2 * 0.9);
    }
    // Settings
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < settingLabels.length; j++) {
        dbPatternCtx.lineWidth = 2;
        dbPatternCtx.fillStyle = "white";
        dbPatternCtx.strokeStyle = "black";
        dbPatternCtx.beginPath;
        dbPatternCtx.fillRect(j * dx2 + labelWidth, i * dy1 + dy1, dx2, dy1);
        dbPatternCtx.strokeRect(j * dx2 + labelWidth, i * dy1 + dy1, dx2, dy1);
        dbPatternCtx.fillStyle = "black";
        switch (j) {
          case 0:
            text = Glob.boolToYesNo(set[i].mute);
            break;
          case 1:
            text = Glob.boolToYesNo(set[i].solo);
            break;
          case 2:
            if (set[i].file.includes(",")) {
              text = Glob.boolToYesNo(set[i].other);
            } else {
              text = "-";
            }
            break;
          case 3:
            text = set[i].volume.toString();
            break;
          case 4:
            text = set[i].pitch.toString();
            break;
          case 5:
            text = set[i].pan.toString();
            break;
          case 6:
            text = Glob.indexToFilterTypeText(set[i].filterType);
            break;
          case 7:
            text = set[i].filterFreq.toString();
            break;
          case 8:
            text = set[i].filterQ.toString();
            break;
          case 9:
            text = Distortion.intToDistortion(set[i].distortion);
            break;
          case 10:
            text = Glob.boolToYesNo(set[i].reverb);
            break;
          default:
            text = "?";
            break;
        }
        dbPatternCtx.fillText(text, j * dx2 + labelWidth + (dx2 / 2), i * dy1 + dy1 * 1.75, dx2 * 0.9);

      }
    }
  } else {
    // Count labels
    dbPatternCtx.textAlign = "center";
    n = 1;
    for (let i = 0; i < columns; i++) {
      dbPatternCtx.beginPath;
      dbPatternCtx.fillStyle = "blue";
      dbPatternCtx.fillRect(i * dx1 + labelWidth, 0, dx1, dy1);
      dbPatternCtx.strokeRect(i * dx1 + labelWidth, 0, dx1, dy1);
      dbPatternCtx.fillStyle = "white";
      if ((i % divisionsPerBeat) === 0) {
        dbPatternCtx.fillText(n.toString(), i * dx1 + labelWidth + (dx1 / 2), dy1 * 0.75, dx1 * 0.9);
        n++;
      }
    }
    // Pattern
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const cellValue = Instruments.getCell(Glob.currentMeasure, j, i);

        dbPatternCtx.lineWidth = 2;
        dbPatternCtx.fillStyle = "white";
        dbPatternCtx.strokeStyle = "black";
        dbPatternCtx.beginPath;
        dbPatternCtx.fillRect(j * dx1 + labelWidth, i * dy1 + dy1, dx1, dy1);
        dbPatternCtx.strokeRect(j * dx1 + labelWidth, i * dy1 + dy1, dx1, dy1);
        dbPatternCtx.fillStyle = "black";

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
          dbPatternCtx.lineWidth = 4;
          dbPatternCtx.beginPath();
          dbPatternCtx.moveTo(j * dx1 + labelWidth + (dx1 * factor), i * dy1 + (1.5 * dy1));
          dbPatternCtx.lineTo(j * dx1 + labelWidth + (dx1 * (1 - factor)), i * dy1 + (1.5 * dy1));
          dbPatternCtx.moveTo(j * dx1 + labelWidth + (dx1 * 0.5), i * dy1 + ((1 + factor) * dy1));
          dbPatternCtx.lineTo(j * dx1 + labelWidth + (dx1 * 0.5), i * dy1 + ((1 + (1 - factor)) * dy1));
          dbPatternCtx.stroke();
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
          dbPatternCtx.fillText(text, j * dx1 + labelWidth + (dx1 / 2), i * dy1 + dy1 * 1.75, dx1 * 0.9);
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
            dbPatternCtx.beginPath();
            dbPatternCtx.ellipse(j * dx1 + labelWidth + (dx1 * 0.65), i * dy1 + (1.5 * dy1), radius, radius, 0, 0, 2 * Math.PI);
            dbPatternCtx.fill();
            radius = dx1 * 0.4 * 0.35;
            dbPatternCtx.ellipse(j * dx1 + labelWidth + (dx1 * 0.2), i * dy1 + (1.5 * dy1), radius, radius, 0, 0, 2 * Math.PI);
            dbPatternCtx.fill();
          } else {
            dbPatternCtx.beginPath();
            dbPatternCtx.ellipse(j * dx1 + labelWidth + (dx1 / 2), i * dy1 + (1.5 * dy1), radius, radius, 0, 0, 2 * Math.PI);
            dbPatternCtx.fill();
          }
        }
      }
    }
  }
  updatePattern(currentColumn);
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
      selector.selectedIndex = 9;
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

function handleKeyDown(e) {
  let found = null;
  let volumeFactor = 0.7;
  const key = e.key.toUpperCase();
  if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(key)) {
    for (let i = 0; i < Instruments.instruments.length; i++) {
      const instrument = Instruments.instruments[i];
      if ((instrument.key !== "") && ((instrument.key) === key)) {
        found = instrument;
      }
    }
    if (found !== null) {
      if (e.shiftKey) {
        volumeFactor = 0.8;
      }
      playInstrument(found, volumeFactor);
    }
  }
}


function instrumentSetChanged() {
  Glob.settings.instrumentSet = Glob.tryParseInt(Glob.settings.instrumentSetSelector.value, 0);
  drawPattern();
  fillPatternInstruments();
}

function loopClicked() {
  Glob.settings.loop = document.getElementById("loop").checked;
}

async function openTextFile() {
  let fileVersion = 0;
  // 1 Initial version
  // 2 Instrument set added
  // 3 Mute, solo, volume, pitch and pan added
  // 4 Reverb added
  // 5 Other (instrument) added
  // 6 FilterType, FilterFreq and FilterQ added
  // 7 Distortion added
  let measurePointer = 0;

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
    Glob.initSettings();
    const file = await fileHandle.getFile();
    if (!file.name.toLowerCase().endsWith(".dr")) {
      alert("Invalid file type. Please select a .dr file.");
      return;
    }
    Instruments.initSettings();
    const text = await file.text();
    const lines = text.split("\n");
    fileVersion = Glob.tryParseInt(lines[0], 0);
    Glob.settings.measuresToPlay = lines[1];
    Glob.settings.tempo = Glob.tryParseInt(lines[2], 0);
    measurePointer = 3;
    if (fileVersion >= 2) {
      Glob.settings.instrumentSet = Glob.tryParseInt(lines[3], 0);
      measurePointer++;
    }
    if (fileVersion >= 4) {
      Glob.settings.reverbType = Glob.tryParseInt(lines[4], 3);
      Glob.settings.reverbWet = Glob.tryParseInt(lines[5], 25);
      measurePointer += 2;
    }
    Measures.measures = JSON.parse(lines[measurePointer]);
    Measures.addMissingProps();
    if (fileVersion >= 3) {
      const instrumentSettings = JSON.parse(lines[measurePointer + 1]);
      for (let i = 0; i < instrumentSettings.length; i++) {
        const settings = instrumentSettings[i];
        for (let j = 0; j < Instruments.instruments.length; j++) {
          const instrument = Instruments.instruments[j];
          if (instrument.property === settings.property) {
            instrument.mute = settings.mute;
            instrument.solo = settings.solo;
            instrument.volume = settings.volume;
            instrument.pitch = settings.pitch;
            instrument.pan = settings.pan;
            if (fileVersion >= 4) {
              instrument.reverb = settings.reverb;
            }
            if (fileVersion >= 5) {
              instrument.other = settings.other;
            }
            if (fileVersion >= 6) {
              instrument.filterType = settings.filterType;
              instrument.filterFreq = settings.filterFreq;
              instrument.filterQ = settings.filterQ;
            }
            if (fileVersion >= 7) {
              instrument.distortion = settings.distortion;
            }
          }
        }
      }
    }
    Glob.settings.instrumentSetSelector.selectedIndex = Glob.settings.instrumentSet;
    instrumentSetChanged();
    Glob.settings.reverbTypeSelector.selectedIndex = Glob.settings.reverbType;
    reverbTypeChanged();
    Glob.settings.reverbWetSlider.value = Glob.settings.reverbWet;
    reverbWetChanged();
    drawPattern();
    document.getElementById("measuresToPlayInput").value = Glob.settings.measuresToPlay;
    document.getElementById("tempoSlider").value = Glob.settings.tempo;
    tempoChanged();
  } catch (err) {
    console.error("Error opening file:", err);
  }
}

async function playInstrument(instrument, volumeFactor = 0.7) {
  let humanizeVolumes = 0;
  let humanizeVolumeFactor = 1;
  let pan = 0;
  let url = "";
  let volume = 75;

  url = Glob.getStringFromCommaDelimited(instrument.file, Glob.boolToInt(instrument.other));
  if (url.length > 0) {
    const convolver = reverb.getConvolver();
    if (convolver) {
      volume = Glob.settings.volume / 100;
      humanizeVolumes = Glob.settings.humanizeVolumes / 10;
      if (humanizeVolumes > 0) {
        humanizeVolumeFactor = 1 + (0.5 * humanizeVolumes) - (Math.random() * humanizeVolumes);
      } else {
        humanizeVolumeFactor = 1;
      }
      // Preload specific file if not cached
      if (!Audio.audioCache.has(url)) {
        await Audio.preloadAudioFiles([url]);
      }

      const audioCtx = Audio.audioContext;
      if (audioCtx.state === "suspended") {
        await audioCtx.resume();
      }

      //const audioBuffer = Audio.getCachedAudioBuffer(url);
      const audioBuffer = await preprocessInstrument(instrument);
      if (!audioBuffer) {
        console.error('Audio buffer not found for URL:', url);
        return;
      }

      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.playbackRate.value = Glob.percentToPitch(instrument.pitch);
      const gainNode = audioCtx.createGain();
      gainNode.gain.value = volumeFactor * humanizeVolumeFactor * volume * (instrument.volume / 100);
      pan = Glob.percentToPan(instrument.pan);
      const stereoNode = new StereoPannerNode(audioCtx, { pan })
      source.connect(gainNode);
      gainNode.connect(stereoNode);
      if (instrument.reverb) {
        reverb.connectSource(stereoNode);
      } else {
        stereoNode.connect(audioCtx.destination);
      }

      source.onended = () => {
        Glob.openHiHat = Glob.openHiHat.filter(oh => oh.source !== source);
        source.disconnect();
        gainNode.disconnect();
        stereoNode.disconnect();
      };

      source.start(0);
      source.started = true;
      if (url.toLowerCase().includes("open_hi-hat")) {
        setTimeout(() => {
          Glob.openHiHat.push({ source, gainNode });
        }, 0);
      }
      if (url.toLowerCase().includes("closed_hi-hat") || url.toLowerCase().includes("pedal_hi-hat")) {
        Instruments.stopOpenHiHat(0);
      }
    } else {
      alert(msgReverbNotLoaded);
    }
  }
}

async function playInstrumentFast(instrumentIndex, volumeFactor) {
  let humanizeVolumes = 0;
  let humanizeVolumeFactor = 1;
  let volume = 75;

  const convolver = reverb.getConvolver();
  if (convolver) {
    volume = Glob.settings.volume / 100;
    humanizeVolumes = Glob.settings.humanizeVolumes / 10;
    if (humanizeVolumes > 0) {
      humanizeVolumeFactor = 1 + (0.5 * humanizeVolumes) - (Math.random() * humanizeVolumes);
    }

    const audioCtx = Audio.audioContext;
    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }

    const audioBuffer = playPadsBuffers[instrumentIndex];
    const instrument = Instruments.sets[Glob.settings.instrumentSet][instrumentIndex];

    let { source, gainNode } = getAvailableNode();
    source.buffer = audioBuffer;
    source.playbackRate.value = Glob.percentToPitch(instrument.pitch);
    gainNode.gain.value = volumeFactor * humanizeVolumeFactor * volume * (instrument.volume / 100);

    const stereoNode = playPadsStereoNodes[instrumentIndex];
    gainNode.connect(stereoNode);

    source.onended = () => {
      Glob.openHiHat = Glob.openHiHat.filter(oh => oh.source !== source);

      // Instead of resetting, remove and replace
      const index = audioNodePool.findIndex(n => n.source === source);
      if (index !== -1) {
        audioNodePool[index] = createNewNode(false); // Replace with a fresh node
      }

      gainNode.disconnect();
      source.disconnect();
    };

    source.start(0);

    if (instrument.file.toLowerCase().includes("open_hi-hat")) {
      setTimeout(() => {
        Glob.openHiHat.push({ source, gainNode });
      }, 0);
    }
    if (instrument.file.toLowerCase().includes("closed_hi-hat") || instrument.file.toLowerCase().includes("pedal_hi-hat")) {
      Instruments.stopOpenHiHat(0);
    }
  } else {
    alert(msgReverbNotLoaded);
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
  let playMeasures = [];
  let prevEndsWithFill = false;
  let volume = 0.75;
  const set = Glob.settings.instrumentSet;

  const convolver = reverb.getConvolver();
  if (!convolver) {
    alert(msgReverbNotLoaded);
    ok = false;
  }
  if (ok && !Audio.ready) {
    alert(msgInstrumentsNotLoaded);
    ok = false;
  }
  if (Glob.playing || (Measures.measures.length === 0)) {
    ok = false;
  }
  if (ok) {
    Glob.playing = true;
    disableWhilePlaying();
    odd = false;

    const audioCtx = Audio.audioContext;
    //showMessage(audioCtx.state);
    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }

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

    const audioBuffers = await Promise.all(
      Instruments.sets[set].map((instrument) => preprocessInstrument(instrument))
    );

    const stereoNodes = [];
    Instruments.sets[set].forEach((instrument, idx) => {
      const pan = Glob.percentToPan(instrument.pan);
      stereoNodes.push(new StereoPannerNode(audioCtx, { pan }));
      if (instrument.reverb) {
        reverb.connectSource(stereoNodes[idx]);
      } else {
        stereoNodes[idx].connect(audioCtx.destination);
      }
    });

    let nextNoteTime = audioCtx.currentTime + 0.1;

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

          let hasSolo = false;
          Instruments.sets[set].forEach((instrument, idx) => {
            if (instrument.solo && !instrument.mute) {
              hasSolo = true;
            }
          });

          // Create and configure BufferSource nodes for each audio buffer
          Instruments.sets[set].forEach((instrument, idx) => {
            const play = !instrument.mute && (instrument.solo || !hasSolo);
            if (!play) return;

            let pitch = Glob.percentToPitch(instrument.pitch);
            let url = Glob.getStringFromCommaDelimited(instrument.file, Glob.boolToInt(instrument.other));

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

            const audioBuffer = audioBuffers[idx];
            let source;
            let gainNode;
            let stereoNode;

            if (cellValue > 0) {
              source = audioCtx.createBufferSource();
              source.started = false;
              source.playbackRate.value = pitch;
              source.isGhostNote = false;
              source.buffer = audioBuffer;
              gainNode = audioCtx.createGain();
              stereoNode = stereoNodes[idx];

              switch (cellValue) {
                case 1:
                case 7:
                case 10:
                case 11:
                case 12:
                case 13:
                  factor = 0.7;
                  break;
                case 2:
                case 8:
                  factor = 0.5;
                  break;
                case 3:
                case 9:
                  factor = 0.9;
                  break;
                case 4:
                  factor = 0.3;
                  break;
                case 5:
                  factor = 1;
                  break;
                case 6:
                  // Flam
                  factor = 0.7;
                  break;
                default:
                  factor = 0.7;
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
              gainNode.gain.value = factor * humanizeVolumeFactor * volume * (instrument.volume / 100);
              source.connect(gainNode);
              // ERROR: Uncaught (in promise) TypeError: Failed to execute 'connect' on 'AudioNode': Overload resolution failed.
              gainNode.connect(stereoNode);
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
              ghostNotes.push({ source: audioCtx.createBufferSource(), gainNode: audioCtx.createGain(), stereoNode: stereoNodes[idx] });
              ghostNotes[g].source.buffer = audioBuffer;
              ghostNotes[g].gainNode.gain.value = 0.5 * humanizeVolumeFactor * volume * (instrument.volume / 100);
              ghostNotes[g].source.playbackRate.value = pitch;

              ghostNotes[g].source.connect(ghostNotes[g].gainNode);
              ghostNotes[g].gainNode.connect(ghostNotes[g].stereoNode);
              ghostNotes[g].source.started = false;
              ghostNotes[g].source.isGhostNote = true;
            }

            if ((set === 0) && (idx === 8)) {
              // Open hi-hat
              if (cellValue > 0) {
                setTimeout(() => {
                  if (Glob.playing && !Glob.stop) {
                    Glob.openHiHat.push({ source, gainNode });
                  }
                }, (nextNoteTime + humanizeDeltaTime - audioCtx.currentTime) * 1000);
              }

              // Handle multiple ghost notes
              for (let g = 0; g < ghostNotes.length; g++) {
                setTimeout(() => {
                  if (Glob.playing && !Glob.stop) {
                    Glob.openHiHat.push({
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
                Glob.openHiHat = Glob.openHiHat.filter(oh => oh.source !== source);
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
                Glob.openHiHat = Glob.openHiHat.filter(oh => oh.source !== ghostNotes[g].source);
                ghostNotes[g].source.disconnect();
                ghostNotes[g].gainNode.disconnect();
                activeSources = activeSources.filter(active => active.source !== ghostNotes[g].source);
              };
              ghostNotes[g].source.start(sourceFlamStart);
              ghostNotes[g].source.started = true;
              activeSources.push({ source: ghostNotes[g].source, gainNode: ghostNotes[g].gainNode });
            }

            if ((set === 0) && (idx === 9 || idx === 18)) {
              // Closed Hi-Hat or Pedal Hi-Hat
              Instruments.stopOpenHiHat((nextNoteTime + humanizeDeltaTime - audioCtx.currentTime) * 1000);
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
    stereoNodes.forEach(node => node.disconnect());
  }
  Glob.playing = false;
  disableWhilePlaying();
  Glob.stop = false;
  drawPattern();
}

async function preprocessInstrument(instrument) {
  let url = Glob.getStringFromCommaDelimited(instrument.file, Glob.boolToInt(instrument.other));
  if (!url.length) return null;

  // Check if already processed
  //let cachedBuffer = Audio.getProcessedAudioBuffer(url);
  //if (cachedBuffer) return cachedBuffer;

  if (!Audio.audioCache.has(url)) {
    await Audio.preloadAudioFiles([url]);
  }
  const originalBuffer = Audio.getCachedAudioBuffer(url);
  if (!originalBuffer) {
    console.error('Audio buffer not found for URL:', url);
    return null;
  }

  const offlineCtx = new OfflineAudioContext(
    originalBuffer.numberOfChannels,
    originalBuffer.length,
    originalBuffer.sampleRate
  );

  const source = offlineCtx.createBufferSource();
  source.buffer = originalBuffer;

  let lastNode = source;
  if (instrument.distortion > 0) {
    const distortion = offlineCtx.createWaveShaper();
    distortion.curve = Distortion.curves[instrument.distortion - 1];
    distortion.oversample = "4x";
    lastNode.connect(distortion);
    lastNode = distortion;
  }
  if (instrument.filterType > 0) {
    const filter = offlineCtx.createBiquadFilter();
    filter.type = Glob.indexToFilterType(instrument.filterType);
    filter.frequency.value = Glob.percentToFilterFreq(instrument.filterFreq);
    filter.Q.value = Glob.percentToFilterQ(instrument.filterQ);
    lastNode.connect(filter);
    lastNode = filter;
  }

  lastNode.connect(offlineCtx.destination);
  source.start();

  const processedBuffer = await offlineCtx.startRendering();
  Audio.storeProcessedAudioBuffer(url, processedBuffer);

  return processedBuffer;
}


function reverbTypeChanged() {
  Glob.settings.reverbType = Glob.tryParseInt(Glob.settings.reverbTypeSelector.value, 0);
  const file = Reverb.indexToImpulseResponseUrl(Glob.settings.reverbType);
  reverb.loadReverb(file);
}

function scheduleDraw(currentColumn = -1) {
  requestAnimationFrame(() => drawPattern(currentColumn));
}

function showSettingsClicked() {
  Glob.settings.showSettings = document.getElementById("showSettings").checked;
  scheduleDraw();
}

function setupGlobalAudioNodes(audioContext, convolver) {
  if (!setupGlobalAudioNodes.sharedWetGain) {
    setupGlobalAudioNodes.sharedWetGain = audioContext.createGain();
    setupGlobalAudioNodes.sharedWetGain.gain.value = 1;
    convolver.connect(setupGlobalAudioNodes.sharedWetGain);
    setupGlobalAudioNodes.sharedWetGain.connect(audioContext.destination);
  }

  if (!setupGlobalAudioNodes.sharedDryGain) {
    setupGlobalAudioNodes.sharedDryGain = audioContext.createGain();
    setupGlobalAudioNodes.sharedDryGain.gain.value = 1;
    setupGlobalAudioNodes.sharedDryGain.connect(audioContext.destination);
  }

  return {
    dryGain: setupGlobalAudioNodes.sharedDryGain,
    wetGain: setupGlobalAudioNodes.sharedWetGain
  };
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
  activeSources.length = 0;
}

function resizeCanvasIfNeeded(pattern, columns, dx1, rows, dy1) {
  let ratio = window.devicePixelRatio || 1;

  const displayWidth = labelWidth + (columns * dx1);
  const displayHeight = (rows + 1) * dy1;

  // Set CSS size (logical size)
  pattern.style.width = `${displayWidth}px`;
  pattern.style.height = `${displayHeight}px`;

  // Set actual pixel size
  let desiredCanvasWidth = displayWidth * ratio;
  let desiredCanvasHeight = displayHeight * ratio;

  if (pattern.width !== desiredCanvasWidth || pattern.height !== desiredCanvasHeight) {
    pattern.width = desiredCanvasWidth;
    pattern.height = desiredCanvasHeight;
    patternCtx = pattern.getContext("2d");
    patternCtx.scale(ratio, ratio);
  }

  // Also resize the offscreen buffer to match
  dbPattern = createDbPattern(desiredCanvasWidth, desiredCanvasHeight);
  dbPatternCtx = dbPattern.getContext("2d");
}


async function saveTextFile() {
  const fileVersion = 7;
  let found = false;
  let saveMeasures = [];
  let saveSettings = [];
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
    await writable.write(Glob.settings.reverbType.toString() + "\n");
    await writable.write(Glob.settings.reverbWet.toString() + "\n");

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
    for (let i = 0; i < Instruments.instruments.length; i++) {
      const instrument = Instruments.instruments[i];
      const instrumentSettings = {
        property: instrument.property,
        mute: instrument.mute,
        solo: instrument.solo,
        other: instrument.other,
        volume: instrument.volume,
        pitch: instrument.pitch,
        pan: instrument.pan,
        filterType: instrument.filterType,
        filterFreq: instrument.filterFreq,
        filterQ: instrument.filterQ,
        distortion: instrument.distortion,
        reverb: instrument.reverb
      };
      saveSettings.push(instrumentSettings);
    }
    await writable.write(JSON.stringify(saveSettings) + "\n");
    await writable.close();
  } catch (err) {
    console.error("Error saving file:", err);
  }
}

function showMessage(msg) {
  Glob.settings.message.innerText = msg;
  Glob.settings.message.style.visibility = "visible";
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

function padClicked(event) {
  let columns = 0;
  let rows = 0;
  const pads = Glob.settings.canvasPlayScreen;
  const rect = pads.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (Glob.isLandscape()) {
    rows = 2;
    columns = 5;
  } else {
    rows = 5;
    columns = 2;
  }

  const w = rect.width / columns;
  const h = rect.height / rows;
  const c = Math.trunc(x / w);
  const r = Math.trunc(y / h);
  //alert(`${c}, ${r}`);
  const n = (r * columns) + c;
  const instrList = Instruments.playPadsList();
  if (n < instrList.length) {
    const instrumentIndex = instrList[n];
    playInstrumentFast(instrumentIndex, 0.7);
  }
}

function patternClicked(event) {
  let columns = 0;
  const rows = Instruments.sets[Glob.settings.instrumentSet].length;
  const pattern = Glob.settings.pattern;
  const rect = pattern.getBoundingClientRect();
  let c = 0;
  let dx = 0;
  let dx1 = 25;
  let dy1 = 25;
  let dx2 = 25 * 3; // Settings
  let inputDefault = 0;
  let inputStr = "";
  let param = "";
  let r = 0;
  let txt = "";
  let userChoice = false;
  let value = 0;
  let val_b = false;

  if (Glob.settings.showSettings) {
    dx = dx2;
    columns = settingLabels.length;
  } else {
    dx = dx1;
    columns = Measures.measures[Glob.currentMeasure].bassDrum.length;
  }
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const hit = Glob.tryParseInt(document.getElementById("inputSelector").value, 1);
  if (x > labelWidth) {
    c = Math.trunc((x - labelWidth) / dx);
    r = Math.trunc(y / dy1);
    if ((c >= 0) && (r >= 0) && (c < columns) && (r <= rows)) {
      if (r > 0) {
        if (Glob.settings.showSettings) {
          switch (c) {
            case 0:
              Instruments.sets[Glob.settings.instrumentSet][r - 1].mute = !Instruments.sets[Glob.settings.instrumentSet][r - 1].mute;
              break;
            case 1:
              Instruments.sets[Glob.settings.instrumentSet][r - 1].solo = !Instruments.sets[Glob.settings.instrumentSet][r - 1].solo;
              break;
            case 9:
              if (!Glob.playing) {
                value = Instruments.sets[Glob.settings.instrumentSet][r - 1].distortion;
                value++;
                if (value > Distortion.curves.length) {
                  value = 0;
                }
                Instruments.sets[Glob.settings.instrumentSet][r - 1].distortion = value;
              } else {
                showMessage(msgCanNotChangeWhilePlaying);
              }
              break;
            case 10:
              if (!Glob.playing) {
                Instruments.sets[Glob.settings.instrumentSet][r - 1].reverb = !Instruments.sets[Glob.settings.instrumentSet][r - 1].reverb;
              } else {
                showMessage(msgCanNotChangeWhilePlaying);
              }
              break;
            case 2:
              if (Instruments.sets[Glob.settings.instrumentSet][r - 1].file.includes(",")) {
                if (!Glob.playing) {
                  Instruments.sets[Glob.settings.instrumentSet][r - 1].other = !Instruments.sets[Glob.settings.instrumentSet][r - 1].other;
                } else {
                  showMessage(msgCanNotChangeWhilePlaying);
                }
              } else {
                showMessage("There is no other file for this instrument.");
                Instruments.sets[Glob.settings.instrumentSet][r - 1].other = false;
              }
              break;
            case 6:
              if (!Glob.playing) {
                value = Instruments.sets[Glob.settings.instrumentSet][r - 1].filterType;
                value++;
                if (value > 3) {
                  value = 0;
                }
                Instruments.sets[Glob.settings.instrumentSet][r - 1].filterType = value;
              } else {
                showMessage(msgCanNotChangeWhilePlaying);
              }
              break;
            case 3:
            case 4:
            case 5:
            case 7:
            case 8:
              if (!Glob.playing) {
                switch (c) {
                  case 3:
                    param = "volume";
                    txt = "volume percentage";
                    break;
                  case 4:
                    param = "pitch";
                    txt = "pitch percentage";
                    break;
                  case 5:
                    param = "pan";
                    txt = "pan percentage (50% = center)";
                    break;
                  case 7:
                    param = "filterFreq";
                    txt = "filter frequency percentage";
                    break;
                  case 8:
                    param = "filterQ";
                    txt = "filter Q percentage";
                    break;
                  default:
                    param = "unknown";
                    txt = "?";
                    break;
                }
                inputDefault = Instruments.sets[Glob.settings.instrumentSet][r - 1][param];
                inputStr = prompt(`Enter new ${txt}`, inputDefault.toString());
                if (inputStr !== null) {
                  value = Glob.tryParseInt(inputStr, inputDefault);
                  if ((value >= 0) && (value <= 100)) {
                    Instruments.sets[Glob.settings.instrumentSet][r - 1][param] = value;
                  }
                }
              } else {
                showMessage(msgCanNotChangeWhilePlaying);
              }
              break;
            default:
              break;
          }
        } else {
          if (Instruments.getCell(Glob.currentMeasure, c, r - 1) > 0) {
            Instruments.setCell(c, r - 1, 0);
          } else {
            Instruments.setCell(c, r - 1, hit);
          }
        }
      } else {
        if (Glob.settings.showSettings) {
          if (!Glob.playing) {
            switch (c) {
              case 0:
              case 1:
              case 6:
              case 9:
              case 10:
                switch (c) {
                  case 0:
                    param = "mute";
                    val_b = false;
                    txt = "Unmute all instruments in this set?";
                    break;
                  case 1:
                    param = "solo";
                    val_b = false;
                    txt = "Disable solo for all instruments in this set?";
                    break;
                  case 6:
                    param = "filterType";
                    val_b = false;
                    value = 0;
                    txt = "Disable filter for all instruments in this set?";
                    break;
                  case 9:
                    param = "distortion";
                    val_b = false;
                    value = 0;
                    txt = "Disable distortion for all instruments in this set?";
                    break;
                  case 10:
                    param = "reverb";
                    val_b = true;
                    txt = "Enable reverb for all instruments in this set?";
                    break;
                  default:
                    param = "unknown";
                    txt = "?";
                    break;
                }
                if (!Glob.settings.expert) {
                  userChoice = window.confirm(txt);
                }
                if (userChoice || Glob.settings.expert) {
                  for (let i = 0; i < Instruments.sets[Glob.settings.instrumentSet].length; i++) {
                    if ((c === 6) || (c == 9)) {
                      Instruments.sets[Glob.settings.instrumentSet][i][param] = value;
                    } else {
                      Instruments.sets[Glob.settings.instrumentSet][i][param] = val_b;
                    }
                  }
                }
                break;
              case 3:
              case 4:
              case 5:
              case 7:
              case 8:
                switch (c) {
                  case 3:
                    param = "volume";
                    inputDefault = 100;
                    txt = "volume percentage";
                    break;
                  case 4:
                    param = "pitch";
                    inputDefault = 50;
                    txt = "pitch percentage";
                    break;
                  case 5:
                    param = "pan";
                    inputDefault = 50;
                    txt = "pan percentage (50% = center)";
                    break;
                  case 7:
                    param = "filterFreq";
                    inputDefault = 50;
                    txt = "filter frequency percentage";
                    break;
                  case 8:
                    param = "filterQ";
                    inputDefault = 0;
                    txt = "filter Q percentage";
                    break;
                  default:
                    param = "unknown";
                    inputDefault = 0;
                    txt = "?";
                    break;
                }
                inputStr = prompt(`Enter new ${txt} for all instruments in this set`, inputDefault.toString());
                if (inputStr !== null) {
                  value = Glob.tryParseInt(inputStr, inputDefault);
                  if ((value >= 0) && (value <= 100)) {
                    for (let i = 0; i < Instruments.sets[Glob.settings.instrumentSet].length; i++) {
                      Instruments.sets[Glob.settings.instrumentSet][i][param] = value;
                    }
                  }
                }
                break;
              default:
                break;
            }
          } else {
            showMessage(msgCanNotChangeWhilePlaying);
          }
        }
      }
      scheduleDraw();
    }
  } else if ((x > 0) && (x < labelWidth) && (y > dy1)) {
    r = Math.trunc((y - dy1) / dy1);
    playInstrument(Instruments.sets[Glob.settings.instrumentSet][r]);
  }
}

function reverbWetChanged() {
  Glob.settings.reverbWet = Glob.settings.reverbWetSlider.value;
  Glob.settings.reverbWetValue.innerText = Glob.settings.reverbWet.toString();
  reverb.setWet(Glob.settings.reverbWet);
}

function tempoChanged() {
  Glob.settings.tempo = Glob.settings.tempoSlider.value;
  Glob.settings.tempoValue.innerText = Glob.settings.tempo.toString();
}

function updateCanvasPlayScreenSize() {
  const pads = Glob.settings.canvasPlayScreen;
  const ratio = window.devicePixelRatio || 1;
  const padsContext = pads.getContext('2d');
  const availableHeight = window.innerHeight * 0.8;

  // Set the canvas size to max
  pads.style.width = "100%";
  pads.style.height = availableHeight + "px";

  // Get actual size of the canvas
  const rect = pads.getBoundingClientRect();

  // Set the canvas resolution based on device pixel ratio
  pads.width = rect.width * ratio;
  pads.height = rect.height * ratio;

  // Scale to normalize drawing operations
  padsContext.scale(ratio, ratio);
}

function updatePattern(currentColumn = -1) {
  let dx = 25;
  const pattern = Glob.settings.pattern;
  const patternCtx = pattern.getContext("2d");

  patternCtx.clearRect(0, 0, pattern.width, pattern.height);
  patternCtx.drawImage(dbPattern, 0, 0, pattern.width, pattern.height);

  if ((currentColumn !== -1) && (!Glob.settings.showSettings)) {
    patternCtx.fillStyle = "rgba(255, 0, 0, 0.5)";
    patternCtx.fillRect(currentColumn * dx + labelWidth, 0, dx, pattern.height);
  }
}


function volumeChanged() {
  Glob.settings.volume = Glob.settings.volumeSlider.value;
  Glob.settings.volumeValue.innerText = Glob.settings.volume.toString();
}

// To prevent error when using node
try {
  window.addEventListener("load", (e) => {
    if (Glob.settings === null) {
      Glob.settings = new Settings();
      Glob.initSettings();
      //console.log("Settings loaded");
      Glob.settings.mainScreen.style.display = "block";
      Glob.settings.playScreen.style.display = "none";
      Presets.fillRhythmSelect();
      document.getElementById("rhythmSelector").value = "Rock3";
      Measures.load("Rock3");
      Glob.settings.instrumentSetSelector.selectedIndex = Glob.settings.instrumentSet;
      instrumentSetChanged();
      Glob.settings.reverbTypeSelector.selectedIndex = Glob.settings.reverbType;
      reverbTypeChanged();
      Glob.settings.reverbWetSlider.value = Glob.settings.reverbWet;
      reverbWetChanged();
      Glob.settings.message.style.visibility = "hidden";
      document.getElementById("measuresToPlayInput").value = Glob.settings.measuresToPlay;
      document.getElementById("tempoSlider").value = Glob.settings.tempo;
      fillPatternInstruments();
      tempoChanged();
      volumeChanged();
      drawPattern();
      additionalChanged();
      humanizeVolumesChanged();
      humanizeTimingChanged();
      initializeAudioNodes();
    }
  });

  document.getElementById("categorySelector").addEventListener("change", (e) => {
    Presets.fillRhythmSelect();
  });

  document.getElementById("loadRhythmButton").addEventListener("click", (e) => {
    let rhythm = "Rock3";
    let userChoice = false;

    if (!Glob.playing) {
      rhythm = document.getElementById("rhythmSelector").value;
      if (!Glob.settings.expert) {
        userChoice = window.confirm(`Load rhythm?`);
      }
      if (userChoice || Glob.settings.expert) {
        Measures.load(rhythm);
        Glob.settings.instrumentSetSelector.selectedIndex = Glob.settings.instrumentSet;
        instrumentSetChanged();
        Glob.settings.reverbTypeSelector.selectedIndex = Glob.settings.reverbType;
        reverbTypeChanged();
        Glob.settings.reverbWetSlider.value = Glob.settings.reverbWet;
        reverbWetChanged();
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
        Glob.initSettings();
        Glob.settings.tempoSlider.value = 120;
        const measure1 = new Measure();
        measure1.beats = 4;
        measure1.divisions = 4;
        Measure.fixMeasure(measure1);
        Measures.measures = [];
        Measures.measures.push(measure1);
        Glob.settings.instrumentSetSelector.selectedIndex = Glob.settings.instrumentSet;
        instrumentSetChanged();
        Glob.settings.reverbTypeSelector.selectedIndex = Glob.settings.reverbType;
        reverbTypeChanged();
        Glob.settings.reverbWetSlider.value = Glob.settings.reverbWet;
        reverbWetChanged();
        tempoChanged();
        document.getElementById("measuresToPlayInput").value = Glob.settings.measuresToPlay;
        Instruments.initSettings();
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

  document.getElementById("reverbTypeSelector").addEventListener("change", (e) => {
    reverbTypeChanged();
  });

  document.getElementById("reverbWetSlider").addEventListener("input", (e) => {
    reverbWetChanged();
  });

  document.getElementById('measuresToPlayInput').addEventListener('input', function () {
    Glob.settings.measuresToPlay = document.getElementById('measuresToPlayInput').value;
  });

  document.getElementById("loop").addEventListener("click", (e) => {
    loopClicked();
  });

  document.getElementById("showSettings").addEventListener("click", (e) => {
    showSettingsClicked();
  });

  document.getElementById("startStopButton").addEventListener("click", (e) => {
    if (Glob.playing) {
      Glob.stop = true;
      stopSounds();
    } else {
      playPattern();
    }
  });

  document.getElementById("playPadsButton").addEventListener("click", async (e) => {
    const convolver = reverb.getConvolver();
    if (convolver) {
      Glob.playingPads = true;
      Glob.settings.mainScreen.style.display = "none";
      Glob.settings.playScreen.style.display = "block";

      const audioCtx = Audio.audioContext;
      const set = Glob.settings.instrumentSet;

      playPadsBuffers = await Promise.all(
        Instruments.sets[set].map((instrument) => preprocessInstrument(instrument))
      );
      playPadsStereoNodes = [];
      Instruments.sets[set].forEach((instrument, idx) => {
        const pan = Glob.percentToPan(instrument.pan);
        playPadsStereoNodes.push(new StereoPannerNode(audioCtx, { pan }));
        if (instrument.reverb) {
          reverb.connectSource(playPadsStereoNodes[idx]);
        } else {
          playPadsStereoNodes[idx].connect(audioCtx.destination);
        }
      });
      document.documentElement.requestFullscreen();
      drawPads();
    } else {
      alert(msgReverbNotLoaded);
    }
  });

  document.getElementById("playScreenToMainScreenButton").addEventListener("click", (e) => {
    Glob.playingPads = false;
    Glob.settings.mainScreen.style.display = "block";
    Glob.settings.playScreen.style.display = "none";
    playPadsStereoNodes.forEach(node => node.disconnect());
    document.exitFullscreen();
    scheduleDraw();
  });

  // document.getElementById("canvasPlayScreen").addEventListener("pointerdown", (e) => {
  //   // The pointerdown event works faster than the mousedown event, since it does not wait to detect a double click
  //   padClicked(e)
  // });

  document.getElementById("canvasPlayScreen").addEventListener("pointerdown", (e) => {
    requestAnimationFrame(() => padClicked(e)); // Prioritize before UI updates
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
        for (let r = 0; r < Instruments.sets[Glob.settings.instrumentSet].length; r++) {
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
    Glob.settings.message.innerText = "";
    Glob.settings.message.style.visibility = "hidden";
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

  document.getElementById("multiplyDivisionsByTwo").addEventListener("click", (e) => {
    let userChoice = false;
    if (!Glob.playing) {
      if (!Glob.settings.expert) {
        userChoice = window.confirm(`Multiply divisions of current measure by 2 (pattern will be adapted)?`);
      }
      if (userChoice || Glob.settings.expert) {
        Measure.multiplyDivisionsByTwo(Measures.measures[Glob.currentMeasure]);
        drawPattern();
      }
    }
  });

  document.getElementById("divideDivisionsByTwo").addEventListener("click", (e) => {
    let userChoice = false;
    if (!Glob.playing) {
      if ((Measures.measures[Glob.currentMeasure].divisions % 2) === 0) {
        if (!Glob.settings.expert) {
          userChoice = window.confirm(`Divide divisions of current measure by 2 (even columns will be deleted)?`);
        }
        if (userChoice || Glob.settings.expert) {
          Measure.divideDivisionsByTwo(Measures.measures[Glob.currentMeasure]);
          drawPattern();
        }
      } else {
        alert("Divisions of current measure can not be divided by 2.");
      }
    }
  });

  document.getElementById("body").addEventListener("keydown", (e) => {
    handleKeyDown(e);
  });

  document.getElementById("testButton").addEventListener("click", (e) => {
    Test.runTests();
    drawPattern();
  });

  window.addEventListener("resize", () => {
    updateCanvasPlayScreenSize();
    if (Glob.playingPads) {
      setTimeout(drawPads, 200);
    } else {
      setTimeout(drawPattern, 200);
    }
  });

  Instruments.init();
  Audio.init();
  Distortion.init();
  reverb = new Reverb(Audio.audioContext, "wav/Reverb_Plate_2.wav");
} catch (e) {
  if (typeof window !== 'undefined') {
    console.log(e);
  }
}


