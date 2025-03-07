class Distortion {
    static curves = [];

    static calcX(i, n) {
        return (i * 2) / n - 1;
    }

    static curve01(k) {
        const n_samples = 44100;
        const curve = new Float32Array(n_samples);
        const deg = Math.PI / 180;

        for (let i = 0; i < n_samples; i++) {
            const x = this.calcX(i, n_samples);
            curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
        }
        return curve;
    }

    static curve02() {
        return new Float32Array([-0.5, -0.5, -0.5, -0.5, 0, 0.5, 0.5, 0.5, 0.5]);
    }

    static curve03(n) {
        const n_samples = 44100;
        const curve = new Float32Array(n_samples);

        for (let i = 0; i < n_samples; i++) {
            const x = this.calcX(i, n_samples);
            switch (n) {
                case 2:
                    curve[i] = (2 * Math.pow(x, 2)) - 1;
                    break;
                case 3:
                    curve[i] = (4 * Math.pow(x, 3)) - (3 * x);
                    break;
                case 4:
                    curve[i] = (8 * Math.pow(x, 4)) - (8 * Math.pow(x, 2)) + 1;
                    break;
                case 5:
                    curve[i] = (16 * Math.pow(x, 5)) - (20 * Math.pow(x, 3)) + (5 * x);
                    break;
                case 6:
                    curve[i] = (32 * Math.pow(x, 6)) - (48 * Math.pow(x, 4)) + (18 * Math.pow(x, 2)) - 1;
                    break;
                case 7:
                    curve[i] = (64 * Math.pow(x, 7)) - (112 * Math.pow(x, 5)) + (56 * Math.pow(x, 3)) - (7 * x);
                    break;
                case 8:
                    curve[i] = (128 * Math.pow(x, 8)) - (256 * Math.pow(x, 6)) + (160 * Math.pow(x, 4)) - (32 * Math.pow(x, 2)) + 1;
                    break;
                case 9:
                    curve[i] = (256 * Math.pow(x, 9)) - (576 * Math.pow(x, 7)) + (432 * Math.pow(x, 5)) - (120 * Math.pow(x, 3)) + (9 * x);
                    break;
                case 10:
                    curve[i] = (512 * Math.pow(x, 10)) - (1280 * Math.pow(x, 8)) + (1120 * Math.pow(x, 6)) - (400 * Math.pow(x, 4)) + (50 * Math.pow(x, 2)) - 1;
                    break;
                case 11:
                    curve[i] = (1024 * Math.pow(x, 11)) - (2816 * Math.pow(x, 9)) + (2816 * Math.pow(x, 7)) - (1232 * Math.pow(x, 5)) + (220 * Math.pow(x, 3)) - (11 * x);
                    break;
                default:
                    curve[i] = x;
                    break;
            }
        }
        return curve;
    }

    static init() {
        this.curves = [];
        this.curves.push(this.curve01(10));
        this.curves.push(this.curve01(25));
        this.curves.push(this.curve01(50));
        this.curves.push(this.curve02());
        this.curves.push(this.curve03(3));
        this.curves.push(this.curve03(5));
        this.curves.push(this.curve03(7));
        this.curves.push(this.curve03(9));
        this.curves.push(this.curve03(11));
        // Uncomment the line below and <canvas id="curve"></canvas> in index.html to see a curve
        //this.drawCurve(this.curves.length - 1);
    }

    static drawCurve(n) {
        const curve = document.getElementById("curve");
        const curveContext = curve.getContext('2d');
        curveContext.beginPath();
        curveContext.fillStyle = "white";
        curveContext.clearRect(0, 0, curve.width, curve.height);
        curveContext.beginPath();
        curveContext.fillStyle = "white";
        curveContext.fillRect(0, 0, curve.width, curve.height);
        curveContext.beginPath();
        curveContext.strokeStyle = "gray";
        curveContext.moveTo(0, curve.height / 2);
        curveContext.lineTo(curve.width, curve.height / 2);
        curveContext.stroke();
        curveContext.beginPath();
        curveContext.strokeStyle = "gray";
        curveContext.moveTo(curve.width / 2, 0);
        curveContext.lineTo(curve.width / 2, curve.height);
        curveContext.stroke();

        const points = this.curves[n];
        const scaleX = curve.width / (points.length - 1);
        const scaleY = curve.height / 2;
        curveContext.beginPath();
        curveContext.lineWidth = 2;
        curveContext.strokeStyle = "black";
        console.log(points);
        for (let i = 0; i < points.length; i++) {
            const x = i * scaleX;
            const y = curve.height - ((points[i] * scaleY) + (curve.height / 2));
            if (i === 0) {
                curveContext.moveTo(x, y);
            } else {
                curveContext.lineTo(x, y);
            }
        }
        curveContext.stroke();
    }

    static intToDistortion(n) {
        if (n === 0) {
            return "OFF"
        } else {
            return n.toString();
        }
    }

}

export { Distortion };