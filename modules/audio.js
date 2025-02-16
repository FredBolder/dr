import { Instruments } from "./instruments.js";

class Audio {
    static audioCache;
    static audioContext;

    static init() {
        this.audioCache = new Map();
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.preloadAudioFiles(Instruments.fileNames);
    }

    static getCachedAudioBuffer(url) {
        return this.audioCache.get(url);
    }

    static async preloadAudioFiles(urls) {
        const loadAudioData = async (url) => {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            return this.audioContext.decodeAudioData(arrayBuffer);
        };

        const audioBuffers = await Promise.all(urls.map(url => loadAudioData(url)));
        urls.forEach((url, index) => this.audioCache.set(url, audioBuffers[index]));
    }
}

export { Audio };
