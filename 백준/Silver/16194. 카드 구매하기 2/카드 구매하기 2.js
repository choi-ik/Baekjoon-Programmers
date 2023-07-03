let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();
let card = [0, ...input.shift().split(" ").map(e => +e)];
let dp = Array.from({length: N+1}, () => Infinity);
// 0번째 인덱스에 0 이 들어가지 않으면 i=1, j=1 일때, dp[0] + card[1] 계산 때 무한대 값이 들어가서 모든 배열에 무한대 값이 들어가기 때문.
dp[0] = 0;

for (let i = 1; i <= N; i ++) {
    for (let j = 1; j <= i; j ++) {
        dp[i] = Math.min(dp[i], dp[i - j] + card[j]);
    }
}

console.log(dp[N])