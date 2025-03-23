class Settings {
  constructor() {
    this.additional = 0; // 0 = Never, 1 = Always, 2 = Random
    this.expert = false;
    this.humanizeTiming = 1; // 0 = No
    this.humanizeVolumes = 2; // 0 = No
    this.instrumentSet = 0; // 0 = Drums, 1 = Greek percussion
    this.instrumentSetSelector = document.getElementById("instrumentSetSelector");
    this.reverbType = 3;
    this.reverbTypeSelector = document.getElementById("reverbTypeSelector");
    this.loadRhythmButton = document.getElementById("loadRhythmButton");
    this.loop = document.getElementById("loop").checked;
    this.message = document.getElementById("message");
    this.measuresToPlay = "";
    this.newButton = document.getElementById("newButton");
    this.openButton = document.getElementById("openButton");
    this.overlay = document.getElementById("overlay");
    this.pattern = document.getElementById("pattern");
    this.reverbWet = 25;
    this.reverbWetSlider = document.getElementById("reverbWetSlider");
    this.reverbWetValue = document.getElementById("reverbWetValue");
    this.saveButton = document.getElementById("saveButton");
    this.showSettings = document.getElementById("showSettings").checked;
    this.tempo = 120;
    this.tempoSlider = document.getElementById("tempoSlider");
    this.tempoValue = document.getElementById("tempoValue");
    this.volume = 75;
    this.volumeSlider = document.getElementById("volumeSlider");
    this.volumeValue = document.getElementById("volumeValue");

    this.canvasPlayScreen = document.getElementById("canvasPlayScreen");
    this.mainScreen = document.getElementById("mainScreen");
    this.playScreen = document.getElementById("playScreen");
    this.playPadsButton = document.getElementById("playPadsButton");
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
    this.multiplyDivisionsByTwo = document.getElementById("multiplyDivisionsByTwo");
    this.divideDivisionsByTwo = document.getElementById("divideDivisionsByTwo");
    this.randomRhythmButton = document.getElementById("randomRhythmButton");
  }

}

export { Settings };
