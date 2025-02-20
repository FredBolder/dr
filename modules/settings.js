class Settings {
  constructor() {
    this.additional = 0; // 0 = Never, 1 = Always, 2 = Random
    this.expert = false;
    this.humanizeTiming = 1; // 0 = No
    this.humanizeVolumes = 2; // 0 = No
    this.instrumentSet = 0; // 0 = Drums, 1 = Greek percussion
    this.instrumentSetSelector = document.getElementById("instrumentSetSelector");
    this.loadRhythmButton = document.getElementById("loadRhythmButton");
    this.loop = true;
    this.measuresToPlay = "";
    this.newButton = document.getElementById("newButton");
    this.openButton = document.getElementById("openButton");
    this.pattern = document.getElementById("pattern");
    this.saveButton = document.getElementById("saveButton");
    this.tempo = 120;
    this.tempoSlider = document.getElementById("tempoSlider");
    this.volume = 75;
    this.volumeSlider = document.getElementById("volumeSlider");

    this.previousMeasureButton = document.getElementById("previousMeasureButton");
    this.nextMeasureButton = document.getElementById("nextMeasureButton");
    this.clearMeasureButton = document.getElementById("clearMeasureButton");
    this.addMeasureButton = document.getElementById("addMeasureButton");
    this.deleteMeasureButton = document.getElementById("deleteMeasureButton");
    this.addBeatButton = document.getElementById("addBeatButton");
    this.deleteBeatButton = document.getElementById("deleteBeatButton");
    this.incDivisionButton = document.getElementById("incDivisionButton");
    this.decDivisionButton = document.getElementById("decDivisionButton");
    this.copyMeasureButton = document.getElementById("copyMeasureButton");
    this.expertCheckbox = document.getElementById("expert");
    this.applyPresetPatternButton = document.getElementById("applyPresetPatternButton");
  }

}

export { Settings };
