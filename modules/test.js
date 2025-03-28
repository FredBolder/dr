import { Euclidean } from "./euclidean.js";
import { Glob } from "./glob.js";
import { Measure } from "./measure.js";
import { Measures } from "./measures.js";
import { RandomRhythm } from "./randomRhythm.js";

class Test {
    static test(name, expected, received) {
        let ok = true;
        if (expected !== received) {
            console.log(`Test: ${name}, Expected: ${expected}, Received: ${received}`);
            ok = false;
        }
        return ok;
    }

    static runTests() {
        let allOk = true;
        let arr = [];
        let error = false;
        let ok = true;
        const saveMeasures = JSON.stringify(Measures.measures);
        let measure1 = [];
        let measure2 = [];
        let msg = "";
        let result;

        Measures.measures = [];
        measure1 = new Measure();
        measure1.beats = 4;
        measure1.divisions = 4;
        measure1.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
        Measure.fixMeasure(measure1);
        Measures.measures.push(measure1);
        measure2 = new Measure();
        measure2.beats = 3;
        measure2.divisions = 2;
        measure2.closedHiHat = [1, 0, 1, 0, 1, 0];
        Measure.fixMeasure(measure2);
        Measures.measures.push(measure2);

        result = Measures.calculateMeasureAndColumn(0, 15, [0, 1]);
        ok = this.test("calculateMeasureAndColumn 01A", JSON.stringify({ measure: 0, column: 15 }), JSON.stringify(result));
        if (!ok) allOk = false;

        result = Measures.calculateMeasureAndColumn(1, 15, [1, 0]);
        ok = this.test("calculateMeasureAndColumn 01B", JSON.stringify({ measure: 0, column: 15 }), JSON.stringify(result));
        if (!ok) allOk = false;

        result = Measures.calculateMeasureAndColumn(0, 16, [0, 1]);
        ok = this.test("calculateMeasureAndColumn 01C", JSON.stringify({ measure: 1, column: 0 }), JSON.stringify(result));
        if (!ok) allOk = false;

        result = Measures.calculateMeasureAndColumn(1, 7, [0, 1]);
        ok = this.test("calculateMeasureAndColumn 01D", JSON.stringify({ measure: 0, column: 1 }), JSON.stringify(result));
        if (!ok) allOk = false;

        result = Measures.calculateMeasureAndColumn(0, 8, [1, 0]);
        ok = this.test("calculateMeasureAndColumn 01E", JSON.stringify({ measure: 0, column: 2 }), JSON.stringify(result));
        if (!ok) allOk = false;

        result = Glob.getStringFromCommaDelimited("Test 1, Test 2", 1);
        ok = this.test("getStringFromCommaDelimited 01A", "Test 2", result);
        if (!ok) allOk = false;

        result = Glob.getStringFromCommaDelimited("ABCD, abcd", 0);
        ok = this.test("getStringFromCommaDelimited 01B", "ABCD", result);
        if (!ok) allOk = false;

        result = Glob.getStringFromCommaDelimited("A,B,C,D,E", 3);
        ok = this.test("getStringFromCommaDelimited 01C", "D", result);
        if (!ok) allOk = false;

        result = Glob.getStringFromCommaDelimited("test", 0);
        ok = this.test("getStringFromCommaDelimited 01D", "test", result);
        if (!ok) allOk = false;

        result = Glob.getStringFromCommaDelimited("One, Two, Three", 3);
        ok = this.test("getStringFromCommaDelimited 02A", "", result);
        if (!ok) allOk = false;

        result = Glob.getStringFromCommaDelimited("One, Two, Three", -1);
        ok = this.test("getStringFromCommaDelimited 02B", "", result);
        if (!ok) allOk = false;

        for (let i = 0; i < 50; i++) {
            error = false;
            result = Glob.randomInt(0, 5);
            if ((result < 0) || (result > 5)) {
                console.log(`Result from randomInt(0, 5): ${result}`);
                error = true;
            }
            ok = this.test("randomInt (0,5)", false, error);
            if (!ok) allOk = false;
        }

        for (let i = 0; i < 50; i++) {
            error = false;
            result = Glob.randomInt(-10, 10);
            if ((result < -10) || (result > 10)) {
                console.log(`Result from randomInt(-10, 10): ${result}`);
                error = true;
            }
            ok = this.test("randomInt(-10, 10)", false, error);
            if (!ok) allOk = false;
        }

        result = RandomRhythm.groupInfo(4, [3, 2, 2]);
        ok = this.test("groupInfo 01A", JSON.stringify({ group: 2, countInGroup: 1 }), JSON.stringify(result));
        if (!ok) allOk = false;

        result = RandomRhythm.groupInfo(5, [3, 2, 2]);
        ok = this.test("groupInfo 01B", JSON.stringify({ group: 2, countInGroup: 2 }), JSON.stringify(result));
        if (!ok) allOk = false;

        result = RandomRhythm.groupInfo(7, [3, 2, 2]);
        ok = this.test("groupInfo 01C", JSON.stringify({ group: 3, countInGroup: 2 }), JSON.stringify(result));
        if (!ok) allOk = false;

        result = RandomRhythm.groupInfo(1, [3, 2, 2]);
        ok = this.test("groupInfo 01D", JSON.stringify({ group: 1, countInGroup: 1 }), JSON.stringify(result));
        if (!ok) allOk = false;

        result = RandomRhythm.groupInfo(8, [2, 2, 2, 3]);
        ok = this.test("groupInfo 02A", JSON.stringify({ group: 4, countInGroup: 2 }), JSON.stringify(result));
        if (!ok) allOk = false;

        result = RandomRhythm.groupInfo(10, [2, 2, 2, 3]);
        ok = this.test("groupInfo 02B", JSON.stringify({ group: 0, countInGroup: 0 }), JSON.stringify(result));
        if (!ok) allOk = false;

        const arrayNames = [
            "oneDivision2", "twoDivisions2", "threeDivisions2", "fourDivisions2",
            "oneDivision3", "twoDivisions3", "threeDivisions3", "fourDivisions3"
        ];
        for (let i = 0; i < arrayNames.length; i++) {
            arr = null;
            arr = [];
            for (let j = 0; j < RandomRhythm[arrayNames[i]].length; j++) {
                arr.push(JSON.stringify(RandomRhythm[arrayNames[i]][j]));
            }
            msg = "";
            for (let j = 0; j < arr.length; j++) {
                if (arr.indexOf(arr[j]) !== arr.lastIndexOf(arr[j])) {
                    msg = `Duplicate at index ${j}`;
                }
            }
            ok = this.test(arrayNames[i], "", msg);
            if (!ok) allOk = false;
        }

        ok = this.test("Euclidean 1A", "10010010", Euclidean.pattern(8, 3, 0));
        if (!ok) allOk = false;

        ok = this.test("Euclidean 1B", "1001010010100", Euclidean.pattern(13, 5, 0));
        if (!ok) allOk = false;

        ok = this.test("Euclidean 1C", "101111111", Euclidean.pattern(9, 8, 0));
        if (!ok) allOk = false;

        ok = this.test("Euclidean 1D", "1010101", Euclidean.pattern(7, 4, 0));
        if (!ok) allOk = false;

        ok = this.test("Euclidean 1E", "101010100", Euclidean.pattern(9, 4, 0));
        if (!ok) allOk = false;

        ok = this.test("Euclidean 2A", "0000", Euclidean.pattern(4, 0, 0));
        if (!ok) allOk = false;

        ok = this.test("Euclidean 2B", "1111", Euclidean.pattern(4, 4, 0));
        if (!ok) allOk = false;

        ok = this.test("Euclidean 2C", "1111", Euclidean.pattern(4, 5, 0));
        if (!ok) allOk = false;

        ok = this.test("Euclidean 3A", "01001001", Euclidean.pattern(8, 3, 1));
        if (!ok) allOk = false;

        ok = this.test("Euclidean 3B", "01010010", Euclidean.pattern(8, 3, 3));
        if (!ok) allOk = false;

        ok = this.test("Euclidean 3C", "10010010", Euclidean.pattern(8, 3, 8));
        if (!ok) allOk = false;

        ok = this.test("Euclidean 3D", "00100101", Euclidean.pattern(8, 3, -1));
        if (!ok) allOk = false;

        ok = this.test("Euclidean 3E", "10010100", Euclidean.pattern(8, 3, -3));
        if (!ok) allOk = false;

        Measures.measures = JSON.parse(saveMeasures);
        if (allOk) {
            console.log("No problems");
        }
    }
}

export { Test };