class Glob {
  static currentMeasure;
  static playing;
  static settings;
  static stop;

  static init() {
    this.currentMeasure = 0;
    this.playing = false;
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

  static intToBool(i) {
    return (i === 1);
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

  static removeChars(input, chars) {
    let result = "";
    for (let i = 0; i < input.length; i++) {
      if (!chars.includes(input[i])) {
        result += input[i];
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

  static tryParseInt(str, defaultValue) {
    let result = defaultValue;
    if (str !== null) {
      if (str.length > 0) {
        if (!isNaN(str)) {
          result = parseInt(str);
        }
      }
    }
    return result;
  }
}

export { Glob };
