import { Glob } from "./glob.js";
import { Measure } from "./measure.js";

class Measures {
    static measures = [];

    static load(rhythm) {
        let measure1 = [];
        let measure2 = [];
        this.measures = [];
        Glob.currentMeasure = 0;
        switch (rhythm) {
            case "Disco1":
                Glob.settings.tempoSlider.value = 120;
                measure1 = new Measure();
                measure1.beats = 4;
                measure1.divisions = 2;
                measure1.openHiHat = [0, 1, 0, 1, 0, 1, 0, 1];
                measure1.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0];
                measure1.snareDrum = [0, 0, 1, 0, 0, 0, 1, 0];
                measure1.bassDrum = [1, 0, 1, 0, 1, 0, 1, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Metal1":
                Glob.settings.tempoSlider.value = 120;
                measure1 = new Measure();
                measure1.beats = 4;
                measure1.divisions = 6;
                measure1.openHiHat = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
                measure1.snareDrum = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
                measure1.bassDrum = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 4;
                measure2.divisions = 6;
                measure2.crashCymbal1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
                measure2.crashCymbal2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
                measure2.openHiHat = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
                measure2.snareDrum = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0];
                measure2.bassDrum = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                break;
            case "Rock1":
                Glob.settings.tempoSlider.value = 120;
                measure1 = new Measure();
                measure1.beats = 4;
                measure1.divisions = 2;
                measure1.closedHiHat = [1, 1, 1, 1, 1, 1, 1, 1];
                measure1.snareDrum = [0, 0, 1, 0, 0, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 0, 1, 1, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "SlowWaltz1":
                Glob.settings.tempoSlider.value = 90;
                measure1 = new Measure();
                measure1.beats = 3;
                measure1.divisions = 3;
                measure1.rideCymbal = [1, 0, 0, 1, 0, 2, 1, 0, 0];
                measure1.crossStick = [0, 0, 0, 0, 0, 0, 1, 0, 0];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 0, 0, 2];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Tsamikos1":
                Glob.settings.tempoSlider.value = 90;
                measure1 = new Measure();
                measure1.beats = 3;
                measure1.divisions = 4;
                measure1.rideCymbal = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
                measure1.snareDrum = [0, 0, 0, 2, 1, 0, 1, 0, 0, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Tsifteteli1":
                Glob.settings.tempoSlider.value = 120;
                measure1 = new Measure();
                measure1.beats = 4;
                measure1.divisions = 2;
                measure1.closedHiHat = [1, 1, 1, 1, 1, 1, 1, 1];
                measure1.snareDrum = [0, 1, 0, 1, 0, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 0, 1, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Tsifteteli2":
                Glob.settings.tempoSlider.value = 120;
                measure1 = new Measure();
                measure1.beats = 4;
                measure1.divisions = 4;
                measure1.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
                measure1.snareDrum = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0];
                measure1.bassDrum = [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 4;
                measure2.divisions = 4;
                measure2.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0];
                measure2.snareDrum = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 1, 0, 2, 2];
                measure2.bassDrum = [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                break;
            case "Zeibekiko1":
                Glob.settings.tempoSlider.value = 63;
                measure1 = new Measure();
                measure1.beats = 9;
                measure1.divisions = 2;
                measure1.closedHiHat = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
                measure1.snareDrum = [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0];
                measure1.bassDrum = [1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Zeibekiko2":
                Glob.settings.tempoSlider.value = 63;
                measure1 = new Measure();
                measure1.beats = 9;
                measure1.divisions = 4;
                measure1.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0];
                measure1.snareDrum = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 2];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 9;
                measure2.divisions = 4;
                measure2.openHiHat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
                measure2.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0];
                measure2.snareDrum = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
                measure2.bassDrum = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                break;
            default:
                break;
        }
    }

}

export { Measures };