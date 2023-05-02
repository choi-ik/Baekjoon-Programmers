function solution(number, k) {
    let answer = "";
    let idx = 0;
    let i = 0;
    let max = 0;
    let kCopy = number.length - k;
 
    while(kCopy > 0) {
        if(idx <= number.length - kCopy) {
            if(max < Number(number[idx]) && number[idx] === "9") {
                answer += String(number[idx]);
                max = 0;
                i = idx;
                idx++;
                kCopy--;
            } else if(max < Number(number[idx])) {
                max = Number(number[idx]);
                i = idx;
                idx++;
            } else {
                idx++;
            }
        } else {
            answer += String(max);
            max = 0;
            idx = i+1;
            kCopy--;
        }
    };
    
    return answer;
}