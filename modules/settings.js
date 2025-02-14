class Settings {
  constructor() {
    this.additional = 0; // 0 = Never, 1 = Always, 2 = Random
    this.pattern = document.getElementById("pattern");
    this.tempo = 120;
    this.tempoSlider = document.getElementById("tempoSlider");
    this.volume = 75;
    this.volumeSlider = document.getElementById("volumeSlider");
  }

}

export { Settings };
