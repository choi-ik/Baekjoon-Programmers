let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();

for (let i = 0 ; i < N; i ++) {
    let cnt = +input.shift();
    let stikers = [];

    // dp 배열은 이전 대각선, 전전 대각선 두 곳을 비교해야 하기 때문에 +2 하여 0으로 채워준다.
    let dp = Array.from({length: 2}, () => Array.from({length: cnt + 2}, () => 0));

    
    for (let i = 0; i < 2; i ++) {
        stikers.push(input.shift().split(" ").map(e => +e));

        for (let j = 2; j < 2 + stikers[i].length; j ++) {
            dp[i][j] = stikers[i][j - 2];
        }
    };
    

    for (let i = 2; i < 2 + cnt; i ++) {
        for (let j = 0; j < 2; j ++) {
            if (j === 0) {
                // [0,0] 번 인덱스에 존재하는 스티커의 값을 구하기 위해 바로이전 대각선과 전전 대각선 값을 더한 값중 큰 값을 대입
                dp[j][i] = Math.max(dp[j+1][i-2] + dp[j][i], dp[j+1][i-1] + dp[j][i])
            }
            else if (j === 1) {
                // [1,0] 번 인덱스에 존재하는 스티커의 값을 구하기 위해 바로이전 대각선과 전전 대각선 값을 더한 값중 큰 값을 대입
                dp[j][i] = Math.max(dp[j-1][i-2] + dp[j][i], dp[j-1][i-1] + dp[j][i]);
            }
            
        };
    }
   
    console.log(Math.max(dp[0][dp[0].length-1], dp[1][dp[1].length-1]));
};