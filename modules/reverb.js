class Reverb {
    constructor(audioContext, impulseResponseUrl) {
        const wetLevel = 0.2;
        this.audioContext = audioContext;
        this.dryGain = audioContext.createGain();
        this.wetGain = audioContext.createGain();
        this.dryGain.gain.value = 1 - wetLevel;
        this.wetGain.gain.value = wetLevel;
        this.convolver = null;
        this.loaded = false;
        this.loadReverb(impulseResponseUrl);
    }

    async loadReverb(url) {
        if (this.loaded) {
            this.loaded = false;
            if (this.convolver) {
                this.convolver.disconnect();
            }
            this.dryGain.disconnect();
            this.wetGain.disconnect();
        }
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            this.convolver = this.audioContext.createConvolver();
            this.convolver.buffer = audioBuffer;

            this.convolver.connect(this.wetGain);
            this.dryGain.connect(this.audioContext.destination);
            this.wetGain.connect(this.audioContext.destination);

            this.loaded = true;
        } catch (error) {
            console.warn("Error while loading reverb: ", error);
        }

    }

    getConvolver() {
        if (!this.loaded) {
            console.warn("Reverb not yet loaded");
            return null;
        }
        return this.convolver;
    }

    connectSource(source) {
        if (this.loaded) {
            source.connect(this.dryGain);
            source.connect(this.convolver);
        }
    }

    setWet(percentage) {
        const wetLevel = percentage / 100;
        this.dryGain.gain.value = 1 - wetLevel;
        this.wetGain.gain.value = wetLevel;
    }

    static indexToImpulseResponseUrl(n) {
        let files = ["Reverb_Hall_1", "Reverb_Hall_2", "Reverb_Plate_1", "Reverb_Plate_2", "Reverb_Room_1", "Reverb_Room_2"];
        let result = "";
        if ((n >= 0) && (n < files.length)) {
            result = files[n];
        }
        if (result.length > 0) {
            result = "wav/" + result + ".wav";
        }
        return result;
    }
}

export { Reverb };