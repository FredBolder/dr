import { Audio } from "./audio.js";
import { Glob } from "./glob.js";
import { Measures } from "./measures.js";

class Instruments {
  static bassDrum = 18;
  static openHiHat = 9;
  static closedHiHat = 10;
  static lowTom = 13;
  static pedalHiHat = 19;
  static rideBell = 7;
  static rideCymbal = 8;
  static snareDrum = 17;
  static touberlekiTek = 2;

  static names;

  static init() {
    this.instruments = [
      { name: "Touberleki Slap", shortName: "TBS", file: "wav/Touberleki_Slap.wav", key: "", property: "touberlekiSlap", export: "10_Slap", euclidean: {} },
      { name: "Touberleki Ka", shortName: "TBK", file: "wav/Touberleki_Ka.wav", key: "H", property: "touberlekiKa", export: "10_Ka", euclidean: {} },
      { name: "Touberleki Tek", shortName: "TBT", file: "wav/Touberleki_Tek.wav", key: "G", property: "touberlekiTek", export: "10_Tek", euclidean: {} },
      { name: "Touberleki Doum", shortName: "TBD", file: "wav/Touberleki_Doum.wav", key: "F", property: "touberlekiDoum", export: "10_Doum", euclidean: {} },
      { name: "Defi Tek", shortName: "DFT", file: "wav/Defi_Tek.wav", key: "X", property: "defiTek", export: "", euclidean: {} },
      { name: "Defi Doum", shortName: "DFD", file: "wav/Defi_Doum.wav", key: "Y", property: "defiDoum", export: "", euclidean: {} },
      { name: "Bendir Tek", shortName: "BET", file: "wav/Bendir_Tek.wav", key: "W", property: "bendirTek", export: "", euclidean: {} },
      { name: "Bendir Doum", shortName: "BED", file: "wav/Bendir_Doum.wav", key: "Q", property: "bendirDoum", export: "", euclidean: {} },
      { name: "Daouli Tek", shortName: "DAT", file: "wav/Daouli_Tek.wav", key: "", property: "daouliTek", export: "", euclidean: {} },
      { name: "Daouli Doum", shortName: "DAD", file: "wav/Daouli_Doum.wav", key: "", property: "daouliDoum", export: "", euclidean: {} },
      { name: "Wood block", shortName: "WB", file: "wav/Wood_block_1.wav, wav/Pate_1.wav", key: "", property: "woodBlock", export: "01_Wood_block", euclidean: {} },
      { name: "Claves", shortName: "CL", file: "wav/Claves_1.wav, wav/Claves_2.wav", key: "E", property: "claves", export: "01_Claves", euclidean: {} },
      { name: "Cowbell", shortName: "CB", file: "wav/Cowbell_1.wav, wav/Cowbell_2.wav", key: "R", property: "cowbell", export: "01_Cowbell", euclidean: {} },
      { name: "Crash cymbal 1", shortName: "CC1", file: "wav/Crash_cymbal_1.wav", key: "O", property: "crashCymbal1", export: "01_Crash_cymbal_1", euclidean: {} },
      { name: "Crash cymbal 2", shortName: "CC2", file: "wav/Crash_cymbal_2.wav", key: "P", property: "crashCymbal2", export: "01_Crash_cymbal_2", euclidean: {} },
      { name: "Chinese cymbal", shortName: "CHC", file: "wav/Chinese_cymbal.wav", key: "Z", property: "chineseCymbal", export: "01_Chinese_cymbal", euclidean: {} },
      { name: "Splash cymbal", shortName: "SC", file: "wav/Splash_cymbal_1.wav, wav/Splash_cymbal_2.wav", key: "T", property: "splashCymbal", export: "01_Splash_cymbal", euclidean: {} },
      { name: "Ride bell", shortName: "RB", file: "wav/Ride_bell.wav", key: "I", property: "rideBell", export: "01_Ride_bell", euclidean: {} },
      { name: "Ride cymbal", shortName: "RC", file: "wav/Ride_cymbal_1.wav, wav/Ride_cymbal_2.wav", key: "U", property: "rideCymbal", export: "01_Ride_cymbal", euclidean: {} },
      { name: "Open hi-hat", shortName: "OH", file: "wav/Open_hi-hat.wav", key: "L", property: "openHiHat", export: "01_Open_hi-hat", euclidean: {} },
      { name: "Closed hi-hat", shortName: "CH", file: "wav/Closed_hi-hat.wav", key: "J", property: "closedHiHat", export: "01_Closed_hi-hat", euclidean: {} },
      { name: "High tom", shortName: "HT", file: "wav/High_tom_1.wav, wav/High_tom_2.wav", key: "A", property: "highTom", export: "01_High_tom", euclidean: {} },
      { name: "Mid tom", shortName: "MT", file: "wav/Mid_tom_1.wav, wav/Mid_tom_2.wav", key: "S", property: "midTom", export: "01_Mid_tom", euclidean: {} },
      { name: "Low tom", shortName: "LT", file: "wav/Low_tom_1.wav, wav/Low_tom_2.wav", key: "D", property: "lowTom", export: "01_Low_tom", euclidean: {} },
      { name: "Sd (snrs off)", shortName: "SO", file: "wav/Sd_(snrs_off).wav", key: "M", property: "sdSnaresOff", export: "01_Sd_(snrs_off)", euclidean: {} },
      { name: "Rimshot", shortName: "RS", file: "wav/Rimshot.wav", key: "V", property: "rimshot", export: "01_Rimshot", euclidean: {} },
      { name: "Cross stick", shortName: "CS", file: "wav/Cross_stick.wav", key: "N", property: "crossStick", export: "01_Cross_stick", euclidean: {} },
      { name: "Snare drum", shortName: "SD", file: "wav/Snare_drum_1.wav, wav/Snare_drum_2.wav", key: "B", property: "snareDrum", export: "01_Snare_drum", euclidean: {} },
      { name: "Bass drum", shortName: "BD", file: "wav/Bass_drum_1.wav, wav/Bass_drum_2.wav", key: "C", property: "bassDrum", export: "01_Bass_drum", euclidean: {} },
      { name: "Pedal hi-hat", shortName: "PH", file: "wav/Pedal_hi-hat.wav", key: "K", property: "pedalHiHat", export: "01_Pedal_hi-hat", euclidean: {} },
    ];
    this.initSettings();

    this.fileNames = [];
    for (let i = 0; i < this.instruments.length; i++) {
      const file = this.instruments[i].file;
      if (file.includes(",")) {
        this.fileNames.push(Glob.getStringFromCommaDelimited(file, 0));
        this.fileNames.push(Glob.getStringFromCommaDelimited(file, 1));
      } else {
        this.fileNames.push(file);
      }
    }
    this.sets = [];
    for (let i = 0; i < 2; i++) {
      this.sets.push([]);
      switch (i) {
        case 0:
          // Drums
          for (let j = 0; j < 20; j++) {
            this.sets[i].push(this.instruments[j + 10]);
          }
          break;
        case 1:
          // Greek percussion
          for (let j = 0; j < 10; j++) {
            this.sets[i].push(this.instruments[j]);
          }
          break;
        default:
          break;
      }
    }
  }

