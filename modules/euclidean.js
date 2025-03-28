class Euclidean {
    static lengthOfLongestRow(arr) {
        let result = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length > result) {
                result = arr[i].length;
            }
        }
        return result;
    }

    static pattern(n, k) {
        let arr = [];
        let column = 0;
        let columns = 0;
        let n1 = 0;
        let n2 = 0;
        let n3 = 0;
        let rest = 0;
        let result = "";
        let s1 = "";
        let s2 = "";

        if (k === 0) return "0".repeat(n);
        if (k >= n) return "1".repeat(n);

        s1 = "";
        for (let i = 0; i < n; i++) {
            if (i < k) {
                s1 += "1";
            } else {
                s1 += "0";
            }
        }
        arr.push(s1);
        n1 = n;
        n2 = k;
        do {
            rest = n1 % n2;
            column = (this.lengthOfLongestRow(arr) - n2);
            n3 = arr.length;
            for (let j = 0; j < n3; j++) {
                if (column < arr[j].length) {
                    s1 = arr[j].substring(0, column);
                    s2 = arr[j].substring(column);
                    arr[j] = s1;
                    arr.push(s2);
                }
                n1 = n2;
                n2 = rest;
            }
        } while (rest >= 2);
        result = "";
        columns = this.lengthOfLongestRow(arr);
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < arr.length; r++) {
                if (c < arr[r].length) {
                    result += arr[r][c];
                }
            }
        }
        return result;
    }

}

export { Euclidean };