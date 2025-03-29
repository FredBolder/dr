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
        const only = ""; // Change this line if you want to execute only one test
        const saveMeasures = JSON.stringify(Measures.measures);
        let measure1 = [];
        let measure2 = [];
        let msg = "";
        let result;
        let testName = "";

        function executeTest(name) {
            if ((only === name) || (only === "")) {
                return name;
            } else {
                return "";
            }
        }

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

        if (only !== "") {
            console.log(`Testing ONLY: ${only}`);
        }


        // calculateMeasureAndColumn

        testName = executeTest("calculateMeasureAndColumn 01A");
        if (testName !== "") {
            result = Measures.calculateMeasureAndColumn(0, 15, [0, 1]);
            ok = this.test(testName, JSON.stringify({ measure: 0, column: 15 }), JSON.stringify(result));
            if (!ok) allOk = false;
        }

        testName = executeTest("calculateMeasureAndColumn 01B");
        if (testName !== "") {
            result = Measures.calculateMeasureAndColumn(1, 15, [1, 0]);
            ok = this.test(testName, JSON.stringify({ measure: 0, column: 15 }), JSON.stringify(result));
            if (!ok) allOk = false;
        }

        testName = executeTest("calculateMeasureAndColumn 01C");
        if (testName !== "") {
            result = Measures.calculateMeasureAndColumn(0, 16, [0, 1]);
            ok = this.test(testName, JSON.stringify({ measure: 1, column: 0 }), JSON.stringify(result));
            if (!ok) allOk = false;
        }

        testName = executeTest("calculateMeasureAndColumn 01D");
        if (testName !== "") {
            result = Measures.calculateMeasureAndColumn(1, 7, [0, 1]);
            ok = this.test(testName, JSON.stringify({ measure: 0, column: 1 }), JSON.stringify(result));
            if (!ok) allOk = false;
        }

        testName = executeTest("calculateMeasureAndColumn 01E");
        if (testName !== "") {
            result = Measures.calculateMeasureAndColumn(0, 8, [1, 0]);
            ok = this.test(testName, JSON.stringify({ measure: 0, column: 2 }), JSON.stringify(result));
            if (!ok) allOk = false;
        }

        // getStringFromCommaDelimited

        testName = executeTest("getStringFromCommaDelimited 01A");
        if (testName !== "") {
            result = Glob.getStringFromCommaDelimited("Test 1, Test 2", 1);
            ok = this.test(testName, "Test 2", result);
            if (!ok) allOk = false;
        }

        testName = executeTest("getStringFromCommaDelimited 01B");
        if (testName !== "") {
            result = Glob.getStringFromCommaDelimited("ABCD, abcd", 0);
            ok = this.test(testName, "ABCD", result);
            if (!ok) allOk = false;
        }

        testName = executeTest("getStringFromCommaDelimited 01C");
        if (testName !== "") {
            result = Glob.getStringFromCommaDelimited("A,B,C,D,E", 3);
            ok = this.test(testName, "D", result);
            if (!ok) allOk = false;
        }

        testName = executeTest("getStringFromCommaDelimited 01D");
        if (testName !== "") {
            result = Glob.getStringFromCommaDelimited("test", 0);
            ok = this.test(testName, "test", result);
            if (!ok) allOk = false;
        }

        testName = executeTest("getStringFromCommaDelimited 02A");
        if (testName !== "") {
            result = Glob.getStringFromCommaDelimited("One, Two, Three", 3);
            ok = this.test(testName, "", result);
            if (!ok) allOk = false;
        }

        testName = executeTest("getStringFromCommaDelimited 02B");
        if (testName !== "") {
            result = Glob.getStringFromCommaDelimited("One, Two, Three", -1);
            ok = this.test(testName, "", result);
            if (!ok) allOk = false;
        }

        // randomInt

        for (let i = 0; i < 50; i++) {
            testName = executeTest("randomInt (0,5)");
            if (testName !== "") {
                error = false;
                result = Glob.randomInt(0, 5);
                if ((result < 0) || (result > 5)) {
                    console.log(`Result from randomInt(0, 5): ${result}`);
                    error = true;
                }
                ok = this.test(testName, false, error);
                if (!ok) allOk = false;
            }
        }

        for (let i = 0; i < 50; i++) {
            testName = executeTest("randomInt(-10, 10)");
            if (testName !== "") {
                error = false;
                result = Glob.randomInt(-10, 10);
                if ((result < -10) || (result > 10)) {
                    console.log(`Result from randomInt(-10, 10): ${result}`);
                    error = true;
                }
                ok = this.test(testName, false, error);
                if (!ok) allOk = false;
            }
        }

        // groupInfo

        testName = executeTest("groupInfo 01A");
        if (testName !== "") {
            result = RandomRhythm.groupInfo(4, [3, 2, 2]);
            ok = this.test(testName, JSON.stringify({ group: 2, countInGroup: 1 }), JSON.stringify(result));
            if (!ok) allOk = false;
        }

        testName = executeTest("groupInfo 01B");
        if (testName !== "") {
            result = RandomRhythm.groupInfo(5, [3, 2, 2]);
            ok = this.test(testName, JSON.stringify({ group: 2, countInGroup: 2 }), JSON.stringify(result));
            if (!ok) allOk = false;
        }

        testName = executeTest("groupInfo 01C");
        if (testName !== "") {
            result = RandomRhythm.groupInfo(7, [3, 2, 2]);
            ok = this.test(testName, JSON.stringify({ group: 3, countInGroup: 2 }), JSON.stringify(result));
            if (!ok) allOk = false;
        }

        testName = executeTest("groupInfo 01D");
        if (testName !== "") {
            result = RandomRhythm.groupInfo(1, [3, 2, 2]);
            ok = this.test(testName, JSON.stringify({ group: 1, countInGroup: 1 }), JSON.stringify(result));
            if (!ok) allOk = false;
        }

        testName = executeTest("groupInfo 02A");
        if (testName !== "") {
            result = RandomRhythm.groupInfo(8, [2, 2, 2, 3]);
            ok = this.test(testName, JSON.stringify({ group: 4, countInGroup: 2 }), JSON.stringify(result));
            if (!ok) allOk = false;
        }

        testName = executeTest("groupInfo 02B");
        if (testName !== "") {
            result = RandomRhythm.groupInfo(10, [2, 2, 2, 3]);
            ok = this.test(testName, JSON.stringify({ group: 0, countInGroup: 0 }), JSON.stringify(result));
            if (!ok) allOk = false;
        }

        // Random rhythm

        const arrayNames = [
            "oneDivision2", "twoDivisions2", "threeDivisions2", "fourDivisions2",
            "oneDivision3", "twoDivisions3", "threeDivisions3", "fourDivisions3"
        ];
        for (let i = 0; i < arrayNames.length; i++) {
            testName = executeTest(arrayNames[i]);
            if (testName !== "") {
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
                ok = this.test(testName, "", msg);
                if (!ok) allOk = false;
            }
        }

        // Euclidean

        testName = executeTest("Euclidean 1A");
        if (testName !== "") {
            ok = this.test(testName, "10010010", Euclidean.pattern(8, 3, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 1B");
        if (testName !== "") {
            ok = this.test(testName, "1001010010100", Euclidean.pattern(13, 5, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 1C");
        if (testName !== "") {
            ok = this.test(testName, "101111111", Euclidean.pattern(9, 8, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 1D");
        if (testName !== "") {
            ok = this.test(testName, "1010101", Euclidean.pattern(7, 4, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 1E");
        if (testName !== "") {
            ok = this.test(testName, "101010100", Euclidean.pattern(9, 4, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 1F");
        if (testName !== "") {
            ok = this.test(testName, "1010100", Euclidean.pattern(7, 3, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 1G");
        if (testName !== "") {
            ok = this.test(testName, "1010", Euclidean.pattern(4, 2, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 2A");
        if (testName !== "") {
            ok = this.test(testName, "0000", Euclidean.pattern(4, 0, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 2B");
        if (testName !== "") {
            ok = this.test(testName, "1111", Euclidean.pattern(4, 4, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 2C");
        if (testName !== "") {
            ok = this.test(testName, "1111", Euclidean.pattern(4, 5, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 3A");
        if (testName !== "") {
            ok = this.test(testName, "01000100", Euclidean.pattern(8, 2, 1));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 3B");
        if (testName !== "") {
            ok = this.test(testName, "00010001", Euclidean.pattern(8, 2, 3));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 3C");
        if (testName !== "") {
            ok = this.test(testName, "10001000", Euclidean.pattern(8, 2, 8));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 3D");
        if (testName !== "") {
            ok = this.test(testName, "00010001", Euclidean.pattern(8, 2, -1));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 3E");
        if (testName !== "") {
            ok = this.test(testName, "01000100", Euclidean.pattern(8, 2, -3));
            if (!ok) allOk = false;
        }

        // Examples from official pdf

        testName = executeTest("Euclidean 4A");
        if (testName !== "") {
            ok = this.test(testName, "1001010010100", Euclidean.pattern(13, 5, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 4B");
        if (testName !== "") {
            ok = this.test(testName, "10010010", Euclidean.pattern(8, 3, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 4C");
        if (testName !== "") {
            ok = this.test(testName, "10110110", Euclidean.pattern(8, 5, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 4D");
        if (testName !== "") {
            ok = this.test(testName, "10", Euclidean.pattern(2, 1, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 4E");
        if (testName !== "") {
            ok = this.test(testName, "100100100100", Euclidean.pattern(12, 4, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 4F");
        if (testName !== "") {
            ok = this.test(testName, "101", Euclidean.pattern(3, 2, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 4G");
        if (testName !== "") {
            ok = this.test(testName, "10100", Euclidean.pattern(5, 2, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 4H");
        if (testName !== "") {
            ok = this.test(testName, "1011", Euclidean.pattern(4, 3, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 4I");
        if (testName !== "") {
            ok = this.test(testName, "10101", Euclidean.pattern(5, 3, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 4J");
        if (testName !== "") {
            ok = this.test(testName, "1010100", Euclidean.pattern(7, 3, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 4K");
        if (testName !== "") {
            ok = this.test(testName, "1010101", Euclidean.pattern(7, 4, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 4L");
        if (testName !== "") {
            ok = this.test(testName, "101010100", Euclidean.pattern(9, 4, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 4M");
        if (testName !== "") {
            ok = this.test(testName, "10010010010", Euclidean.pattern(11, 4, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 4N");
        if (testName !== "") {
            ok = this.test(testName, "101111", Euclidean.pattern(6, 5, 0));
            if (!ok) allOk = false;
        }

        testName = executeTest("Euclidean 4O");
        if (testName !== "") {
            ok = this.test(testName, "100101010101001010101010", Euclidean.pattern(24, 11, 0));
            if (!ok) allOk = false;
        }

        // tryParseInt

        testName = executeTest("tryParseInt 1A");
        if (testName !== "") {
            ok = this.test(testName, 123, Glob.tryParseInt("123", 5));
            if (!ok) allOk = false;
        }
       
        testName = executeTest("tryParseInt 1B");
        if (testName !== "") {
            ok = this.test(testName, -35, Glob.tryParseInt("-35", 5));
            if (!ok) allOk = false;
        }

        testName = executeTest("tryParseInt 1C");
        if (testName !== "") {
            ok = this.test(testName, 3, Glob.tryParseInt("3.14", 5));
            if (!ok) allOk = false;
        }

        testName = executeTest("tryParseInt 2A");
        if (testName !== "") {
            ok = this.test(testName, 5, Glob.tryParseInt(null, 5));
            if (!ok) allOk = false;
        }

        testName = executeTest("tryParseInt 2B");
        if (testName !== "") {
            ok = this.test(testName, 5, Glob.tryParseInt("ABC", 5));
            if (!ok) allOk = false;
        }

        testName = executeTest("tryParseInt 2C");
        if (testName !== "") {
            ok = this.test(testName, 5, Glob.tryParseInt("", 5));
            if (!ok) allOk = false;
        }

        testName = executeTest("tryParseInt 2D");
        if (testName !== "") {
            ok = this.test(testName, 5, Glob.tryParseInt("  ", 5));
            if (!ok) allOk = false;
        }

        Measures.measures = JSON.parse(saveMeasures);
        if (allOk) {
            console.log("No problems");
        }
    }
}

export { Test };
