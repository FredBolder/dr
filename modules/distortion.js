class Distortion {
    static curves = [];

    //return new Float32Array([-1, -1, -1, 0, 1, 1, 1]);

    static curve01(k) {
        const n_samples = 44100;
        const curve = new Float32Array(n_samples);
        const deg = Math.PI / 180;

        for (let i = 0; i < n_samples; i++) {
            const x = (i * 2) / n_samples - 1;
            curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
        }
        return curve;
    }

    static init() {
        this.curves = [];
        this.curves.push(this.curve01(10));
        this.curves.push(this.curve01(25));
        this.curves.push(this.curve01(50));
        this.drawCurve(1);
    }

    static drawCurve(n) {
        // const curve = document.getElementById("curve");
        // const curveContext = curve.getContext('2d');
        // curveContext.beginPath();
        // curveContext.fillStyle = "white";
        // curveContext.clearRect(0, 0, curve.width, curve.height);
        // curveContext.beginPath();
        // curveContext.fillStyle = "white";
        // curveContext.fillRect(0, 0, curve.width, curve.height);
        // curveContext.beginPath();
        // curveContext.strokeStyle = "gray";
        // curveContext.moveTo(0, curve.height / 2);
        // curveContext.lineTo(curve.width, curve.height / 2);
        // curveContext.stroke();
        // curveContext.beginPath();
        // curveContext.strokeStyle = "gray";
        // curveContext.moveTo(curve.width / 2, 0);
        // curveContext.lineTo(curve.width / 2, curve.height);
        // curveContext.stroke();

        // const points = this.curves[n];
        // const scaleX = curve.width / points.length;
        // const scaleY = curve.height / 2;
        // curveContext.beginPath();
        // curveContext.lineWidth = 2;
        // curveContext.strokeStyle = "black";
        // console.log(points);
        // for (let i = 0; i < points.length; i++) {
        //     const x = i * scaleX;
        //     const y = curve.height - ((points[i] * scaleY) + (curve.height / 2));
        //     if (i === 0) {
        //         curveContext.moveTo(x, y);
        //     } else {
        //         curveContext.lineTo(x, y);
        //     }
        // }
        // curveContext.stroke();
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