import { Audio } from "./audio.js";
import { Glob } from "./glob.js";
import { Measures } from "./measures.js";

class Instruments {
  static names;

  static init() {
    this.instruments = [
      {name: "Touberleki Slap", file: "wav/Touberleki_Slap.wav", key: "", property: "touberlekiSlap"},
      {name: "Touberleki Ka", file: "wav/Touberleki_Ka.wav", key: "H", property: "touberlekiKa"},
      {name: "Touberleki Tek", file: "wav/Touberleki_Tek.wav", key: "G", property: "touberlekiTek"},
      {name: "Touberleki Doum", file: "wav/Touberleki_Doum.wav", key: "F", property: "touberlekiDoum"},
      {name: "Defi Tek", file: "wav/Defi_Tek.wav", key: "X", property: "defiTek"},
      {name: "Defi Doum", file: "wav/Defi_Doum.wav", key: "Y", property: "defiDoum"},
      {name: "Bendir Tek", file: "wav/Bendir_Tek.wav", key: "W", property: "bendirTek"},
      {name: "Bendir Doum", file: "wav/Bendir_Doum.wav", key: "Q", property: "bendirDoum"},
      {name: "Daouli Tek", file: "wav/Daouli_Tek.wav", key: "", property: "daouliTek"},
      {name: "Daouli Doum", file: "wav/Daouli_Doum.wav", key: "", property: "daouliDoum"},
      {name: "Claves", file: "wav/Claves.wav", key: "E", property: "claves"},
      {name: "Cowbell", file: "wav/Cowbell.wav", key: "R", property: "cowbell"},
      {name: "Crash cymbal 1", file: "wav/Crash_cymbal_1.wav", key: "O", property: "crashCymbal1"},
      {name: "Crash cymbal 2", file: "wav/Crash_cymbal_2.wav", key: "P", property: "crashCymbal2"},
      {name: "Chinese cymbal", file: "wav/Chinese_cymbal.wav", key: "Z", property: "chineseCymbal"},
      {name: "Splash cymbal", file: "wav/Splash_cymbal.wav", key: "T", property: "splashCymbal"},
      {name: "Ride bell", file: "wav/Ride_bell.wav", key: "I", property: "rideBell"},
      {name: "Ride cymbal", file: "wav/Ride_cymbal_1.wav, wav/Ride_cymbal_2.wav", key: "U", property: "rideCymbal"},
      {name: "Open hi-hat", file: "wav/Open_hi-hat.wav", key: "L", property: "openHiHat"},
      {name: "Closed hi-hat", file: "wav/Closed_hi-hat.wav", key: "J", property: "closedHiHat"},
      {name: "High tom", file: "wav/High_tom_1.wav, wav/High_tom_2.wav", key: "A", property: "highTom"},
      {name: "Mid tom", file: "wav/Mid_tom_1.wav, wav/Mid_tom_2.wav", key: "S", property: "midTom"},
      {name: "Low tom", file: "wav/Low_tom_1.wav, wav/Low_tom_2.wav", key: "D", property: "lowTom"},
      {name: "Sd (snrs off)", file: "wav/Sd_(snrs_off).wav", key: "M", property: "sdSnaresOff"},
      {name: "Rimshot", file: "wav/Rimshot.wav", key: "V", property: "rimshot"},
      {name: "Cross stick", file: "wav/Cross_stick.wav", key: "N", property: "crossStick"},
      {name: "Snare drum", file: "wav/Snare_drum_1.wav, wav/Snare_drum_2.wav", key: "B", property: "snareDrum"},
      {name: "Bass drum", file: "wav/Bass_drum_1.wav, wav/Bass_drum_2.wav", key: "C", property: "bassDrum"},
      {name: "Pedal hi-hat", file: "wav/Pedal_hi-hat.wav", key: "K", property: "pedalHiHat"},
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
          for (let j = 0; j < 19; j++) {
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

  static initSettings(){
    for (let i = 0; i < this.instruments.length; i++) {
      this.instruments[i].mute = false;
      this.instruments[i].solo = false;
      this.instruments[i].reverb = true;
      this.instruments[i].other = false;
      this.instruments[i].volume = 100;
      this.instruments[i].pitch = 50; // 50 = original pitch, 0 = octave lower, 100 = octave higher
      this.instruments[i].pan = 50; // 50 = center, 0 = left, 1 = right
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