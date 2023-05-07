function solution(N, number) {
    let answer = 0;
    let dp = new Array(8).fill().map(() => new Set());
    
    for(let i=0; i<8; i++) {
        dp[i].add(Number(`${N}`.repeat(i+1)))
        for(let j=0; j<i; j++) {
            for(let n of dp[j]) {
                for(let m of dp[i-j-1]) {
                    dp[i].add(n * m);
                    dp[i].add(Math.floor(n / m));
                    dp[i].add(n + m);
                    dp[i].add(n - m);
                }
            }
        }
        if(dp[i].has(number)) return i+1;
    };
    
    console.log(dp)
    return -1;
}