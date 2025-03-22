import { Glob } from "./glob.js";
import { Instruments } from "./instruments.js";
import { Measures } from "./measures.js";

class RandomRhythm {

    static oneDivision2 = [
        // Only bass drum used
        {
            oneGroup: false,
            snareDrum: [0, 0],
            bassDrum: [1, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0],
            bassDrum: [1, 1]
        },
        // Both drums used
        {
            oneGroup: true,
            snareDrum: [0, 1],
            bassDrum: [1, 0]
        },
        // Only snare drum used
        {
            oneGroup: false,
            snareDrum: [1, 0],
            bassDrum: [0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [1, 1],
            bassDrum: [0, 0]
        }
    ];

    static twoDivisions2 = [
        // Only bass drum used
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0],
            bassDrum: [1, 0, 1, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0],
            bassDrum: [1, 1, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0],
            bassDrum: [1, 0, 0, 1]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0],
            bassDrum: [1, 1, 0, 1]
        },
        // Both drums used
        {
            oneGroup: true,
            snareDrum: [0, 0, 1, 0],
            bassDrum: [1, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 1, 0, 0],
            bassDrum: [1, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 1],
            bassDrum: [1, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 1, 1],
            bassDrum: [1, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 1],
            bassDrum: [1, 1, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 1, 0, 1],
            bassDrum: [1, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 1, 0, 0],
            bassDrum: [1, 0, 0, 1]
        },
        // Only snare drum used
        {
            oneGroup: false,
            snareDrum: [1, 0, 0, 0],
            bassDrum: [0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [1, 0, 1, 0],
            bassDrum: [0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [1, 0, 0, 1],
            bassDrum: [0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [1, 1, 1, 1],
            bassDrum: [0, 0, 0, 0]
        }
    ];

    static threeDivisions2 = [
        // Only bass drum used
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 1, 0, 0]
        },
        // Both drums used
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 1, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [1, 0, 0, 0, 0, 0],
            bassDrum: [0, 0, 1, 0, 1, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 1, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 1, 0, 1, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 1, 0, 0],
            bassDrum: [1, 0, 1, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 1, 0, 0],
            bassDrum: [1, 0, 1, 0, 0, 1]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 1, 0, 0],
            bassDrum: [1, 1, 1, 0, 0, 0]
        },
        // Only snare drum used
        {
            oneGroup: false,
            snareDrum: [1, 0, 0, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [1, 0, 0, 1, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [1, 0, 0, 1, 0, 2],
            bassDrum: [0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [1, 0, 2, 1, 0, 2],
            bassDrum: [0, 0, 0, 0, 0, 0]
        }
    ];

    static fourDivisions2 = [
        // Only bass drum used
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 1, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 1, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 1, 1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 1, 0, 0, 0, 1, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 1, 0, 0, 1, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 1, 1, 1, 0, 0, 0]
        },
        // Both drums used
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 1, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 0, 1, 0, 1, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 1, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 1, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 1, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 0, 1, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 1, 1, 0, 0, 0, 0]
        },
        // Only snare drum used
        {
            oneGroup: false,
            snareDrum: [1, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [1, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [1, 0, 0, 0, 0, 0, 1, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0]
        }
    ];

    static oneDivision3 = [
        // Only bass drum used
        {
            oneGroup: false,
            snareDrum: [0, 0, 0],
            bassDrum: [1, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0],
            bassDrum: [1, 0, 1]
        },
        // Both drums used
        {
            oneGroup: true,
            snareDrum: [0, 0, 1],
            bassDrum: [1, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 1, 0],
            bassDrum: [1, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 1, 1],
            bassDrum: [1, 0, 0]
        },
        // Only snare drum used
        {
            oneGroup: false,
            snareDrum: [1, 0, 0],
            bassDrum: [0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [1, 0, 1],
            bassDrum: [0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [1, 1, 1],
            bassDrum: [0, 0, 0]
        }
    ];

    static twoDivisions3 = [
        // Only bass drum used
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 1, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 1, 0, 0]
        },
        // Both drums used
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 1, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 1, 0, 1, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 0, 1, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 1, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 1, 1, 0, 0]
        },
        // Only snare drum used
        {
            oneGroup: false,
            snareDrum: [1, 0, 0, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [1, 0, 0, 0, 1, 0],
            bassDrum: [0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [1, 0, 1, 0, 1, 0],
            bassDrum: [0, 0, 0, 0, 0, 0]
        }
    ];

    static threeDivisions3 = [
        // Only bass drum used
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        // Both drums used
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 0, 0, 0, 1, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 1, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 1, 0, 0, 1, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 1, 0, 0, 0, 0, 0],
            bassDrum: [1, 1, 1, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 1, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 1, 0, 0, 0, 0, 0, 0]
        },
        // Only snare drum used
        {
            oneGroup: false,
            snareDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [1, 0, 0, 0, 0, 0, 1, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [1, 0, 0, 1, 0, 0, 1, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    ];

    static fourDivisions3 = [
        // Only bass drum used
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
        },
        // Both drums used
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }, {
            oneGroup: true,
            snareDrum: [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0]
        },
        {
            // Tsamikos
            oneGroup: true,
            snareDrum: [0, 0, 0, 2, 1, 0, 2, 0, 0, 0, 2, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
        },
        // Only snare drum used
        {
            oneGroup: false,
            snareDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            snareDrum: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    ];


    static applyHiHatOrRide(groups) {
        let column = 0;
        let groupInfo = null;
        let instrument = Glob.randomInt(1, 2);
        let odd = false;
        let pattern = Glob.randomInt(1, 8);
        let row1 = 0;
        let row2 = 0;
        const useHiHatInput = document.getElementById("randomRhythmUseHiHatSelector").value;

        switch (useHiHatInput) {
            case "hihat":
                instrument = 1;
                break;
            case "ride":
                instrument = 2;
                break;
            default:
                break;
        }

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
                        if ((Math.random() > 0.4) && (measure.divisions === 2) && (i === (measure.beats - 1)) &&
                            (j === 1) && (row1 === Instruments.closedHiHat)) {
                            // Last hit open hi-hat
                            Instruments.setCell(column, row2, 1);
                        } else {
                            Instruments.setCell(column, row1, 1);
                        }
                        break;
                    case 5:
                        // Odd columns
                        if (odd) {
                            Instruments.setCell(column, row1, 1);
                        }
                        break;
                    case 6:
                    case 7:
                    case 8:
                        // 6: Division 1 and 3 of every beat
                        // 7: Division 1, 3 and 4 of every beat
                        // 8: Division 1, 2 and 3 of every beat
                        if (j === 0) {
                            Instruments.setCell(column, row1, 1);
                        }
                        if ((pattern === 8) && (j === 1)) {
                            Instruments.setCell(column, row1, 2);
                        }
                        if (j === 2) {
                            Instruments.setCell(column, row1, 2);
                        }
                        if ((pattern === 7) && (j === 3)) {
                            Instruments.setCell(column, row1, 2);
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