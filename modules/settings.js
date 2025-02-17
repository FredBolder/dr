class Settings {
  constructor() {
    this.additional = 0; // 0 = Never, 1 = Always, 2 = Random
    this.expert = false;
    this.humanizeTiming = 1; // 0 = No
    this.humanizeVolumes = 2; // 0 = No
    this.loop = true;
    this.measuresToPlay = "";
    this.pattern = document.getElementById("pattern");
    this.tempo = 120;
    this.tempoSlider = document.getElementById("tempoSlider");
    this.volume = 75;
    this.volumeSlider = document.getElementById("volumeSlider");
  }

}

export { Settings };
