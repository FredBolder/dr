import { Glob } from "./glob.js";
import { Instruments } from "./instruments.js";
import { Measures } from "./measures.js";

class RandomRhythm {

    static oneDivision2 = [
        // Only bass drum used
        {
            oneGroup: false,
            closedHiHat: [1, 1],
            snareDrum: [0, 0],
            bassDrum: [1, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 1],
            snareDrum: [0, 0],
            bassDrum: [1, 1]
        },
        // Both drums used
        {
            oneGroup: true,
            closedHiHat: [1, 1],
            snareDrum: [0, 1],
            bassDrum: [1, 0]
        },
        // Only snare drum used
        {
            oneGroup: false,
            closedHiHat: [1, 1],
            snareDrum: [1, 0],
            bassDrum: [0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 1],
            snareDrum: [1, 1],
            bassDrum: [0, 0]
        }
    ];

    static twoDivisions2 = [
        // Only bass drum used
        {
            oneGroup: false,
            closedHiHat: [1, 0, 1, 0],
            snareDrum: [0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 1, 0],
            snareDrum: [0, 0, 0, 0],
            bassDrum: [1, 0, 1, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 1, 0],
            snareDrum: [0, 0, 0, 0],
            bassDrum: [1, 1, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 1, 0],
            snareDrum: [0, 0, 0, 0],
            bassDrum: [1, 0, 0, 1]
        },
        // Both drums used
        {
            oneGroup: true,
            closedHiHat: [1, 0, 1, 0],
            snareDrum: [0, 0, 1, 0],
            bassDrum: [1, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 1, 0],
            snareDrum: [0, 1, 0, 0],
            bassDrum: [1, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 1, 0],
            snareDrum: [0, 0, 0, 1],
            bassDrum: [1, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 1, 0],
            snareDrum: [0, 0, 1, 1],
            bassDrum: [1, 0, 0, 0]
        },
        // Only snare drum used
        {
            oneGroup: false,
            closedHiHat: [1, 0, 1, 0],
            snareDrum: [1, 0, 0, 0],
            bassDrum: [0, 0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 1, 0],
            snareDrum: [1, 0, 1, 0],
            bassDrum: [0, 0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 1, 0],
            snareDrum: [1, 0, 0, 1],
            bassDrum: [0, 0, 0, 0]
        },
    ];

