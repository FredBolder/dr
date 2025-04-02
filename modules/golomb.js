class Golomb {
    static rulers = [
        // 1
        [[0, 1]],
        // 2
        [[0, 2]],
        // 3
        [[0, 1, 3], [0, 2, 3], [0, 3]],
        // 4
        [[0, 1, 4], [0, 3, 4], [0, 4]],
        // 5
        [[0, 1, 5], [0, 2, 5], [0, 3, 5], [0, 4, 5], [0, 5]],
        // 6
        [[0, 1, 4, 6], [0, 1, 6], [0, 2, 5, 6], [0, 2, 6], [0, 4, 6], [0, 5, 6], [0, 6]],
        // 7
        [[0, 1, 3, 7], [0, 1, 5, 7], [0, 1, 7], [0, 2, 3, 7], [0, 2, 6, 7], [0, 2, 7], [0, 3, 7], [0, 4, 5, 7], [0, 4, 6, 7],
        [0, 4, 7], [0, 5, 7], [0, 6, 7], [0, 7]],
        // 8
        [[0, 1, 3, 8], [0, 1, 5, 8], [0, 1, 6, 8], [0, 1, 8], [0, 2, 3, 8], [0, 2, 7, 8], [0, 2, 8], [0, 3, 7, 8], [0, 3, 8],
        [0, 5, 6, 8], [0, 5, 7, 8], [0, 5, 8], [0, 6, 8], [0, 7, 8], [0, 8]],
        // 9
        [[0, 1, 3, 9], [0, 1, 4, 9], [0, 1, 6, 9], [0, 1, 7, 9], [0, 1, 9], [0, 2, 3, 9], [0, 2, 5, 9], [0, 2, 6, 9], [0, 2, 8, 9], [0, 2, 9],
        [0, 3, 4, 9], [0, 3, 5, 9], [0, 3, 7, 9], [0, 3, 8, 9], [0, 3, 9], [0, 4, 6, 9], [0, 4, 7, 9], [0, 4, 9], [0, 5, 6, 9], [0, 5, 8, 9],
        [0, 5, 9], [0, 6, 7, 9], [0, 6, 8, 9], [0, 6, 9], [0, 7, 9], [0, 8, 9], [0, 9],
        ],
        // 10
        [[0, 1, 3, 10], [0, 1, 4, 10], [0, 1, 6, 10], [0, 1, 7, 10], [0, 1, 8, 10], [0, 1, 10], [0, 2, 3, 10], [0, 2, 7, 10], [0, 2, 9, 10],
        [0, 2, 10], [0, 3, 4, 10], [0, 3, 8, 10], [0, 3, 9, 10], [0, 3, 10], [0, 4, 9, 10], [0, 4, 10], [0, 6, 7, 10], [0, 6, 9, 10],
        [0, 6, 10], [0, 7, 8, 10], [0, 7, 9, 10], [0, 7, 10], [0, 8, 10], [0, 9, 10], [0, 10]],
        // 11 From here not all possible rulers are available
        [[0, 1, 4, 9, 11], [0, 2, 7, 8, 11]],
        // 12
        [[0, 1, 4, 10, 12], [0, 1, 8, 12], [0, 1, 5, 12]],
        // 13
        [[0, 1, 8, 11, 13], [0, 2, 7, 13], [0, 1, 4, 13]],
        // 14
        [[0, 1, 8, 12, 14], [0, 1, 9, 14]],
        // 15
        [[0, 1, 4, 10, 15], [0, 1, 4, 9, 15], [0, 3, 15]],
        // 16
        [[0, 1, 11, 16], [0, 2, 3, 10, 16]],
        // 17
        [[0, 1, 4, 10, 12, 17], [0, 1, 4, 10, 15, 17], [0, 1, 8, 11, 13, 17], [0, 1, 8, 12, 14, 17]],
        // 18
        [[0, 1, 4, 10, 18]],
        // 19
        [[0, 1, 11, 16, 19], [0, 1, 9, 19]],
        // 20
        [[0, 1, 7, 11, 20], [0, 4, 6, 20]],
        // 21
        [[0, 2, 3, 10, 16, 21], [0, 2, 7, 13, 21]],
        // 22
        [[0, 2, 7, 13, 21, 22], [0, 1, 4, 9, 15, 22], [0, 2, 10, 22]],
        // 23
        [[0, 1, 4, 10, 18, 23], [0, 1, 7, 11, 20, 23], [0, 1, 11, 16, 19, 23], [0, 1, 6, 10, 23]],
        // 24
        [[0, 1, 9, 19, 24], [0, 2, 6, 24]],
        // 25
        [[0, 1, 4, 10, 18, 23, 25], [0, 1, 7, 11, 20, 23, 25], [0, 1, 11, 16, 19, 23, 25], [0, 2, 3, 10, 16, 21, 25,], [0, 2, 7, 13, 21, 22, 25]],
        // 26
        [[0, 1, 6, 10, 23, 26], [0, 1, 4, 11, 26]],
        // 27
        [[0, 1, 5, 12, 25, 27]],
        // 28
        [[0, 1, 4, 13, 28]],
        // 29
        [[0, 2, 6, 24, 29], [0, 12, 29]],
        // 30
        [[0, 4, 20, 30]],
        // 31
        [[0, 1, 9, 19, 24, 31]],
        // 32
        [[0, 1, 4, 9, 15, 22, 32], [0, 1, 4, 11, 26, 32], [0, 1, 6, 25, 32]],
        // 33
        [[0, 1, 4, 13, 28, 33], [0, 9, 33], [0, 1, 33]],
        // 34
        [[0, 1, 4, 9, 15, 22, 32, 34], [0, 1, 6, 10, 23, 26, 34]],
        // 35
        [[0, 1, 5, 12, 25, 27, 35], [0, 4, 6, 20, 35]],
    ];

    static isValidGolombRuler(ruler) {
        let distances = new Set();
        for (let i = 0; i < ruler.length; i++) {
            for (let j = i + 1; j < ruler.length; j++) {
                let distance = ruler[j] - ruler[i];
                if (distances.has(distance)) {
                    return false;
                }
                distances.add(distance);
            }
        }
        return true;
    }

    static golombRuler(steps, variation, useLookupTable = true) {
        let result = new Array(steps).fill("0");
        let rulers;

        if (variation < 1) {
            return result.join("");
        }
        if (useLookupTable) {
            rulers = this.rulers[steps - 1];
        } else {
            rulers = this.findAllGolombRulersByLength(steps);
        }
        //console.log(rulers);
        if (rulers.length === 0 || variation > rulers.length) {
            return result.join("");
        }
        for (let mark of rulers[variation - 1]) {
            if (mark < steps) {
                result[mark] = "1";
            }
        }
        return result.join("");
    }

    static findAllGolombRulersByLength(length) {
        const result = [];
        this.searchRulers(result, [0], 1, length);
        return result;
    }

    static searchRulers(result, ruler, nextMark, maxLength) {
        for (let i = nextMark; i <= maxLength; i++) {
            const newRuler = [...ruler, i];
            if (this.isValidGolombRuler(newRuler)) {
                if (i === maxLength) {
                    result.push(newRuler);
                } else {
                    this.searchRulers(result, newRuler, i + 1, maxLength);
                }
            }
        }
    }

    static golombRulerSlow(steps, variation) {
        let result = new Array(steps).fill("0");
        const rulers = this.findAllGolombRulersByLength(steps);
        if (variation > rulers.length) {
            variation = rulers.length;
        }
        for (let mark of rulers[variation - 1]) {
            if (mark < steps) {
                result[mark] = "1";
            }
        }
        return result.join("");
    }

    static findAllGolombRulersByLengthSlow(length) {
        let bitmask = 0;
        let max = 0;
        const result = [];

        max = Math.pow(2, length - 1);
        for (let i = 0; i < max; i++) {
            const ruler = [];
            ruler.push(0);
            for (let j = 0; j < length - 1; j++) {
                bitmask = Math.pow(2, j);
                if ((i & bitmask) === bitmask) {
                    ruler.push(j + 1);
                }
            }
            ruler.push(length);
            if (this.isValidGolombRuler(ruler)) {
                //console.log(ruler);
                result.push(ruler);
            }
        }
        return result;
    }

}

export { Golomb };