  static initSettings() {
    for (let i = 0; i < this.instruments.length; i++) {
      this.instruments[i].mute = false;
      this.instruments[i].solo = false;
      this.instruments[i].other = false;
      this.instruments[i].volume = 100;
      this.instruments[i].pitch = 50; // 50 = original pitch, 0 = octave lower, 100 = octave higher
      this.instruments[i].pan = 50; // 50 = center, 0 = left, 1 = right
      this.instruments[i].filterType = 0; // 0 = OFF, 1 = LP, 2 = HP, 3 = BP
      this.instruments[i].filterFreq = 50;
      this.instruments[i].filterQ = 0;
      this.instruments[i].distortion = 0;
      this.instruments[i].reverb = true;
    }
  }

  static getCell(m, c, r) {
    return Measures.measures[m][this.sets[Glob.settings.instrumentSet][r].property][c];
  }

  static getInstrumentByProp(prop) {
    let result = null;
    for (let i = 0; i < this.instruments.length; i++) {
      if (this.instruments[i].property === prop) {
        result = this.instruments[i];
      }
    }
    return result;
  }

  static playPadsList() {
    let result;
    if (Glob.isLandscape()) {
      switch (Glob.settings.instrumentSet) {
        case 0:
          result = [11, 12, 13, 8, 3, 18, 17, 16, 10, 9];
          break;
        case 1:
          result = [8, 6, 4, 2, 0, 9, 7, 5, 3, 1];
          break;
        default:
          result = [11, 12, 13, 8, 3, 18, 17, 16, 10, 9];
          break;
      }
    } else {
      switch (Glob.settings.instrumentSet) {
        case 0:
          result = [11, 12, 13, 3, 8, 9, 16, 10, 18, 17];
          break;
        case 1:
          result = [1, 0, 3, 2, 5, 4, 7, 6, 9, 8];
          break;
        default:
          result = [11, 12, 13, 3, 8, 9, 16, 10, 18, 17];
          break;
      }
    }
    return result;
  }

  static setCell(c, r, value) {
    Measures.measures[Glob.currentMeasure][this.sets[Glob.settings.instrumentSet][r].property][c] = value;
  }

  static stopOpenHiHat(time) {
    const audioCtx = Audio.audioContext;
    setTimeout(() => {
      Glob.openHiHat.forEach(oh => {
        if (oh.source.started) {
          try {
            const fadeOutTime = 0.2; // Time in seconds
            oh.gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + fadeOutTime);
            setTimeout(() => {
              oh.source.stop();
            }, fadeOutTime * 1000);
          } catch (e) {
            console.error("Error stopping open hi-hat:", e);
          }
        }
      });
      Glob.openHiHat = Glob.openHiHat.filter(oh => oh.source.started); // Keep only started ones
    }, time);
  }

}

export { Instruments };