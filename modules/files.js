import { Glob } from "./glob.js";
import { Instruments } from "./instruments.js";
import { Measures } from "./measures.js";


class Files {

    static async exportPattern() {
        let arr1 = null;
        let arr2 = null;
        let divisions = 1;
        let doubleDivisions = false;
        const fileVersion = 6;
        let found = false;
        let instrumentList = null;
        let measuresToPlay = "";
        let ok = false;
        let pattern = "";
        let saveMeasures = [];
        let usedDivisions = null;
        let value_i = 0;

        usedDivisions = [];
        for (let i = 0; i < Measures.measures.length; i++) {
            const measure = Measures.measures[i];
            if (!usedDivisions.includes(measure.divisions)) {
                usedDivisions.push(measure.divisions);
            }
        }
        usedDivisions.sort();
        divisions = usedDivisions[usedDivisions.length - 1];

        ok = false;
        if (usedDivisions.length === 1) {
            ok = true;
        }
        if (usedDivisions.length === 2) {
            if (usedDivisions[1] = (2 * usedDivisions[0])) {
                ok = true;
            }
        }
        if (!ok) {
            alert("Different divisions in one pattern are not supported in DR for Windows.");
            return false;
        }

        try {
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: "myPattern.ptn", // Default filename
                types: [
                    {
                        description: "Text Files",
                        accept: { "text/plain": [".ptn"] },
                    },
                ],
            });
            const writable = await fileHandle.createWritable();
            await writable.write(fileVersion.toString() + "\n");
            await writable.write("0\n"); // Humanize Volumes
            await writable.write("0\n"); // HumanizeTiming

            measuresToPlay = Glob.settings.measuresToPlay.trim();
            if (measuresToPlay !== "") {
                arr1 = measuresToPlay.split(",");
                arr2 = [];
                for (let i = 0; i < arr1.length; i++) {
                    value_i = Glob.tryParseInt(arr1[i].trim(), 0);
                    if (value_i > 0) {
                        arr2.push(value_i);
                    }
                }
            } else {
                arr1 = [];
                arr2 = [];
            }
            await writable.write(arr2.length.toString() + "\n");
            if (arr2.length > 0) {
                for (let i = 0; i < arr2.length; i++) {
                    await writable.write(arr2[i].toString() + "\n");
                }
            }

            await writable.write("0\n");

            await writable.write(Measures.measures.length.toString() + "\n");
            for (let i = 0; i < Measures.measures.length; i++) {
                const measure = Measures.measures[i];
                if (measure.endsWithFill) {
                    // In DR for Windows, a negative beats value means that the measure ends with a fill
                    await writable.write(-measure.beats.toString() + "\n");
                } else {
                    await writable.write(measure.beats.toString() + "\n");
                }
            }

            // Compact saving and changing divisions if needed
            for (let i = 0; i < Measures.measures.length; i++) {
                const measure = Measures.measures[i];
                let saveMeasure = {};
                saveMeasure.beats = measure.beats;
                doubleDivisions = false;
                if (measure.divisions !== divisions) {
                    doubleDivisions = true;
                }
                saveMeasure.divisions = divisions;
                saveMeasure.endsWithFill = measure.endsWithFill;
                for (const prop in measure) {
                    if (Array.isArray(measure[prop])) {
                        found = false;
                        for (let j = 0; j < measure[prop].length; j++) {
                            if (measure[prop][j] > 0) {
                                found = true;
                            }
                        }
                        if (found) {
                            saveMeasure[prop] = [];
                            for (let j = 0; j < measure[prop].length; j++) {
                                saveMeasure[prop].push(measure[prop][j]);
                                if (doubleDivisions) {
                                    saveMeasure[prop].push(0);
                                }
                            }
                        }
                    }
                }
                saveMeasures.push(saveMeasure);
            }

            await writable.write(divisions.toString() + "\n");
            await writable.write(Glob.settings.tempo.toString() + "\n");

