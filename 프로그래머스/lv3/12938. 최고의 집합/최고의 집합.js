function solution(n, s) {
    let answer = [];
    
    while (n !== 0) {
        let temp = Math.floor(s / n);
        
        // 최고 집합이 존재하지 않는 경우
        if (temp === 0) return [-1];
        
        s -= temp;
        answer.push(temp);
        n --;
    };
    
    return answer;
}