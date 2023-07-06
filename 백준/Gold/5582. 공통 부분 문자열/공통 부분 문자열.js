let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const STR = input.slice(0, 2).map(e => " "+e.trim());
let dp = Array.from({length: STR[0].length + 1}, () => Array.from({length: STR[1].length + 1}, () => 0));
let minValue = 0;   // 값 비교를 위한 최솟값

for (let i = 1; i < STR[0].length; i ++) {
    for (let j = 1; j < STR[1].length; j ++) {
        // 두 알파벳이 같다면 왼쪽 위 대각선 값에 +1 한 값을 대입
        if (STR[0][i] === STR[1][j]) dp[i][j] = dp[i-1][j-1] + 1
        if (dp[i][j] > minValue) minValue = dp[i][j];
    };
};

console.log(minValue)
