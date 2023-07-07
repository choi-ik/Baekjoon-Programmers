function solution(n, k) {
    var answer = 0;
    let prime = n.toString(k)
    let num = "";
    
    
    for (let i = 0; i < prime.length; i ++) {
        if (+prime[i] > 0) num += prime[i];
        
        if (+prime[i] === 0 || i === prime.length - 1) {
            if (+num > 1) {
                if (primeNum(+num)) answer ++;
            }
            // 조건 검사 후 num, idx 초기화
            num = "";
        }
    };

    
    // 소수 판별 함수
    function primeNum(n) {
        if (n === 2) return true;
        for (let i = 2; i <= Math.sqrt(n); i ++) {
            if (n % i === 0) return false;
        }
        
        return true;
    };
    
    return answer;
}