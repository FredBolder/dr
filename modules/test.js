import { Glob } from "./glob.js";
import { Measure } from "./measure.js";
import { Measures } from "./measures.js";

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
        let ok = true;
        const saveMeasures = JSON.stringify(Measures.measures);
        let measure1 = [];
        let measure2 = [];
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

        Measures.measures = JSON.parse(saveMeasures);
        if (allOk) {
            console.log("No problems");
        }
    }
}

export { Test };