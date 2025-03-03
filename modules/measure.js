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

    static multiplyDivisionsByTwo(measure) {
        for (const prop in measure) {
            if (Array.isArray(measure[prop])) {
                const oldArray = measure[prop].slice();
                measure[prop] = [];
                for (let i = 0; i < oldArray.length; i++) {
                    measure[prop].push(oldArray[i]);
                    measure[prop].push(0);
                }
            }
        }
        measure.divisions = measure.divisions * 2;
    }

    static divideDivisionsByTwo(measure) {
        for (const prop in measure) {
            if (Array.isArray(measure[prop])) {
                const oldArray = measure[prop].slice();
                measure[prop] = [];
                for (let i = 0; i < oldArray.length; i += 2) {
                    measure[prop].push(oldArray[i]);
                }
            }
        }
        measure.divisions = measure.divisions / 2;
    }

}

export { Measure };
