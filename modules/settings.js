class Settings {
  constructor() {
    this.additional = 0; // 0 = Never, 1 = Always, 2 = Random
    this.expert = false;
    this.humanizeTiming = 1; // 0 = No
    this.humanizeVolumes = 2; // 0 = No
    this.instrumentSet = 0; // 0 = Drums, 1 = Greek percussion
    this.loop = document.getElementById("loop").checked;
    this.measuresToPlay = "";
    this.reverbType = 3;
    this.reverbWet = 25;
    this.showSettings = document.getElementById("showSettings").checked;
    this.tempo = 120;
    this.volume = 75;

    // HTML elements
    this.addBeatButton = document.getElementById("addBeatButton");
    this.addMeasureButton = document.getElementById("addMeasureButton");
    this.applyPresetPatternButton = document.getElementById("applyPresetPatternButton");
    this.canvasPlayScreen = document.getElementById("canvasPlayScreen");
    this.clearMeasureButton = document.getElementById("clearMeasureButton");
    this.copyMeasureButton = document.getElementById("copyMeasureButton");
    this.decDivisionButton = document.getElementById("decDivisionButton");
    this.deleteBeatButton = document.getElementById("deleteBeatButton");
    this.deleteMeasureButton = document.getElementById("deleteMeasureButton");
    this.divideDivisionsByTwo = document.getElementById("divideDivisionsByTwo");
    this.euclideanCreate = document.getElementById("euclideanCreate");
    this.euclideanOnsetsDecButton = document.getElementById("euclideanOnsetsDecButton");
    this.euclideanOnsetsIncButton = document.getElementById("euclideanOnsetsIncButton");
    this.euclideanRotationDecButton = document.getElementById("euclideanRotationDecButton");
    this.euclideanRotationIncButton = document.getElementById("euclideanRotationIncButton");
    this.expertCheckbox = document.getElementById("expert");
    this.exportButton = document.getElementById("exportButton");
    this.golombInfoButton = document.getElementById("golombInfoButton");
    this.incDivisionButton = document.getElementById("incDivisionButton");
    this.instrumentSetSelector = document.getElementById("instrumentSetSelector");
    this.loadRhythmButton = document.getElementById("loadRhythmButton");
    this.mainScreen = document.getElementById("mainScreen");
    this.message = document.getElementById("message");
    this.multiplyDivisionsByTwo = document.getElementById("multiplyDivisionsByTwo");
    this.newButton = document.getElementById("newButton");
    this.nextMeasureButton = document.getElementById("nextMeasureButton");
    this.openButton = document.getElementById("openButton");
    this.overlay = document.getElementById("overlay");
    this.pattern = document.getElementById("pattern");
    this.playPadsButton = document.getElementById("playPadsButton");
    this.playScreen = document.getElementById("playScreen");
    this.previousMeasureButton = document.getElementById("previousMeasureButton");
    this.randomRhythmButton = document.getElementById("randomRhythmButton");
    this.reverbTypeSelector = document.getElementById("reverbTypeSelector");
    this.reverbWetSlider = document.getElementById("reverbWetSlider");
    this.reverbWetValue = document.getElementById("reverbWetValue");
    this.saveButton = document.getElementById("saveButton");
    this.tabEuclidean = document.getElementById("tabEuclidean");
    this.tabMeasure = document.getElementById("tabMeasure");
    this.tabPreferences = document.getElementById("tabPreferences");
    this.tabRandom = document.getElementById("tabRandom");
    this.tabReverb = document.getElementById("tabReverb");
    this.tabTools = document.getElementById("tabTools");
    this.tempoSlider = document.getElementById("tempoSlider");
    this.tempoValue = document.getElementById("tempoValue");
    this.tpEuclidean = document.getElementById("tpEuclidean");
    this.tpMeasure = document.getElementById("tpMeasure");
    this.tpPreferences = document.getElementById("tpPreferences");
    this.tpRandom = document.getElementById("tpRandom");
    this.tpReverb = document.getElementById("tpReverb");
    this.tpTools = document.getElementById("tpTools");
    this.volumeSlider = document.getElementById("volumeSlider");
    this.volumeValue = document.getElementById("volumeValue");
  }

}

export { Settings };
