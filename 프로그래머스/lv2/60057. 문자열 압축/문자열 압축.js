function solution(s) {
    let minLength = s.length;
    
    let i = 0;
    let j = 1;
    while (i < Math.floor(s.length / 2)) {
        let arr = "";
        let count = 1;
        let str = s.slice(0, j);

        for (let k = j; k <= s.length + j; k += j) {
            if (str === s.slice(k, k + j)) count ++;
            else {
                if (count === 1) {
                    arr += str;
                    str = s.slice(k, k + j);
                }
                else {
                    arr += count + str;
                    str = s.slice(k, k + j);
                    count = 1;
                }
            }
        };

        minLength = Math.min(minLength, arr.length);
        
        i++;
        j++;
    }
    

    return minLength;
}