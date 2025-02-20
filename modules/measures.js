import { Glob } from "./glob.js";
import { Measure } from "./measure.js";

class Measures {
    static measures = [];

    static load(rhythm) {
        let measure1 = [];
        let measure2 = [];
        let measure3 = [];
        let measure4 = [];
        let measure5 = [];
        let measure6 = [];
        let measure7 = [];
        let measure8 = [];
        this.measures = [];
        Glob.currentMeasure = 0;
        Glob.settings.instrumentSet = 0;
        Glob.settings.measuresToPlay = "";
        switch (rhythm) {
            case "Disco1":
                Glob.settings.tempoSlider.value = 130;
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
            case "Disco2":
                Glob.settings.tempoSlider.value = 130;
                measure1 = new Measure();
                measure1.beats = 4;
                measure1.divisions = 4;
                measure1.closedHiHat = [1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1];
                measure1.snareDrum = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
                measure1.bassDrum = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
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
            case "Metal2":
                Glob.settings.tempoSlider.value = 130;
                measure1 = new Measure();
                measure1.beats = 4;
                measure1.divisions = 4;
                measure1.rideCymbal = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
                measure1.snareDrum = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
                measure1.bassDrum = [1, 1, 1, 1, 0, 0, 10, 0, 0, 0, 1, 1, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
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
            case "Rock2":
                Glob.settings.tempoSlider.value = 120;
                measure1 = new Measure();
                measure1.beats = 4;
                measure1.divisions = 2;
                measure1.crashCymbal1 = [12, 0, 0, 0, 0, 0, 0, 0];
                measure1.closedHiHat = [13, 1, 1, 1, 1, 1, 1, 1];
                measure1.snareDrum = [0, 0, 1, 0, 0, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 1, 1, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 4;
                measure2.divisions = 2;
                measure2.openHiHat = [0, 0, 0, 0, 0, 0, 0, 1];
                measure2.closedHiHat = [1, 1, 1, 1, 1, 1, 1, 0];
                measure2.snareDrum = [0, 0, 1, 0, 0, 0, 1, 0];
                measure2.bassDrum = [1, 0, 0, 1, 1, 0, 0, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                measure3 = new Measure();
                measure3.beats = 4;
                measure3.divisions = 2;
                measure3.closedHiHat = [1, 1, 1, 1, 1, 1, 1, 1];
                measure3.snareDrum = [0, 0, 1, 0, 0, 0, 1, 0];
                measure3.bassDrum = [1, 0, 0, 1, 1, 0, 0, 0];
                Measure.fixMeasure(measure3);
                this.measures.push(measure3);
                measure4 = new Measure();
                measure4.beats = 4;
                measure4.divisions = 4;
                measure4.endsWithFill = true;
                measure4.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                measure4.midTom = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0];
                measure4.lowTom = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
                measure4.snareDrum = [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0];
                measure4.bassDrum = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure4);
                this.measures.push(measure4);
                break;
            case "Rockballad1":
                Glob.settings.measuresToPlay = "1, 1, 1, 2";
                Glob.settings.tempoSlider.value = 70;
                measure1 = new Measure();
                measure1.beats = 4;
                measure1.divisions = 4;
                measure1.splashCymbal = [12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                measure1.closedHiHat = [13, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
                measure1.snareDrum = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 10, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 4;
                measure2.divisions = 4;
                measure2.endsWithFill = true;
                measure2.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0];
                measure2.highTom = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
                measure2.midTom = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
                measure2.snareDrum = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0];
                measure2.bassDrum = [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                break;
            case "ChaChaCha1":
                Glob.settings.tempoSlider.value = 120;
                measure1 = new Measure();
                measure1.beats = 4;
                measure1.divisions = 2;
                measure1.cowbell = [1, 0, 1, 0, 1, 0, 1, 0];
                measure1.highTom = [0, 0, 0, 0, 0, 0, 1, 1];
                measure1.crossStick = [0, 0, 1, 0, 0, 0, 0, 0];
                measure1.bassDrum = [1, 0, 0, 1, 1, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Jive1":
                Glob.settings.tempoSlider.value = 176;
                measure1 = new Measure();
                measure1.beats = 4;
                measure1.divisions = 3;
                measure1.closedHiHat = [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1];
                measure1.snareDrum = [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Merengue1":
                Glob.settings.tempoSlider.value = 130;
                measure1 = new Measure();
                measure1.beats = 2;
                measure1.divisions = 4;
                measure1.closedHiHat = [1, 0, 0, 0, 1, 0, 0, 0];
                measure1.highTom = [0, 0, 0, 0, 0, 0, 1, 0];
                measure1.snareDrum = [0, 0, 0, 1, 0, 0, 0, 0];
                measure1.bassDrum = [1, 0, 0, 0, 1, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 2;
                measure2.divisions = 4;
                measure2.closedHiHat = [1, 0, 0, 0, 0, 0, 0, 0];
                measure2.highTom = [0, 0, 0, 0, 1, 1, 1, 1];
                measure2.snareDrum = [0, 0, 1, 0, 0, 0, 0, 0];
                measure2.bassDrum = [1, 0, 0, 0, 1, 0, 0, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                break;
            case "Pasodoble1":
                Glob.settings.tempoSlider.value = 124;
                measure1 = new Measure();
                measure1.beats = 2;
                measure1.divisions = 4;
                measure1.snareDrum = [1, 0, 1, 1, 1, 0, 1, 1];
                measure1.bassDrum = [1, 0, 0, 0, 1, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 2;
                measure2.divisions = 4;
                measure2.snareDrum = [1, 0, 1, 1, 1, 0, 1, 0];
                measure2.bassDrum = [1, 0, 0, 0, 1, 0, 1, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                break;
            case "Pasodoble2":
                Glob.settings.tempoSlider.value = 124;
                measure1 = new Measure();
                measure1.beats = 2;
                measure1.divisions = 4;
                measure1.closedHiHat = [1, 0, 0, 0, 1, 0, 0, 0];
                measure1.snareDrum = [0, 0, 1, 0, 0, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 0, 1, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 2;
                measure2.divisions = 4;
                measure2.closedHiHat = [1, 0, 0, 0, 1, 0, 0, 0];
                measure2.snareDrum = [0, 0, 1, 1, 0, 0, 1, 0];
                measure2.bassDrum = [1, 0, 0, 0, 1, 0, 1, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                break;
            case "Quickstep1":
                Glob.settings.tempoSlider.value = 208;
                measure1 = new Measure();
                measure1.beats = 4;
                measure1.divisions = 3;
                measure1.rideCymbal = [1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1];
                measure1.snareDrum = [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
                measure1.pedalHiHat = [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Rumba1":
                Glob.settings.tempoSlider.value = 100;
                measure1 = new Measure();
                measure1.beats = 4;
                measure1.divisions = 4;
                measure1.closedHiHat = [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
                measure1.highTom = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0];
                measure1.snareDrum = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Samba1":
                Glob.settings.tempoSlider.value = 100;
                measure1 = new Measure();
                measure1.beats = 2;
                measure1.divisions = 4;
                measure1.rideCymbal = [1, 0, 1, 1, 1, 0, 1, 1];
                measure1.highTom = [0, 0, 0, 0, 0, 0, 0, 1];
                measure1.midTom = [1, 0, 0, 0, 0, 0, 0, 0];
                measure1.lowTom = [0, 0, 0, 0, 0, 1, 0, 0];
                measure1.snareDrum = [0, 0, 1, 0, 0, 0, 0, 0];
                measure1.bassDrum = [1, 0, 0, 1, 1, 0, 0, 1];
                measure1.pedalHiHat = [0, 0, 1, 0, 0, 0, 1, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 2;
                measure2.divisions = 4;
                measure2.rideCymbal = [1, 0, 1, 1, 1, 0, 1, 1];
                measure2.highTom = [0, 0, 0, 0, 0, 0, 0, 0];
                measure2.midTom = [0, 0, 0, 0, 0, 0, 0, 0];
                measure2.lowTom = [0, 0, 0, 0, 1, 0, 1, 0];
                measure2.snareDrum = [0, 1, 0, 0, 0, 0, 0, 0];
                measure2.bassDrum = [1, 0, 0, 1, 1, 0, 0, 1];
                measure2.pedalHiHat = [0, 0, 1, 0, 0, 0, 1, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                break;
            case "Samba2":
                Glob.settings.tempoSlider.value = 100;
                measure1 = new Measure();
                measure1.beats = 2;
                measure1.divisions = 4;
                measure1.highTom = [1, 0, 0, 0, 0, 0, 0, 0];
                measure1.lowTom = [0, 0, 0, 0, 1, 0, 1, 0];
                measure1.snareDrum = [1, 4, 4, 1, 4, 4, 1, 4];
                measure1.bassDrum = [1, 0, 0, 1, 1, 0, 0, 1];
                measure1.pedalHiHat = [0, 0, 1, 0, 0, 0, 1, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 2;
                measure2.divisions = 4;
                measure2.highTom = [1, 0, 0, 0, 0, 0, 0, 0];
                measure2.lowTom = [0, 0, 0, 0, 1, 1, 0, 1];
                measure2.snareDrum = [4, 4, 1, 4, 4, 1, 4, 4];
                measure2.bassDrum = [1, 0, 0, 1, 1, 0, 0, 1];
                measure2.pedalHiHat = [0, 0, 1, 0, 0, 0, 1, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                break;
            case "Slowwaltz1":
                Glob.settings.tempoSlider.value = 90;
                measure1 = new Measure();
                measure1.beats = 3;
                measure1.divisions = 3;
                measure1.rideCymbal = [1, 0, 0, 1, 0, 2, 1, 0, 0];
                measure1.crossStick = [0, 0, 0, 0, 0, 0, 1, 0, 0];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 0, 0, 11];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Slowfox1":
                Glob.settings.tempoSlider.value = 120;
                measure1 = new Measure();
                measure1.beats = 4;
                measure1.divisions = 3;
                measure1.rideCymbal = [1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1];
                measure1.crossStick = [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
                measure1.pedalHiHat = [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Tango1":
                Glob.settings.tempoSlider.value = 132;
                measure1 = new Measure();
                measure1.beats = 4;
                measure1.divisions = 2;
                measure1.openHiHat = [0, 0, 0, 0, 0, 0, 0, 1];
                measure1.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0];
                measure1.snareDrum = [1, 0, 1, 0, 1, 0, 1, 1];
                measure1.bassDrum = [1, 0, 1, 0, 1, 0, 1, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Tango2":
                Glob.settings.tempoSlider.value = 132;
                measure1 = new Measure();
                measure1.beats = 4;
                measure1.divisions = 8;
                measure1.snareDrum = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
                measure1.pedalHiHat = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Viennesewaltz1":
                Glob.settings.tempoSlider.value = 180;
                measure1 = new Measure();
                measure1.beats = 3;
                measure1.divisions = 2;
                measure1.rideCymbal = [1, 0, 0, 0, 0, 0];
                measure1.snareDrum = [0, 0, 1, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 3;
                measure2.divisions = 2;
                measure2.rideCymbal = [1, 0, 0, 0, 0, 0];
                measure2.snareDrum = [0, 2, 1, 0, 1, 0];
                measure2.bassDrum = [1, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                break;
            case "Zouk1":
                Glob.settings.tempoSlider.value = 90;
                measure1 = new Measure();
                measure1.beats = 2;
                measure1.divisions = 4;
                measure1.openHiHat = [0, 0, 0, 0, 0, 0, 10, 0];
                measure1.closedHiHat = [1, 0, 1, 1, 0, 1, 11, 0];
                measure1.crossStick = [1, 0, 0, 1, 0, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 0, 1, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Aptaliko1":
                Glob.settings.tempoSlider.value = 63;
                measure1 = new Measure();
                measure1.beats = 9;
                measure1.divisions = 2;
                measure1.closedHiHat = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
                measure1.snareDrum = [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Dipat1":
                Glob.settings.tempoSlider.value = 216;
                measure1 = new Measure();
                measure1.beats = 9;
                measure1.divisions = 2;
                measure1.closedHiHat = [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
                measure1.snareDrum = [0, 0, 10, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 2, 1, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Hasapiko1":
                Glob.settings.measuresToPlay = "1, 1, 1, 2";
                Glob.settings.tempoSlider.value = 116;
                measure1 = new Measure();
                measure1.beats = 4;
                measure1.divisions = 3;
                measure1.closedHiHat = [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0];
                measure1.snareDrum = [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 11];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 4;
                measure2.divisions = 3;
                measure2.closedHiHat = [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0];
                measure2.snareDrum = [0, 0, 0, 1, 0, 0, 0, 0, 2, 1, 0, 0];
                measure2.bassDrum = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                break;
            case "Hasaposerviko1":
                Glob.settings.measuresToPlay = "1, 1, 1, 2";
                Glob.settings.tempoSlider.value = 132;
                measure1 = new Measure();
                measure1.beats = 2;
                measure1.divisions = 2;
                measure1.closedHiHat = [1, 1, 1, 1];
                measure1.snareDrum = [0, 1, 0, 1];
                measure1.bassDrum = [1, 0, 1, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 2;
                measure2.divisions = 4;
                measure2.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0];
                measure2.snareDrum = [0, 0, 1, 1, 0, 0, 1, 0];
                measure2.bassDrum = [1, 0, 0, 0, 1, 0, 0, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                break;
            case "Kalamatianos1":
                Glob.settings.measuresToPlay = "1, 1, 1, 2";
                Glob.settings.tempoSlider.value = 240;
                measure1 = new Measure();
                measure1.beats = 7;
                measure1.divisions = 2;
                measure1.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
                measure1.snareDrum = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0];
                measure1.bassDrum = [1, 0, 10, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 7;
                measure2.divisions = 2;
                measure2.openHiHat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
                measure2.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0];
                measure2.snareDrum = [0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 1, 0, 0, 0];
                measure2.bassDrum = [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                break;
            case "Kalamatianos2":
                Glob.settings.measuresToPlay = "1, 1, 1, 2";
                Glob.settings.tempoSlider.value = 240;
                measure1 = new Measure();
                measure1.beats = 7;
                measure1.divisions = 2;
                measure1.lowTom = [1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 10];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Kalamatianos3":
                Glob.settings.measuresToPlay = "1, 1, 1, 2";
                Glob.settings.tempoSlider.value = 240;
                measure1 = new Measure();
                measure1.beats = 7;
                measure1.divisions = 2;
                measure1.rideCymbal = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
                measure1.snareDrum = [0, 0, 2, 2, 1, 0, 0, 0, 0, 2, 1, 0, 1, 10];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Kamilierikos1":
                Glob.settings.tempoSlider.value = 126;
                measure1 = new Measure();
                measure1.beats = 9;
                measure1.divisions = 2;
                measure1.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
                measure1.snareDrum = [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Kamilierikos2":
                Glob.settings.tempoSlider.value = 126;
                measure1 = new Measure();
                measure1.beats = 9;
                measure1.divisions = 2;
                measure1.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 11, 0, 11, 0];
                measure1.midTom = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0];
                measure1.snareDrum = [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 10, 11, 0];
                measure1.bassDrum = [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Karsilamas1":
                Glob.settings.tempoSlider.value = 243;
                measure1 = new Measure();
                measure1.beats = 9;
                measure1.divisions = 1;
                measure1.closedHiHat = [1, 1, 1, 1, 1, 1, 1, 1, 1];
                measure1.snareDrum = [0, 1, 0, 1, 0, 1, 0, 1, 1];
                measure1.bassDrum = [1, 0, 1, 0, 1, 0, 1, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Karsilamas2":
                Glob.settings.tempoSlider.value = 243;
                measure1 = new Measure();
                measure1.beats = 9;
                measure1.divisions = 1;
                measure1.closedHiHat = [1, 1, 1, 1, 1, 1, 1, 1, 1];
                measure1.snareDrum = [0, 0, 1, 0, 0, 0, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 0, 1, 0, 1, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "PalioZeibekiko1":
                Glob.settings.tempoSlider.value = 63;
                measure1 = new Measure();
                measure1.beats = 9;
                measure1.divisions = 2;
                measure1.closedHiHat = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
                measure1.snareDrum = [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Roumba1":
                Glob.settings.tempoSlider.value = 100;
                measure1 = new Measure();
                measure1.beats = 2;
                measure1.divisions = 4;
                measure1.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0];
                measure1.snareDrum = [0, 0, 0, 1, 0, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 0, 1, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Syrtos1":
                Glob.settings.measuresToPlay = "1, 1, 1, 2";
                Glob.settings.tempoSlider.value = 90;
                measure1 = new Measure();
                measure1.beats = 2;
                measure1.divisions = 4;
                measure1.lowTom = [1, 0, 0, 0, 0, 0, 0, 0];
                measure1.snareDrum = [0, 0, 0, 1, 0, 2, 1, 0];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 2;
                measure2.divisions = 4;
                measure2.lowTom = [1, 0, 0, 0, 0, 0, 0, 0];
                measure2.snareDrum = [0, 0, 2, 1, 0, 2, 1, 0];
                measure2.bassDrum = [1, 0, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                break;
            case "Syrtos2":
                Glob.settings.instrumentSet = 1;
                Glob.settings.measuresToPlay = "1, 1, 1, 2";
                Glob.settings.tempoSlider.value = 90;
                measure1 = new Measure();
                measure1.beats = 2;
                measure1.divisions = 4;
                measure1.touberlekiKa = [0, 0, 0, 0, 0, 2, 0, 0];
                measure1.touberlekiTek = [0, 0, 0, 1, 0, 0, 1, 0];
                measure1.touberlekiDoum = [1, 0, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 2;
                measure2.divisions = 4;
                measure2.touberlekiKa = [0, 0, 2, 0, 0, 2, 0, 0];
                measure2.touberlekiTek = [0, 0, 0, 1, 0, 0, 1, 0];
                measure2.touberlekiDoum = [1, 0, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                break;
            case "Tik1":
                Glob.settings.tempoSlider.value = 250;
                measure1 = new Measure();
                measure1.beats = 5;
                measure1.divisions = 2;
                measure1.closedHiHat = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                measure1.lowTom = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0];
                measure1.snareDrum = [0, 0, 0, 10, 1, 0, 0, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Tiktromachton1":
                Glob.settings.tempoSlider.value = 511;
                measure1 = new Measure();
                measure1.beats = 7;
                measure1.divisions = 1;
                measure1.closedHiHat = [1, 0, 0, 0, 0, 0, 0];
                measure1.snareDrum = [0, 0, 1, 1, 1, 1, 1];
                measure1.bassDrum = [1, 0, 0, 0, 1, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Tiktromachton2":
                Glob.settings.measuresToPlay = "1, 1, 1, 2";
                Glob.settings.tempoSlider.value = 511;
                measure1 = new Measure();
                measure1.beats = 7;
                measure1.divisions = 1;
                measure1.splashCymbal = [12, 0, 0, 0, 0, 0, 0];
                measure1.closedHiHat = [13, 0, 0, 0, 1, 0, 0];
                measure1.snareDrum = [0, 0, 1, 0, 0, 0, 1];
                measure1.bassDrum = [1, 0, 0, 0, 1, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 7;
                measure2.divisions = 1;
                measure2.endsWithFill = true;
                measure2.closedHiHat = [1, 0, 1, 0, 1, 0, 0];
                measure2.snareDrum = [0, 0, 0, 0, 0, 0, 1];
                measure2.bassDrum = [1, 0, 1, 0, 1, 0, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                break;
            case "Tsakonikos1":
                Glob.settings.tempoSlider.value = 100;
                measure1 = new Measure();
                measure1.beats = 5;
                measure1.divisions = 4;
                measure1.lowTom = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
                measure1.snareDrum = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 2, 1, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Tsakonikos2":
                Glob.settings.tempoSlider.value = 100;
                measure1 = new Measure();
                measure1.beats = 5;
                measure1.divisions = 4;
                measure1.closedHiHat = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                measure1.lowTom = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
                measure1.snareDrum = [0, 0, 0, 2, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 2, 1, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Tsamikos1":
                Glob.settings.tempoSlider.value = 90;
                measure1 = new Measure();
                measure1.beats = 3;
                measure1.divisions = 4;
                measure1.rideCymbal = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
                measure1.snareDrum = [0, 0, 0, 2, 1, 0, 1, 0, 0, 0, 1, 10];
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
                measure1.lowTom = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
                measure1.snareDrum = [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0];
                measure1.bassDrum = [1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Zeibekiko2":
                Glob.settings.tempoSlider.value = 63;
                measure1 = new Measure();
                measure1.beats = 9;
                measure1.divisions = 4;
                measure1.openHiHat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
                measure1.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0];
                measure1.snareDrum = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 9;
                measure2.divisions = 4;
                measure2.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0];
                measure2.snareDrum = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 0, 1];
                measure2.bassDrum = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                break;
            case "RandomZeibekiko":
                Glob.settings.tempoSlider.value = 63;
                measure1 = new Measure();
                measure1.beats = 9;
                measure1.divisions = 4;
                measure1.closedHiHat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
                measure1.snareDrum = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 8, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 7, 7];
                measure1.bassDrum = [1, 0, 1, 0, 0, 0, 0, 0, 1, 7, 0, 7, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 7, 0, 7, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                break;
            case "Zonaradiko1":
                Glob.settings.tempoSlider.value = 420;
                measure1 = new Measure();
                measure1.beats = 6;
                measure1.divisions = 1;
                measure1.crashCymbal1 = [1, 0, 0, 0, 0, 0];
                measure1.highTom = [0, 0, 0, 1, 0, 1];
                measure1.lowTom = [0, 0, 1, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
                measure2 = new Measure();
                measure2.beats = 6;
                measure2.divisions = 1;
                measure2.highTom = [0, 0, 0, 1, 0, 0];
                measure2.midTom = [0, 0, 0, 0, 0, 1];
                measure2.lowTom = [1, 0, 1, 0, 1, 0];
                measure2.bassDrum = [1, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure2);
                this.measures.push(measure2);
                measure3 = new Measure();
                measure3.beats = 6;
                measure3.divisions = 1;
                measure3.highTom = [0, 0, 0, 1, 0, 1];
                measure3.lowTom = [1, 0, 1, 0, 1, 0];
                measure3.bassDrum = [1, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure3);
                this.measures.push(measure3);
                measure4 = new Measure();
                measure4.beats = 6;
                measure4.divisions = 1;
                measure4.highTom = [0, 1, 1, 1, 0, 0];
                measure4.midTom = [0, 0, 0, 0, 1, 1];
                measure4.lowTom = [1, 0, 0, 0, 0, 0];
                measure4.bassDrum = [1, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure4);
                this.measures.push(measure4);
                measure5 = new Measure();
                measure5.beats = 6;
                measure5.divisions = 1;
                measure5.crashCymbal1 = [1, 0, 0, 0, 0, 0];
                measure5.highTom = [0, 0, 0, 1, 0, 1];
                measure5.lowTom = [0, 0, 1, 0, 1, 0];
                measure5.bassDrum = [1, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure5);
                this.measures.push(measure5);
                measure6 = new Measure();
                measure6.beats = 6;
                measure6.divisions = 1;
                measure6.highTom = [0, 0, 0, 1, 0, 0];
                measure6.midTom = [0, 0, 0, 0, 0, 1];
                measure6.lowTom = [1, 0, 1, 0, 1, 0];
                measure6.bassDrum = [1, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure6);
                this.measures.push(measure6);
                measure7 = new Measure();
                measure7.beats = 6;
                measure7.divisions = 1;
                measure7.highTom = [0, 0, 0, 1, 0, 1];
                measure7.lowTom = [1, 0, 1, 0, 1, 0];
                measure7.bassDrum = [1, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure7);
                this.measures.push(measure7);
                measure8 = new Measure();
                measure8.beats = 6;
                measure8.divisions = 1;
                measure8.highTom = [0, 0, 6, 0, 0, 0];
                measure8.midTom = [0, 0, 0, 0, 6, 0];
                measure8.lowTom = [1, 0, 0, 0, 0, 0];
                measure8.bassDrum = [1, 0, 0, 0, 0, 0];
                Measure.fixMeasure(measure8);
                this.measures.push(measure8);
                break;
            default:
                break;
        }
    }

    static addMissingProps() {
        let measureWithAllProps = [];
        measureWithAllProps = new Measure();
        for (let i = 0; i < this.measures.length; i++) {
            const measure = this.measures[i];
            for (const prop in measureWithAllProps) {
                if (Array.isArray(measureWithAllProps[prop])) {
                    if (!measure.hasOwnProperty(prop)) {
                        measure[prop] = [];
                        const columns = measure.beats * measure.divisions;
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
    }

    static copyMeasure(from, to) {
        if ((from >= 1) && (to >= 1) && (from !== to) && (from <= Measures.measures.length) && (to <= Measures.measures.length)) {
            this.measures[to - 1].beats = this.measures[from - 1].beats;
            this.measures[to - 1].divisions = this.measures[from - 1].divisions;
            this.measures[to - 1].endsWithFill = this.measures[from - 1].endsWithFill;
            Measure.fixMeasure(this.measures[to - 1]);
            for (let i = 0; i < this.measures[from - 1].bassDrum.length; i++) {
                switch (Glob.settings.instrumentSet) {
                    case 0:
                        // Drums
                        this.measures[to - 1].cowbell[i] = this.measures[from - 1].cowbell[i];
                        this.measures[to - 1].crashCymbal1[i] = this.measures[from - 1].crashCymbal1[i];
                        this.measures[to - 1].crashCymbal2[i] = this.measures[from - 1].crashCymbal2[i];
                        this.measures[to - 1].chineseCymbal[i] = this.measures[from - 1].chineseCymbal[i];
                        this.measures[to - 1].splashCymbal[i] = this.measures[from - 1].splashCymbal[i];
                        this.measures[to - 1].rideBell[i] = this.measures[from - 1].rideBell[i];
                        this.measures[to - 1].rideCymbal[i] = this.measures[from - 1].rideCymbal[i];
                        this.measures[to - 1].openHiHat[i] = this.measures[from - 1].openHiHat[i];
                        this.measures[to - 1].closedHiHat[i] = this.measures[from - 1].closedHiHat[i];
                        this.measures[to - 1].highTom[i] = this.measures[from - 1].highTom[i];
                        this.measures[to - 1].midTom[i] = this.measures[from - 1].midTom[i];
                        this.measures[to - 1].lowTom[i] = this.measures[from - 1].lowTom[i];
                        this.measures[to - 1].crossStick[i] = this.measures[from - 1].crossStick[i];
                        this.measures[to - 1].snareDrum[i] = this.measures[from - 1].snareDrum[i];
                        this.measures[to - 1].bassDrum[i] = this.measures[from - 1].bassDrum[i];
                        this.measures[to - 1].pedalHiHat[i] = this.measures[from - 1].pedalHiHat[i];
                        break;
                    case 1:
                        // Greek percussion
                        this.measures[to - 1].touberlekiSlap[i] = this.measures[from - 1].touberlekiSlap[i];
                        this.measures[to - 1].touberlekiKa[i] = this.measures[from - 1].touberlekiKa[i];
                        this.measures[to - 1].touberlekiTek[i] = this.measures[from - 1].touberlekiTek[i];
                        this.measures[to - 1].touberlekiDoum[i] = this.measures[from - 1].touberlekiDoum[i];
                        break;
                    default:
                        break;
                }
            }
        }
    }

}

export { Measures };