function solution(s) {
    let answer = 1;
    let dp = Array.from({length: s.length}, () => Array.from({length: s.length}, () => false));
    
    // 자기 자신은 팰린드롬임.
    for (let i = 0; i < s.length; i ++) {
        dp[i][i] = true;
    };
    
    // 길이가 2인 팰린드롬 있는지 검사
    for (let i = 0; i < s.length - 1; i ++) {
        if (s[i] === s[i + 1]) {
            answer = 2;
            dp[i][i + 1] = true;
        }
    };

    // 길이가 3인 팰린드롬이 있는지부터 검사 시작
    for (let i = 3; i <= s.length; i ++) {
        for (let start = 0; start <= s.length - i; start ++) {
            const end = start + i - 1;
            
            // 내부 팰린드롬 여부 검사
            if (s[start] === s[end] && dp[start + 1][end - 1]) {
                dp[start][end] = true;
                
                answer = Math.max(answer, i);
            };
        };
    };
   
    return answer;
}