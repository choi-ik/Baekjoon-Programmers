function solution(n, left, right) {
    var answer = [];
    let str = "";
    
    for (let i = left; i <= right; i ++) {
        if (i >= n) {
            let temp = Math.floor(i / n);
            if (temp >= i % n) answer.push(temp + 1)
            else answer.push((i % n) + 1)
        }
        else answer.push(i + 1)
    };

    return answer;
}