function solution(n, money) {
    let dp = new Array(n + 1).fill(0);
    dp[0] = 1; 
    
    // 점화식 dp[i] = dp[i] + dp[i - 현재 동전] / i는 현재 동전부터 시작
    money.forEach((e) => {
        for (let i = e; i < n + 1; i ++) {
            dp[i] = dp[i] + dp[i - e]; 
        }
    });
    
    
    return dp[n];
};
