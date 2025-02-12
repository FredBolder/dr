import { Glob } from "./glob.js";

class Instruments {
  static names;

  static init() {
    this.names = [
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
  }

}

export { Instruments };