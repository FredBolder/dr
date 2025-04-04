class Glob {
  static currentMeasure;
  static playing;
  static playingPads;
  static settings;
  static stop;

  static init() {
    this.currentMeasure = 0;
    this.openHiHat = [];
    this.playing = false;
    this.playingPads = false;
    this.settings = null;
    this.stop = false;
  }

  static boolToInt(b) {
    if (b) {
      return 1;
    } else {
      return 0;
    }
  }

  static boolToYesNo(b) {
    if (b) {
      return "Yes";
    } else {
      return "No";
    }
  }

  static fillChar(n, c) {
    let result = "";

    for (let i = 0; i < n; i++) {
      result += c;
    }
    return result;
  }

  static getPositiveIntList(s) {
    let result = [];
    if ((s !== null) && (typeof s === "string")) {
      const arr = s.split(",");
      for (let i = 0; i < arr.length; i++) {
        const value = this.tryParseInt(arr[i], -1);
        if (value >= 0) {
          result.push(value);
        }
      }
    }
    return result;
  }

  static getStringFromCommaDelimited(s, idx) {
    const arr = s.split(",");
    let result = "";
    if ((idx >= 0) && (idx < arr.length)) {
      result = arr[idx].trim();
    }
    return result;
  }

  static indexToFilterType(idx) {
    const filters = ["lowpass", "lowpass", "highpass", "bandpass", "notch"]; // When off set also to lowpass
    let result = "";
    if ((idx >= 0) && (idx < filters.length)) {
      result = filters[idx];
    }
    return result;
  }

  static indexToFilterTypeText(idx) {
    const filters = ["OFF", "LP", "HP", "BP"];
    let result = "";
    if ((idx >= 0) && (idx < filters.length)) {
      result = filters[idx];
    }
    return result;
  }

  static initSettings() {
    Glob.currentMeasure = 0;
    Glob.settings.measuresToPlay = "";
    this.settings.instrumentSet = 0;
    this.settings.reverbType = 3;
    this.settings.reverbWet = 25;
  }

  static intToBool(i) {
    return (i === 1);
  }

  static isEven(n) {
    return n % 2 == 0;
  }

  static isLandscape() {
    return window.innerWidth > window.innerHeight;
  }

  static isUnique(arr) {
    let unique = true;

    if (arr.length < 2) {
      return true;
    }
    for (let i = 0; i < arr.length; i++) {
      const value1 = JSON.stringify(arr[i]);
      for (let j = 0; j < arr.length; j++) {
        const value2 = JSON.stringify(arr[j]);
        if ((value1 === value2) && (i !== j)) {
          unique = false;
        }
      }
    }
    return unique;
  }

  static minMax(value, min, max) {
    let result = value;
    if (max >= min) {
      if (result > max) {
        result = max;
      }
      if (result < min) {
        result = min;
      }
    }
    return result;
  }

  static mod(n, m) {
    return ((n % m) + m) % m;
  }

  static percentToFilterFreq(p) {
    return (p / 100) * 5000 + 10;
  }

  static percentToFilterQ(percentage) {
    return (percentage / 100) * 50 + 1;
  }

  static percentToPan(percentage) {
    if (percentage < 50) {
      return -((50 - percentage) / 50);
    } else {
      return ((percentage - 50) / 50);
    }
  }

  static percentToPitch(percentage) {
    if (percentage < 50) {
      return 1 - (0.5 * ((50 - percentage) / 50));
    } else {
      return ((percentage - 50) / 50) + 1;
    }
  }

  static randomInt(min, max) {
    min = Math.trunc(min);
    max = Math.trunc(max);
    return Math.floor((Math.random() * (max - min + 1))) + min;
  }

  static removeChars(input, chars) {
    let result = "";
    for (let i = 0; i < input.length; i++) {
      if (!chars.includes(input[i])) {
        result += input[i];
      }
    }
    return result;
  }

  static retrieveSettings() {
    let expert = localStorage.getItem("expert");
    if (this.settings !== null) {
      if (expert === "1") {
        this.settings.expert = true;
      }
      if (expert === "0") {
        this.settings.expert = false;
      }
    }
  }

  static reverse(s) {
    let result = "";

    if (s.length > 0) {
      for (let i = s.length - 1; i >= 0; i--) {
        result += s[i];
      }
    }
    return result;
  }

  static spacesToUnderscore(input) {
    let result = "";
    for (let i = 0; i < input.length; i++) {
      if (input[i] === " ") {
        result += "_";
      } else {
        result += input[i];
      }
    }
    return result;
  }

  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static storeSettings() {
    if (this.settings !== null) {
      localStorage.setItem("expert", this.boolToInt(this.settings.expert).toString());
    }
  }

  static tryParseInt(str, defaultValue) {
    let result = defaultValue;
    if (str !== null) {
      if (typeof str === "string") {
        str = str.trim();
        if (str.length > 0) {
          result = parseInt(str);
          if (isNaN(result)) {
            result = defaultValue;
          }
        }
      }
    }
    return result;
  }
}

export { Glob };
