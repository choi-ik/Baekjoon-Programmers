let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();
const wine = input.slice(0, N).map(e => +e)
let dp = [wine[0]];

for (let i = 0; i < wine.length; i ++) {
    // 1번째는 0번쪠와 1번째 와인의 양을 합한 값.
    if (i === 1) dp[i] = wine[i-1] + wine[i];
    // 2번째는 2번째 + 0번째, 2번째 + 1번째, 0번째 + 1번째 중 큰 값.
    if (i === 2) dp[i] = Math.max(wine[i-2] + wine[i], wine[i-1] + wine[i], dp[i-1]);
    // 현재 포도주와 전전 포도주를 마시고 이전 포도주 마시지 않음,
    // 현재 포도주와 이전 포도주 마시고 전전포도주는 마시지 않음, 
    // 현재 포도주를 마시지 않음.
    if (i >= 3) {
        dp[i] = Math.max(dp[i-2] + wine[i], dp[i-3] + wine[i-1] + wine[i], dp[i-1])
    }
};

console.log(dp[dp.length - 1]);


