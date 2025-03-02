import { Instruments } from "./instruments.js";

class Measure {
    constructor() {
        this.beats = 0;
        this.divisions = 0;
        this.endsWithFill = false;
        for (let i = 0; i < Instruments.instruments.length; i++) {
            const prop = Instruments.instruments[i].property;
            this[prop] = [];
        }
    }

    static fixMeasure(measure) {
        const columns = measure.beats * measure.divisions;

        for (const prop in measure) {
            if (Array.isArray(measure[prop])) {
                while (measure[prop].length < columns) {
                    measure[prop].push(0);
                }
                while (measure[prop].length > columns) {
                    measure[prop].pop();
                }
            }
        }
    }
}

export { Measure };