    static threeDivisions2 = [
        // Only bass drum used
        {
            oneGroup: false,
            closedHiHat: [1, 0, 0, 1, 0, 2],
            snareDrum: [0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 0, 1, 0, 2],
            snareDrum: [0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 1, 0, 0]
        },
        // Both drums used
        {
            oneGroup: true,
            closedHiHat: [1, 0, 0, 1, 0, 2],
            snareDrum: [0, 0, 0, 1, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 0, 0, 2, 0],
            snareDrum: [0, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 1, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 0, 0, 2, 0],
            snareDrum: [0, 0, 1, 0, 1, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 0, 0, 2, 0],
            snareDrum: [1, 0, 0, 0, 0, 0],
            bassDrum: [0, 0, 1, 0, 1, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 0, 1, 0, 2],
            snareDrum: [0, 0, 0, 1, 0, 0],
            bassDrum: [1, 0, 1, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 0, 1, 0, 2],
            snareDrum: [0, 0, 2, 1, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 0, 1, 0, 2],
            snareDrum: [0, 0, 0, 1, 0, 0],
            bassDrum: [1, 0, 1, 0, 0, 1]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 0, 1, 0, 2],
            snareDrum: [0, 0, 0, 1, 0, 0],
            bassDrum: [1, 1, 1, 0, 0, 0]
        },
        // Only snare drum used
        {
            oneGroup: false,
            closedHiHat: [1, 0, 0, 1, 0, 2],
            snareDrum: [1, 0, 0, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 0, 1, 0, 2],
            snareDrum: [1, 0, 0, 1, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 0, 1, 0, 2],
            snareDrum: [1, 0, 0, 1, 0, 2],
            bassDrum: [0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 0, 1, 0, 2],
            snareDrum: [1, 0, 2, 1, 0, 2],
            bassDrum: [0, 0, 0, 0, 0, 0]
        }
    ];

    static fourDivisions2 = [
        // Only bass drum used
        {
            oneGroup: false,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 1, 0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 1, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 1, 0, 1, 0]
        },
        // Both drums used
        {
            oneGroup: true,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [0, 0, 0, 0, 1, 0, 1, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 1, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 1]
        },
        // Only snare drum used
        {
            oneGroup: false,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [1, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [1, 0, 0, 0, 0, 0, 1, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0]
        }
    ];

    static oneDivision3 = [
        // Only bass drum used
        {
            oneGroup: false,
            closedHiHat: [1, 1, 1],
            snareDrum: [0, 0, 0],
            bassDrum: [1, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 1, 1],
            snareDrum: [0, 0, 0],
            bassDrum: [1, 0, 1]
        },
        // Both drums used
        {
            oneGroup: true,
            closedHiHat: [1, 1, 1],
            snareDrum: [0, 0, 1],
            bassDrum: [1, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 1, 1],
            snareDrum: [0, 1, 0],
            bassDrum: [1, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 1, 1],
            snareDrum: [0, 1, 1],
            bassDrum: [1, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 1, 1],
            snareDrum: [0, 0, 1],
            bassDrum: [1, 1, 0]
        },
        // Only snare drum used
        {
            oneGroup: false,
            closedHiHat: [1, 1, 1],
            snareDrum: [1, 0, 0],
            bassDrum: [0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 1, 1],
            snareDrum: [1, 0, 1],
            bassDrum: [0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 1, 1],
            snareDrum: [1, 1, 1],
            bassDrum: [0, 0, 0]
        }
    ];

    static twoDivisions3 = [
        // Only bass drum used
        {
            oneGroup: false,
            closedHiHat: [1, 0, 1, 0, 1, 0],
            snareDrum: [0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 1, 0, 1, 0],
            snareDrum: [0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 1, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 1, 0, 1, 0],
            snareDrum: [0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 1, 0, 0]
        },
        // Both drums used
        {
            oneGroup: true,
            closedHiHat: [1, 0, 1, 0, 1, 0],
            snareDrum: [0, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 1, 0, 1, 0],
            snareDrum: [0, 0, 0, 1, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 1, 0, 1, 0],
            snareDrum: [0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 1, 0, 1, 0],
            snareDrum: [0, 0, 1, 0, 1, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 1, 0, 1, 0],
            snareDrum: [0, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 0, 1, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 1, 0, 1, 0],
            snareDrum: [0, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 1, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 1, 0, 1, 0],
            snareDrum: [0, 0, 1, 1, 1, 0],
            bassDrum: [1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 1, 0, 1, 0],
            snareDrum: [0, 0, 0, 0, 1, 0],
            bassDrum: [1, 0, 1, 1, 0, 0]
        },
        // Only snare drum used
        {
            oneGroup: false,
            closedHiHat: [1, 0, 1, 0, 1, 0],
            snareDrum: [1, 0, 0, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 1, 0, 1, 0],
            snareDrum: [1, 0, 0, 0, 1, 0],
            bassDrum: [0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 1, 0, 1, 0],
            snareDrum: [1, 0, 1, 0, 1, 0],
            bassDrum: [0, 0, 0, 0, 0, 0]
        }
    ];

    static threeDivisions3 = [
        // Only bass drum used
        {
            oneGroup: false,
            closedHiHat: [1, 0, 0, 1, 0, 0, 1, 0, 2],
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 0, 1, 0, 0, 1, 0, 2],
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 1, 0, 0]
        },
        // Both drums used
        {
            oneGroup: true,
            closedHiHat: [1, 0, 0, 1, 0, 0, 1, 0, 2],
            snareDrum: [0, 0, 0, 0, 0, 0, 1, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 0, 1, 0, 0, 1, 0, 2],
            snareDrum: [0, 0, 0, 1, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 0, 1, 0, 0, 1, 0, 2],
            snareDrum: [0, 0, 0, 1, 0, 0, 1, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 0, 1, 0, 0, 1, 0, 2],
            snareDrum: [0, 0, 0, 1, 0, 0, 0, 0, 0],
            bassDrum: [1, 1, 1, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 0, 1, 0, 0, 1, 0, 2],
            snareDrum: [0, 0, 0, 1, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 1, 0, 0, 0, 0, 0, 0]
        },
        // Only snare drum used
        {
            oneGroup: false,
            closedHiHat: [1, 0, 0, 1, 0, 0, 1, 0, 2],
            snareDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 0, 1, 0, 0, 1, 0, 2],
            snareDrum: [1, 0, 0, 0, 0, 0, 1, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 0, 1, 0, 0, 1, 0, 2],
            snareDrum: [1, 0, 0, 1, 0, 0, 1, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    ];

    static fourDivisions3 = [
        // Only bass drum used
        {
            oneGroup: false,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
        },
        // Both drums used
        {
            oneGroup: true,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: true,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0]
        },
        // Only snare drum used
        {
            oneGroup: false,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            oneGroup: false,
            closedHiHat: [1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0],
            snareDrum: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            bassDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    ];

    static createPattern1(groups) {
        let bass = false;
        let bassSnareVariation = 0;
        let col = 0;
        let column = 0;
        let groupInfo = null;
        let hiHatRideVariation = false;
        let instrument = 1;
        let odd = false;
        let originalPattern = 1;
        let pattern = 1;
        let patternList = null;
        let row = 0;
        let row1 = 0;
        let row2 = 0;
        let threeBeatGroup = false;

        const measure = Measures.measures[0];

        hiHatRideVariation = (Math.random() > 0.6);
        bassSnareVariation = Glob.randomInt(0, 3);

        instrument = Glob.randomInt(1, 2);

        switch (measure.divisions) {
            case 1:
                patternList = [1, 2, 3, 4, 6];
                break;
            case 2:
                patternList = [1, 2, 3, 4, 5, 6, 7];
                break;
            case 3:
                patternList = [8];
                break;
            case 4:
                patternList = [8, 9, 10];
                break;
            default:
                patternList = null;
                break;
        }
        pattern = patternList[Glob.randomInt(0, patternList.length - 1)];

        //pattern = 8; // TODO: remove

        originalPattern = pattern;
        if (pattern === 5) {
            pattern = Glob.randomInt(1, 4);
        }

        switch (document.getElementById("randomRhythmUseHiHatSelector").value) {
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
        for (let i = 0; i < measure.beats; i++) {
            for (let j = 0; j < measure.divisions; j++) {
                groupInfo = this.groupInfo(i + 1, groups);
                threeBeatGroup = (groups[groupInfo.group - 1] === 3);
                odd = !odd;
                column = (i * measure.divisions) + j;
                Instruments.setCell(column, row1, 0);
                switch (pattern) {
                    case 1:
                        if (j === 0) {
                            row = row1;
                            if (hiHatRideVariation) {
                                if (groupInfo.countInGroup === 1) {
                                    row = row2;
                                } else {
                                    row = row1;
                                }
                            }
                            Instruments.setCell(column, row, 1);
                            if (groupInfo.countInGroup === 1) {
                                Instruments.setCell(column, Instruments.bassDrum, 1);
                            } else {
                                Instruments.setCell(column, Instruments.snareDrum, 1);
                            }
                        }
                        break;
                    case 2:
                        if (j === 0) {
                            if (groupInfo.countInGroup === 1) {
                                Instruments.setCell(column, row1, 1);
                                Instruments.setCell(column, Instruments.bassDrum, 1);
                            } else {
                                Instruments.setCell(column, Instruments.snareDrum, 1);
                            }
                            if ((Math.random() > 0.5) && (groupInfo.countInGroup === 3)) {
                                Instruments.setCell(column, row1, 2);
                            }
                        }
                        break;
                    case 3:
                    case 6:
                        if (j === 0) {
                            if (row1 === Instruments.closedHiHat) {
                                if ((Math.random() > 0.6) && (i === (measure.beats - 1))) {
                                    // Last hit open hi-hat
                                    Instruments.setCell(column, row2, 1);
                                } else {
                                    Instruments.setCell(column, row1, 1);
                                }
                            } else {
                                row = row1;
                                if (hiHatRideVariation) {
                                    if (groupInfo.countInGroup === 1) {
                                        row = row2;
                                    } else {
                                        row = row1;
                                    }
                                }
                                Instruments.setCell(column, row, 1);
                            }
                            if ((groupInfo.countInGroup === 1) || ((pattern === 6) && (groupInfo.countInGroup === 3))) {
                                bass = (Math.random() > 0.4);
                                if (groupInfo.countInGroup === 1) {
                                    if (groupInfo.group === groups.length) {
                                        bass = false;
                                    }
                                    if (groupInfo.group === 1) {
                                        bass = true;
                                    }
                                }
                                if (bass) {
                                    Instruments.setCell(column, Instruments.bassDrum, 1);
                                } else {
                                    Instruments.setCell(column, Instruments.snareDrum, 1);
                                }
                            }
                        }
                        break;
                    case 4:
                        if (j === 0) {
                            if (groupInfo.countInGroup === 1) {
                                Instruments.setCell(column, row1, 1);
                                Instruments.setCell(column, Instruments.bassDrum, 1);
                            }
                            if (groupInfo.countInGroup === 3) {
                                Instruments.setCell(column, Instruments.snareDrum, 1);
                            }
                            if (groupInfo.countInGroup === 2) {
                                bass = (Math.random() > 0.6);
                                if (i === (measure.beats - 1)) {
                                    bass = false;
                                }
                                if (bass) {
                                    row = Instruments.bassDrum;
                                } else {
                                    row = Instruments.snareDrum;
                                }
                                col = column;
                                if ((measure.divisions === 2) && (Math.random() > 0.5)) {
                                    // On the & of count 2
                                    col++;
                                }
                                Instruments.setCell(col, row, 1);
                            }
                        }
                        break;
                    case 7:
                        if (j === 0) {
                            if (groupInfo.countInGroup === 1) {
                                Instruments.setCell(column, row1, 1);
                                Instruments.setCell(column, Instruments.bassDrum, 1);
                            }
                            if (groupInfo.countInGroup === 3) {
                                Instruments.setCell(column, Instruments.snareDrum, 1);
                                if (Math.random() > 0.7) {
                                    Instruments.setCell(column, row1, 2);
                                }
                            }
                            if (groupInfo.countInGroup === 2) {
                                if (Math.random() > 0.6) {
                                    Instruments.setCell(column, Instruments.bassDrum, 1);
                                } else {
                                    Instruments.setCell(column, Instruments.snareDrum, 1);
                                }
                                if (Math.random() > 0.5) {
                                    if (Math.random() > 0.6) {
                                        Instruments.setCell(column + 1, Instruments.bassDrum, 1);
                                    } else {
                                        Instruments.setCell(column + 1, Instruments.snareDrum, 1);
                                    }
                                }
                            }
                        }
                        break;
                    case 8:
                        if ((j === 0) || (j === 2)) {
                            row = row1;
                            if (row1 === Instruments.closedHiHat) {
                                if ((Math.random() > 0.6) && (i === (measure.beats - 1)) && (j === 2)) {
                                    // Last hit open hi-hat
                                    row = row2;
                                }
                            }
                            if (j === 0) {
                                Instruments.setCell(column, row, 1);
                            } else {
                                Instruments.setCell(column, row, 2);
                            }
                        }
                        if (j === 0) {
                            if (groupInfo.countInGroup === 1) {
                                Instruments.setCell(column, Instruments.bassDrum, 1);
                            }
                            if (groupInfo.countInGroup === groups[groupInfo.group - 1]) {
                                Instruments.setCell(column, Instruments.snareDrum, 1);
                            }
                            if ((groupInfo.countInGroup === 2) && threeBeatGroup) {
                                if (Math.random() > 0.5) {
                                    Instruments.setCell(column, Instruments.bassDrum, 1);
                                } else {
                                    Instruments.setCell(column, Instruments.snareDrum, 1);
                                }
                            }
                        }
                        if ((((j === 3) && (measure.divisions === 4)) || ((j === 2) && (measure.divisions === 3))) &&
                            (Math.random() > 0.4) && (groupInfo.countInGroup === (groups[groupInfo.group - 1] - 1))) {
                            Instruments.setCell(column, Instruments.bassDrum, 1);
                        }
                        if ((j === 1) && (Math.random() > 0.6) && (groupInfo.countInGroup === groups[groupInfo.group - 1])) {
                            Instruments.setCell(column, Instruments.snareDrum, 1);
                        }
                        break;
                    case 9:
                        // Based on the Tsifteteli and the Zeibekiko
                        if ((j === 0) || (j === 2)) {
                            if (j === 0) {
                                Instruments.setCell(column, row1, 1);
                            } else {
                                Instruments.setCell(column, row1, 2);
                            }
                        }
                        if (j === 0) {
                            if (groupInfo.countInGroup === 1) {
                                Instruments.setCell(column, Instruments.bassDrum, 1);
                            }
                            if ((groupInfo.countInGroup === groups[groupInfo.group - 1]) && (Glob.isEven(groupInfo.group) || threeBeatGroup)) {
                                row = Instruments.snareDrum;
                                if (groupInfo.countInGroup === 3) {
                                    if ((Instruments.getCell(0, column - 4, Instruments.snareDrum) > 0) && 
                                    (Instruments.getCell(0, column - 1, Instruments.bassDrum) === 0)) {
                                        if (Math.random() > 0.7) {
                                            if (Math.random() > 0.5) {
                                                row = Instruments.bassDrum;
                                            } else {
                                                row = Instruments.lowTom;
                                            }
                                        }
                                    }
                                }
                                Instruments.setCell(column, row, 1);
                            }
                            if ((groupInfo.countInGroup === 2) && threeBeatGroup) {
                                if (Math.random() > 0.5) {
                                    Instruments.setCell(column, Instruments.bassDrum, 1);
                                } else {
                                    Instruments.setCell(column, Instruments.snareDrum, 1);
                                }
                            }
                        }
                        if (!threeBeatGroup && !Glob.isEven(groupInfo.group) && (j === 2) && ((groupInfo.countInGroup === 1) || (groupInfo.countInGroup === 2))) {
                            if (groupInfo.countInGroup === 1) {
                                bass = ((bassSnareVariation === 0) || (bassSnareVariation === 1));
                            } else {
                                bass = ((bassSnareVariation === 0) || (bassSnareVariation === 2));
                            }
                            if (bass) {
                                Instruments.setCell(column, Instruments.bassDrum, 1);
                            } else {
                                Instruments.setCell(column, Instruments.snareDrum, 1);
                            }
                        }
                        if (Glob.isEven(groupInfo.group) && (j === 3)) {
                            if ((Math.random() > 0.4) && (groupInfo.countInGroup === (groups[groupInfo.group - 1] - 1))) {
                                Instruments.setCell(column, Instruments.bassDrum, 1);
                            }
                            if ((Math.random() > 0.6) && (groupInfo.countInGroup === groups[groupInfo.group - 1])) {
                                Instruments.setCell(column, Instruments.snareDrum, 2);
                            }
                        }
                        break;
                    case 10:
                        // Based on the Tsamikos
                        if (j === 0) {
                            if ((groupInfo.countInGroup === 1) || (groupInfo.countInGroup === 3)) {
                                Instruments.setCell(column, Instruments.bassDrum, 1);
                                Instruments.setCell(column, row1, 1);
                            }
                            if (groupInfo.countInGroup === 2) {
                                if (threeBeatGroup) {
                                    if (Math.random() > 0.6) {
                                        Instruments.setCell(column, Instruments.bassDrum, 1);
                                        Instruments.setCell(column, row1, 1);
                                    } else {
                                        Instruments.setCell(column, Instruments.snareDrum, 1);
                                    }
                                } else {
                                    Instruments.setCell(column, Instruments.snareDrum, 1);
                                }
                            }
                        }
                        if (threeBeatGroup) {
                            if (((j === 3) && (groupInfo.countInGroup === 1)) || ((j === 2) && (groupInfo.countInGroup === 2)) ||
                                ((Math.random() > 0.7) && (j === 2) && (groupInfo.countInGroup === 1))) {
                                Instruments.setCell(column, Instruments.snareDrum, 2);
                            }
                            if ((j === 2) && (groupInfo.countInGroup === 3)) {
                                if (Math.random() > 0.8) {
                                    Instruments.setCell(column, Instruments.bassDrum, 1);
                                } else {
                                    Instruments.setCell(column, Instruments.snareDrum, 2);
                                }
                            }
                        } else {
                            if ((Math.random() > 0.5) && (groupInfo.countInGroup === 1) && (j === 2)) {
                                if (Math.random() > 0.5) {
                                    Instruments.setCell(column + 1, Instruments.bassDrum, 1);
                                } else {
                                    Instruments.setCell(column, Instruments.bassDrum, 1);
                                }
                            }
                            if ((Math.random() > 0.5) && (groupInfo.countInGroup === 2) && (j === 3)) {
                                Instruments.setCell(column, Instruments.snareDrum, 2);
                            }
                        }
                        break;
                    default:
                        break;
                }
                // Variations based on other pattern
                switch (originalPattern) {
                    case 5:
                        if (i === (measure.beats - 1)) {
                            // Erase the whole last beat
                            Instruments.setCell(column, Instruments.closedHiHat, 0);
                            Instruments.setCell(column, Instruments.openHiHat, 0);
                            Instruments.setCell(column, Instruments.rideCymbal, 0);
                            Instruments.setCell(column, Instruments.rideBell, 0);
                            Instruments.setCell(column, Instruments.bassDrum, 0);
                            Instruments.setCell(column, Instruments.snareDrum, 0);
                            if ((j === 0) || (j === 1)) {
                                Instruments.setCell(column, Instruments.snareDrum, 1);
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }

    static createPattern2(groups) {
        let column = 0;
        let count = 0;
        let countsInGroup = 0;
        let instrument = 1;
        let row1 = 0;
        let row2 = 0;

        const measure = Measures.measures[0];

        instrument = Glob.randomInt(1, 2);

        switch (document.getElementById("randomRhythmUseHiHatSelector").value) {
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

        column = 0;
        count = 1;
        for (let i = 0; i < groups.length; i++) {
            let arr = null;
            let data = null;
            let idx = 0;
            countsInGroup = groups[i];
            if (countsInGroup === 2) {
                switch (measure.divisions) {
                    case 1:
                        arr = this.oneDivision2;
                        break;
                    case 2:
                        arr = this.twoDivisions2;
                        break;
                    case 3:
                        arr = this.threeDivisions2;
                        break;
                    case 4:
                        arr = this.fourDivisions2;
                        break;
                    default:
                        break;
                }
            } else {
                switch (measure.divisions) {
                    case 1:
                        arr = this.oneDivision3;
                        break;
                    case 2:
                        arr = this.twoDivisions3;
                        break;
                    case 3:
                        arr = this.threeDivisions3;
                        break;
                    case 4:
                        arr = this.fourDivisions3;
                        break;
                    default:
                        break;
                }
            }
            do {
                idx = Glob.randomInt(0, arr.length - 1);
            } while ((groups.length === 1) && !arr[idx].oneGroup);
            data = arr[idx];
            for (let j = 0; j < data.bassDrum.length; j++) {
                Instruments.setCell(column + j, row1, data.closedHiHat[j]);
                Instruments.setCell(column + j, Instruments.snareDrum, data.snareDrum[j]);
                Instruments.setCell(column + j, Instruments.bassDrum, data.bassDrum[j]);
            }
            count += countsInGroup;
            column = (count - 1) * measure.divisions;
        }

        // On count 1 alway a bass drum and never a snare drum
        Instruments.setCell(0, Instruments.snareDrum, 0);
        Instruments.setCell(0, Instruments.bassDrum, 1);
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