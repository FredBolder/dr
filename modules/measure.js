class Measure {
    constructor() {
        this.beats = 0;
        this.divisions = 0;
        this.cowbell = [];
        this.crashCymbal1 = [];
        this.crashCymbal2 = [];
        this.chineseCymbal = [];
        this.splashCymbal = [];
        this.rideBell = [];
        this.rideCymbal = [];
        this.openHiHat = [];
        this.closedHiHat = [];
        this.highTom = [];
        this.midTom = [];
        this.lowTom = [];
        this.crossStick = [];
        this.snareDrum = [];
        this.bassDrum = [];
        this.pedalHiHat = [];
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