            instrumentList = [];
            for (let i = 0; i < saveMeasures.length; i++) {
                const measure = saveMeasures[i];
                for (const prop in measure) {
                    if (Array.isArray(measure[prop])) {
                        if (!instrumentList.includes(prop) && (Instruments.getInstrumentByProp(prop).export !== "")) {
                            instrumentList.push(prop);
                        }
                    }
                }
            }
            instrumentList.sort();
            await writable.write(instrumentList.length.toString() + "\n");
            for (let i = 0; i < instrumentList.length; i++) {
                await writable.write(Instruments.getInstrumentByProp(instrumentList[i]).export + "\n");
            }

            for (let i = 0; i < saveMeasures.length; i++) {
                const measure = saveMeasures[i];
                for (let j = 0; j < instrumentList.length; j++) {
                    const prop = instrumentList[j];
                    pattern = "";
                    if (measure.hasOwnProperty(prop)) {
                        for (let k = 0; k < measure[prop].length; k++) {
                            const data = measure[instrumentList[j]][k];
                            pattern += this.strokeToChar(data);
                        }
                    } else {
                        pattern = Glob.fillChar(measure.beats * measure.divisions, " ");
                    }
                    await writable.write(pattern + "\n");
                }
            }

            await writable.close();
            return true;
        } catch (err) {
            console.error("Error saving file:", err);
            return false;
        }
    }

    static async openPattern() {
        let fileVersion = 0;
        // 1 Initial version
        // 2 Instrument set added
        // 3 Mute, solo, volume, pitch and pan added
        // 4 Reverb added
        // 5 Other (instrument) added
        // 6 FilterType, FilterFreq and FilterQ added
        // 7 Distortion added
        let measurePointer = 0;

        try {
            const [fileHandle] = await window.showOpenFilePicker({
                types: [
                    {
                        description: "Text Files",
                        accept: { "text/plain": [".dr"] },
                    },
                ],
                multiple: false,
            });
            Glob.initSettings();
            const file = await fileHandle.getFile();
            if (!file.name.toLowerCase().endsWith(".dr")) {
                alert("Invalid file type. Please select a .dr file.");
                return;
            }
            Instruments.initSettings();
            const text = await file.text();
            const lines = text.split("\n");
            fileVersion = Glob.tryParseInt(lines[0], 0);
            Glob.settings.measuresToPlay = lines[1];
            Glob.settings.tempo = Glob.tryParseInt(lines[2], 0);
            measurePointer = 3;
            if (fileVersion >= 2) {
                Glob.settings.instrumentSet = Glob.tryParseInt(lines[3], 0);
                measurePointer++;
            }
            if (fileVersion >= 4) {
                Glob.settings.reverbType = Glob.tryParseInt(lines[4], 3);
                Glob.settings.reverbWet = Glob.tryParseInt(lines[5], 25);
                measurePointer += 2;
            }
            Measures.measures = JSON.parse(lines[measurePointer]);
            Measures.addMissingProps();
            if (fileVersion >= 3) {
                const instrumentSettings = JSON.parse(lines[measurePointer + 1]);
                for (let i = 0; i < instrumentSettings.length; i++) {
                    const settings = instrumentSettings[i];
                    for (let j = 0; j < Instruments.instruments.length; j++) {
                        const instrument = Instruments.instruments[j];
                        if (instrument.property === settings.property) {
                            instrument.mute = settings.mute;
                            instrument.solo = settings.solo;
                            instrument.volume = settings.volume;
                            instrument.pitch = settings.pitch;
                            instrument.pan = settings.pan;
                            if (fileVersion >= 4) {
                                instrument.reverb = settings.reverb;
                            }
                            if (fileVersion >= 5) {
                                instrument.other = settings.other;
                            }
                            if (fileVersion >= 6) {
                                instrument.filterType = settings.filterType;
                                instrument.filterFreq = settings.filterFreq;
                                instrument.filterQ = settings.filterQ;
                            }
                            if (fileVersion >= 7) {
                                instrument.distortion = settings.distortion;
                            }
                        }
                    }
                }
            }
            return true;
        } catch (err) {
            console.error("Error opening file:", err);
            return false;
        }
    }

    static async savePattern() {
        const fileVersion = 7;
        let found = false;
        let saveMeasures = [];
        let saveSettings = [];
        try {
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: "myPattern.dr", // Default filename
                types: [
                    {
                        description: "Text Files",
                        accept: { "text/plain": [".dr"] },
                    },
                ],
            });
            const writable = await fileHandle.createWritable();
            await writable.write(fileVersion.toString() + "\n");
            await writable.write(Glob.settings.measuresToPlay + "\n");
            await writable.write(Glob.settings.tempo.toString() + "\n");
            await writable.write(Glob.settings.instrumentSet.toString() + "\n");
            await writable.write(Glob.settings.reverbType.toString() + "\n");
            await writable.write(Glob.settings.reverbWet.toString() + "\n");

            // Compact saving
            for (let i = 0; i < Measures.measures.length; i++) {
                const measure = Measures.measures[i];
                let saveMeasure = {};
                saveMeasure.beats = measure.beats;
                saveMeasure.divisions = measure.divisions;
                saveMeasure.endsWithFill = measure.endsWithFill;
                for (const prop in measure) {
                    if (Array.isArray(measure[prop])) {
                        found = false;
                        for (let j = 0; j < measure[prop].length; j++) {
                            if (measure[prop][j] > 0) {
                                found = true;
                            }
                        }
                        if (found) {
                            saveMeasure[prop] = [];
                            for (let j = 0; j < measure[prop].length; j++) {
                                saveMeasure[prop].push(measure[prop][j]);
                            }
                        }
                    }
                }
                saveMeasures.push(saveMeasure);
            }
            await writable.write(JSON.stringify(saveMeasures) + "\n");
            for (let i = 0; i < Instruments.instruments.length; i++) {
                const instrument = Instruments.instruments[i];
                const instrumentSettings = {
                    property: instrument.property,
                    mute: instrument.mute,
                    solo: instrument.solo,
                    other: instrument.other,
                    volume: instrument.volume,
                    pitch: instrument.pitch,
                    pan: instrument.pan,
                    filterType: instrument.filterType,
                    filterFreq: instrument.filterFreq,
                    filterQ: instrument.filterQ,
                    distortion: instrument.distortion,
                    reverb: instrument.reverb
                };
                saveSettings.push(instrumentSettings);
            }
            await writable.write(JSON.stringify(saveSettings) + "\n");
            await writable.close();
            return true;
        } catch (err) {
            console.error("Error saving file:", err);
            return false;
        }
    }

    static strokeToChar(stroke) {
        let result = " ";

        switch (stroke) {
            case 0:
                result = " ";
                break;
            case 1:
                // Normal hit
                result = "X";
                break;
            case 2:
                // Soft hit
                result = "x";
                break;
            case 3:
                // Hard hit
                result = "#";
                break;
            case 4:
                // Very soft hit
                result = ".";
                break;
            case 5:
                // Very hard hit
                result = "@";
                break;
            case 6:
                // Flam
                result = "F";
                break;
            case 15:
                // Ruff
                result = "R";
                break;
            case 7:
                // Additional normal hit
                result = "+";
                break;
            case 8:
                // Additional soft hit
                result = "a";
                break;
            case 9:
                // Additional hard hit
                result = "A";
                break;
            case 12:
                // Play only if the previous measure ends with a fill
                result = "!";
                break;
            case 13:
                // Play not if the previous measure ends with a fill
                result = ":";
                break;
            default:
                result = " ";
                break;
        }
        return result;
    }

}

export { Files };