import { Glob } from "./glob.js";
import { Instruments } from "./instruments.js";
import { Measures } from "./measures.js";

class RandomRhythm {

    static oneDivision2 = [
        {
            snareDrum: [0, 0],
            bassDrum: [1, 0]
        },
        {
            snareDrum: [0, 1],
            bassDrum: [1, 0]
        },
        {
            snareDrum: [0, 0],
            bassDrum: [1, 1]
        },
        {
            snareDrum: [1, 0],
            bassDrum: [0, 0]
        },
        {
            snareDrum: [1, 1],
            bassDrum: [0, 0]
        },
    ];

    static twoDivisions2 = [
        {
            snareDrum: [0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 1, 0],
            bassDrum: [1, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0],
            bassDrum: [1, 0, 1, 0]
        },
        {
            snareDrum: [1, 0, 0, 0],
            bassDrum: [0, 0, 0, 0]
        },
        {
            snareDrum: [1, 0, 1, 0],
            bassDrum: [0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0],
            bassDrum: [1, 1, 0, 0]
        },
        {
            snareDrum: [0, 1, 0, 0],
            bassDrum: [1, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0],
            bassDrum: [1, 0, 0, 1]
        },
        {
            snareDrum: [1, 0, 0, 1],
            bassDrum: [0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 1],
            bassDrum: [1, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 1, 1],
            bassDrum: [1, 0, 0, 0]
        },
    ];

    static threeDivisions2 = [
        {
            snareDrum: [0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 1, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 1, 0, 0]
        },
        {
            snareDrum: [1, 0, 0, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [1, 0, 0, 1, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [1, 0, 0, 0, 0, 0],
            bassDrum: [0, 0, 1, 0, 1, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 1, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 1, 0, 1, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 1, 0, 0],
            bassDrum: [1, 1, 1, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 1, 0, 0],
            bassDrum: [1, 0, 1, 0, 0, 0]
        },
    ];

    static fourDivisions2 = [
        {
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 1, 0, 0, 0]
        },
        {
            snareDrum: [1, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [1, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 1, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 1, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 1, 0]
        },
        {
            snareDrum: [1, 0, 0, 0, 0, 0, 1, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 1, 0, 1, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 1, 1, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 1, 1, 1, 0, 0, 0]
        },
    ];


    static oneDivision3 = [
        {
            snareDrum: [0, 0, 0],
            bassDrum: [1, 0, 0]
        },
        {
            snareDrum: [0, 0, 1],
            bassDrum: [1, 0, 0]
        },
        {
            snareDrum: [0, 1, 1],
            bassDrum: [1, 0, 0]
        },
        {
            snareDrum: [1, 0, 0],
            bassDrum: [0, 0, 0]
        },
        {
            snareDrum: [1, 0, 1],
            bassDrum: [0, 0, 0]
        },
        {
            snareDrum: [1, 1, 1],
            bassDrum: [0, 0, 0]
        },
        {
            snareDrum: [0, 0, 1],
            bassDrum: [1, 1, 0]
        },
        {
            snareDrum: [0, 1, 0],
            bassDrum: [1, 0, 0]
        },
    ];

    static twoDivisions3 = [
        {
            snareDrum: [0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 1, 0, 1, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [1, 0, 0, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [1, 0, 0, 0, 1, 0],
            bassDrum: [0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [1, 0, 1, 0, 1, 0],
            bassDrum: [0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 0, 1, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 1, 1, 0, 0]
        },
        {
            snareDrum: [0, 0, 1, 1, 1, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 1, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 1, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 1, 0]
        },
    ];

    static threeDivisions3 = [
        {
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 0, 0, 1, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 1, 0, 0, 1, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [1, 0, 0, 0, 0, 0, 1, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [1, 0, 0, 1, 0, 0, 1, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 1, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 1, 0, 0, 0, 0, 0],
            bassDrum: [1, 1, 1, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 1, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 1, 0, 0, 0, 0, 0, 0]
        },
    ];

    static fourDivisions3 = [
        {
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
        },
    ];


    static applyHiHatOrRide(groups) {
        let column = 0;
        let groupInfo = null;
        const instrument = Glob.randomInt(1, 2);
        let odd = false;
        let pattern = Glob.randomInt(1, 5);
        let row1 = 0;
        let row2 = 0;

        switch (instrument) {
            case 1:
                // Hi-hat
                row1 = Instruments.closedHiHat;
                row2 = Instruments.openHiHat;
                break;
            case 2:
                // Ride
                row1 = Instruments.rideCymbal;
                row2 = Instruments.rideBell;
                break;
            default:
                row1 = Instruments.closedHiHat;
                row2 = Instruments.openHiHat;
                break;
        }

        odd = false;
        const measure = Measures.measures[0];

        if ((pattern === 5) && ((measure.divisions === 1) || (measure.divisions === 3))) {
            pattern = 1;
        }

        for (let i = 0; i < measure.beats; i++) {
            for (let j = 0; j < measure.divisions; j++) {
                odd = !odd;
                column = (i * measure.divisions) + j;
                Instruments.setCell(column, row1, 0);
                switch (pattern) {
                    case 1:
                        // Every beat
                        if (j === 0) {
                            Instruments.setCell(column, row1, 1);
                        }
                        break;
                    case 2:
                        // Every start of group
                        if ((j === 0) && (this.groupInfo(i + 1, groups).countInGroup === 1)) {
                            Instruments.setCell(column, row1, 1);
                        }
                        break;
                    case 3:
                        // Every start of group and end of a group with 3 counts
                        if (j === 0) {
                            groupInfo = this.groupInfo(i + 1, groups);
                            if (groupInfo.countInGroup === 1) {
                                Instruments.setCell(column, row1, 1);
                            }
                            if (groupInfo.countInGroup === 3) {
                                Instruments.setCell(column, row1, 2);
                            }
                        }
                        break;
                    case 4:
                        // Every column
                        Instruments.setCell(column, row1, 1);
                        break;
                    case 5:
                        // Odd columns
                        if (odd) {
                            Instruments.setCell(column, row1, 1);
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }

    static groupInfo(count, groups) {
        let countInGroup = 0;
        let group = 0;
        let n1 = 1;

        for (let i = 0; i < groups.length; i++) {
            const counts = groups[i];
            if ((count >= n1) && (count < (n1 + counts))) {
                group = i + 1;
                countInGroup = (count - n1) + 1;
            }
            n1 += counts;
        }

        return { group, countInGroup };
    }

}

export { RandomRhythm };