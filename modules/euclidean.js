import { Glob } from "./glob.js";
import { Instruments } from "./instruments.js";
import { Measures } from "./measures.js";

class Euclidean {
    static lengthOfLongestRow(arr) {
        let result = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length > result) {
                result = arr[i].length;
            }
        }
        return result;
    }

    static allTheSame(arr) {
        let same = true;

        if (arr.length < 2) {
            return true;
        }
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== arr[0]) {
                same = false;
            }
        }
        return same;
    }

    static create() {
        let column = 0;
        let columnsPerMeasure = 0;
        let combine = "";
        let euclideanSteps = "Beats";
        let found = 0;
        let nStart = 0;
        let nStop = 0;
        let steps = 0;

        combine = document.getElementById("euclideanCombine").value;
        if ((combine !== "AND") && (combine !== "XOR") && (combine !== "INV")) {
            combine = "OR";
        }
        const row = Glob.tryParseInt(document.getElementById("euclideanInstrument").value, 0);
        const euclideanOnsets = Glob.getPositiveIntList(document.getElementById("euclideanOnsets").value);
        const euclideanRotation = Glob.getPositiveIntList(document.getElementById("euclideanRotation").value);
        const allMeasures = document.getElementById("euclideanAllMeasures").checked;

        euclideanSteps = document.getElementById("euclideanSteps").value;

        if (allMeasures) {
            nStart = 0;
            nStop = Measures.measures.length - 1;
        } else {
            nStart = Glob.currentMeasure;
            nStop = nStart;
        }
        for (let m = nStart; m <= nStop; m++) {
            const measure = Measures.measures[m];
            Glob.currentMeasure = m;
            columnsPerMeasure = measure.beats * measure.divisions;
            switch (euclideanSteps) {
                case "Beats":
                    steps = measure.beats;
                    break;
                case "Columns":
                    steps = columnsPerMeasure;
                    break;
                default:
                    steps = measure.beats;
                    break;
            }
            const patterns = [];
            for (let i = 0; i < euclideanOnsets.length; i++) {
                let rotation = 0;
                if (i < euclideanRotation.length) {
                    rotation = euclideanRotation[i];
                }
                patterns.push(this.pattern(steps, euclideanOnsets[i], rotation));
            }
            for (let i = 0; i < measure.beats; i++) {
                for (let j = 0; j < measure.divisions; j++) {
                    column = (i * measure.divisions) + j;
                    Instruments.setCell(column, row, 0);
                    if (euclideanSteps === "Beats") {
                        if (j === 0) {
                            found = 0;
                            for (let p = 0; p < patterns.length; p++) {
                                if (patterns[p][i] === "1") {
                                    found++;
                                }
                            }
                            if (((combine === "OR") && (found > 0)) || ((combine === "AND") && (found === patterns.length)) ||
                                ((combine === "XOR") && (found === 1) || ((combine === "INV") && (found === 0)))) {
                                Instruments.setCell(column, row, 1);
                            }
                        }
                    }
                    if (euclideanSteps === "Columns") {
                        found = 0;
                        for (let p = 0; p < patterns.length; p++) {
                            if (patterns[p][column] === "1") {
                                found++;
                            }
                        }
                        if (((combine === "OR") && (found > 0)) || ((combine === "AND") && (found === patterns.length)) ||
                            ((combine === "XOR") && (found === 1) || ((combine === "INV") && (found === 0)))) {
                            Instruments.setCell(column, row, 1);
                        }
                    }
                }
            }
        }

    }

    static pattern(steps, pulses, rotation = 0) {
        let result = "";
        const method = Glob.tryParseInt(document.getElementById("euclideanMethod").value, 1);
        switch (method) {
            case 1:
                result = this.pattern1(steps, pulses, rotation);
                break;
            case 2:
                result = this.pattern2(steps, pulses, rotation);
                break;
            default:
                break;
        }
        return result;
    }

    static pattern1(steps, pulses, rotation = 0) {
        let result = "";
        let idx1 = 0;
        let idx2 = 0;
        let n = 0;
        let s1 = "";
        let s2 = "";
        let stop = false;
        const arr = [];

        if (pulses === 0) return "0".repeat(steps);
        if (pulses >= steps) return "1".repeat(steps);

        for (let i = 0; i < pulses; i++) {
            arr.push("1");
        }
        for (let i = 0; i < steps - pulses; i++) {
            arr.push("0");
        }

        if (pulses === 1) {
            result = "1" + "0".repeat(steps - 1);
        } else {
            n = 0;
            do {
                stop = false;
                s1 = arr[arr.length - 1];
                idx1 = arr.length - 1;
                idx2 = 0;
                do {
                    s2 = arr[idx1];
                    if ((s2 === s1) && (arr[idx2] !== s1) && (arr.length > 1)) {
                        arr[idx2] += s1;
                        arr.pop();
                    }
                    idx1--;
                    idx2++;
                } while ((s2 === s1) && (idx1 >= 0) && (idx2 < arr.length));
                //console.log(arr);
                n++;
                if (arr.length === 1) {
                    stop = true;
                }
                if (arr.length > 1) {
                    if (arr[arr.length - 1].length > 2) {
                        stop = true;
                    }
                    if (arr[arr.length - 1] !== arr[arr.length - 2]) {
                        stop = true;
                    }
                    if (this.allTheSame(arr)) {
                        stop = true;
                    }
                }
            } while (!stop);

            for (let i = 0; i < arr.length; i++) {
                result += arr[i];
            }
        }

        result = this.rotate(result, rotation, steps);
        return result;
    }

    static pattern2(steps, pulses, rotation = 0) {
        let result = "";
        const arr = [];

        if (pulses === 0) return "0".repeat(steps);
        if (pulses >= steps) return "1".repeat(steps);

        if (pulses === 1) {
            result = "1" + "0".repeat(steps - 1);
        } else {
            for (let i = -1; i < steps; i++) {
                arr.push(Glob.mod((i * pulses), steps));
            }
            // The first number in the array should be the same as the last number
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[i] > arr[i + 1]) {
                    result += "1";
                } else {
                    result += "0";
                }
            }
        }
        result = this.rotate(result, rotation, steps);
        return result;
    }

    static rotate(s, rotation, steps) {
        let result = s;

        if ((rotation !== 0) && (s.length === steps)) {
            rotation = Glob.mod(rotation, steps);
            result = result.slice(-rotation).concat(result.slice(0, -rotation));
        }
        return result;
    }

    static loadSettings() {
        const row = Glob.tryParseInt(document.getElementById("euclideanInstrument").value, 0);

        if (Instruments.sets[Glob.settings.instrumentSet][row].euclidean.hasOwnProperty("steps")) {
            document.getElementById("euclideanSteps").value = Instruments.sets[Glob.settings.instrumentSet][row].euclidean.steps;
        }
        if (Instruments.sets[Glob.settings.instrumentSet][row].euclidean.hasOwnProperty("onsets")) {
            document.getElementById("euclideanOnsets").value = Instruments.sets[Glob.settings.instrumentSet][row].euclidean.onsets;
        }
        if (Instruments.sets[Glob.settings.instrumentSet][row].euclidean.hasOwnProperty("rotation")) {
            document.getElementById("euclideanRotation").value = Instruments.sets[Glob.settings.instrumentSet][row].euclidean.rotation;
        }
    }

    static saveSettings() {
        const row = Glob.tryParseInt(document.getElementById("euclideanInstrument").value, 0);
        Instruments.sets[Glob.settings.instrumentSet][row].euclidean.steps = document.getElementById("euclideanSteps").value;
        Instruments.sets[Glob.settings.instrumentSet][row].euclidean.onsets = document.getElementById("euclideanOnsets").value;
        Instruments.sets[Glob.settings.instrumentSet][row].euclidean.rotation = document.getElementById("euclideanRotation").value;
    }

}

export { Euclidean };