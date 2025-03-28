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

    static create() {
        let column = 0;
        let columnsPerMeasure = 0;
        let euclideanSteps = "Beats";
        let nStart = 0;
        let nStop = 0;
        let steps = 0;

        const row = Glob.tryParseInt(document.getElementById("euclideanInstrument").value, 0);
        const euclideanOnsets = Glob.tryParseInt(document.getElementById("euclideanOnsets").value, 1);
        const euclideanRotation = Glob.tryParseInt(document.getElementById("euclideanRotation").value, 0);
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
            const pattern = this.pattern(steps, euclideanOnsets, euclideanRotation);
            for (let i = 0; i < measure.beats; i++) {
                for (let j = 0; j < measure.divisions; j++) {
                    column = (i * measure.divisions) + j;
                    Instruments.setCell(column, row, 0);
                    if (euclideanSteps === "Beats") {
                        if ((j === 0) && (pattern[i] === "1")) {
                            Instruments.setCell(column, row, 1);
                        }
                    }
                    if (euclideanSteps === "Columns") {
                        if (pattern[column] === "1") {
                            Instruments.setCell(column, row, 1);
                        }
                    }
                }
            }
        }

    }

    static pattern(steps, pulses, rotation = 0) {
        if (pulses === 0) return "0".repeat(steps);
        if (pulses >= steps) return "1".repeat(steps);
        if (pulses === 1) return "1" + "0".repeat(steps - 1);

        // For nearly full patterns, use the complement of the pattern for (steps, steps - pulses)
        if (pulses > steps / 2) {
            // Compute pattern for the complementary case without user rotation.
            let comp = this.pattern(steps, steps - pulses, 0);
            // Invert the bits: 0 -> 1 and 1 -> 0.
            let inverted = comp.split('').map(bit => bit === '0' ? '1' : '0').join('');
            // For proper alignment in the near-full case, right-rotate by one.
            inverted = inverted.slice(-1) + inverted.slice(0, -1);
            return inverted;
        }

        // Build the counts and remainders arrays
        let counts = [];
        let remainders = [];
        remainders.push(pulses);
        let divisor = steps - pulses;
        let level = 0;
        while (true) {
            counts.push(Math.floor(divisor / remainders[level]));
            let r = divisor % remainders[level];
            remainders.push(r);
            level++;
            if (remainders[level] <= 1) break;
            divisor = remainders[level - 1];
        }
        counts.push(divisor);

        // Recursive build function
        function build(lvl) {
            if (lvl === -1) return [0];
            if (lvl === -2) return [1];
            let seq = [];
            for (let i = 0; i < counts[lvl]; i++) {
                seq = seq.concat(build(lvl - 1));
            }
            if (remainders[lvl] > 0) {
                seq = seq.concat(build(lvl - 2));
            }
            return seq;
        }

        let patternArr = build(level);
        patternArr = patternArr.slice(0, steps);

        // Apply a base rotation so that the pattern appears in canonical form.
        // Heuristic: if pulses <= steps/2, use a left rotation of 1; else use steps - (steps mod pulses)
        let baseRotation = pulses <= (steps / 2) ? 1 : steps - (steps % pulses);
        baseRotation = ((baseRotation % steps) + steps) % steps;
        patternArr = patternArr.slice(baseRotation).concat(patternArr.slice(0, baseRotation));

        // Then apply any user-specified rotation.
        if (rotation) {
            rotation = ((rotation % steps) + steps) % steps;
            patternArr = patternArr.slice(-rotation).concat(patternArr.slice(0, -rotation));
        }

        return patternArr.join('');
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