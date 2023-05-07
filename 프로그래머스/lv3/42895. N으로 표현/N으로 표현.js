function solution(N, number) {
    let answer = 0;
    /* 길이가 8인 배열을 만들고 각각의 인덱스 안에 Set 객체 생성(중복을 줄이고, 데이터를 빠르게 찾기 위함) */
    let dp = new Array(8).fill().map(() => new Set());
    
    /* 배열의 길이 만큼 순회 */
    for(let i=0; i<dp.length; i++) {
        dp[i].add(Number(String(N).repeat(i+1))) // 각 인덱스에 문자열 N을 합친 수를 Number로 감싸서 add
        for(let j=0; j<i; j++) { // 각 인덱스 번호 만큼 N을 반복하기 위함
            for(let n of dp[j]) { // ex) i가 3이라면 -> n=dp[0], m=dp[2] / n=dp[1], m=dp[1] / n=dp[2], m=dp[0] => n과 m에 1씩 더하면 더 이해하기 쉬움   
                for(let m of dp[i-j-1]) {
                    dp[i].add(n * m);
                    dp[i].add(Math.floor(n / m));
                    dp[i].add(n + m);
                    dp[i].add(n - m);
                }
            }
        }
        if(dp[i].has(number)) return i+1; // dp[i]에 찾는 number가 있다면 그 인덱스에 1을 더하여 반환
    };
    
    return -1;
}