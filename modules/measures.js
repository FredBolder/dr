import { Glob } from "./glob.js";
import { Measure } from "./measure.js";

class Measures {
    static measures = [];

    static load(rhythm) {
        let measure1 = [];
        let measure2 = [];
        let measure3 = [];
        let measure4 = [];
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
            case "PasoDoble1":
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
            case "PasoDoble2":
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
            case "SlowWaltz1":
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
            case "VienneseWaltz1":
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
            case "Kalamatianos1":
                Glob.settings.tempoSlider.value = 240;
                measure1 = new Measure();
                measure1.beats = 7;
                measure1.divisions = 1;
                measure1.closedHiHat = [1, 1, 1, 1, 1, 1, 1];
                measure1.snareDrum = [0, 0, 1, 0, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 1, 0, 0, 0];
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
            case "Tik1":
                Glob.settings.tempoSlider.value = 250;
                measure1 = new Measure();
                measure1.beats = 5;
                measure1.divisions = 2;
                measure1.closedHiHat = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                measure1.lowTom = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0];
                measure1.snareDrum = [0, 0, 0, 2, 1, 0, 0, 0, 1, 0];
                measure1.bassDrum = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0];
                Measure.fixMeasure(measure1);
                this.measures.push(measure1);
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
            default:
                break;
        }
    }

    static copyMeasure(from, to) {
        if ((from >= 1) && (to >= 1) && (from !== to) && (from <= Measures.measures.length) && (to <= Measures.measures.length)) {
            this.measures[to - 1].beats = this.measures[from - 1].beats;
            this.measures[to - 1].divisions = this.measures[from - 1].divisions;
            this.measures[to - 1].endsWithFill = this.measures[from - 1].endsWithFill;
            Measure.fixMeasure(this.measures[to - 1]);
            for (let i = 0; i < this.measures[from - 1].bassDrum.length; i++) {
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
            }
        }
    }

}

export { Measures };