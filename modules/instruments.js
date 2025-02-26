import { Glob } from "./glob.js";
import { Measures } from "./measures.js";

class Instruments {
  static names;

  static init() {
    this.names = [
      "Touberleki Slap",
      "Touberleki Ka",
      "Touberleki Tek",
      "Touberleki Doum",
      "Defi Tek",
      "Defi Doum",
      "Bendir Tek",
      "Bendir Doum",
      "Daouli Tek",
      "Daouli Doum",
      "Cowbell",
      "Crash cymbal 1",
      "Crash cymbal 2",
      "Chinese cymbal",
      "Splash cymbal",
      "Ride bell",
      "Ride cymbal",
      "Open hi-hat",
      "Closed hi-hat",
      "High tom",
      "Mid tom",
      "Low tom",
      "Cross stick",
      "Snare drum",
      "Bass drum",
      "Pedal hi-hat",
    ];
    this.fileNames = [];
    for (let i = 0; i < this.names.length; i++) {
      const fileName = "wav/" + Glob.spacesToUnderscore(this.names[i]) + ".wav";
      this.fileNames.push(fileName);
    }
    this.sets = [];
    for (let i = 0; i < 2; i++) {
      this.sets.push([]);
      switch (i) {
        case 0:
          // Drums
          for (let j = 0; j < 16; j++) {
            this.sets[i].push({ name: this.names[j + 10], fileName: this.fileNames[j + 10] });
          }
          break;
        case 1:
          // Greek percussion
          for (let j = 0; j < 10; j++) {
            this.sets[i].push({ name: this.names[j], fileName: this.fileNames[j] });
          }
          break;
        default:
          break;
      }
    }
  }

  static getCell(m, c, r) {
    let map = [];
    const measure = Measures.measures[m];
    switch (Glob.settings.instrumentSet) {
      case 0:
        // Drums
        map = [
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
        break;
      case 1:
        // Greek percussion
        map = [
          measure.touberlekiSlap[c],
          measure.touberlekiKa[c],
          measure.touberlekiTek[c],
          measure.touberlekiDoum[c],
          measure.defiTek[c],
          measure.defiDoum[c],
          measure.bendirTek[c],
          measure.bendirDoum[c],
          measure.daouliTek[c],
          measure.daouliDoum[c],
        ];
        break;
      default:
        break;
    }
    return map[r];
  }

  static setCell(c, r, value) {
    const measure = Measures.measures[Glob.currentMeasure];

    switch (Glob.settings.instrumentSet) {
      case 0:
        // Drums
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
        break;
      case 1:
        // Greek percussion
        switch (r) {
          case 0:
            measure.touberlekiSlap[c] = value;
            break;
          case 1:
            measure.touberlekiKa[c] = value;
            break;
          case 2:
            measure.touberlekiTek[c] = value;
            break;
          case 3:
            measure.touberlekiDoum[c] = value;
            break;
          case 4:
            measure.defiTek[c] = value;
            break;
          case 5:
            measure.defiDoum[c] = value;
            break;
          case 6:
            measure.bendirTek[c] = value;
            break;
          case 7:
            measure.bendirDoum[c] = value;
            break;
          case 8:
            measure.daouliTek[c] = value;
            break;
          case 9:
            measure.daouliDoum[c] = value;
            break;
        }
        break;
      default:
        break;
    }

  }


}

export { Instruments };