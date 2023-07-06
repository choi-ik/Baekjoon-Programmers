let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, K] = input.shift().split(" ").map(e => +e);
const coin = input.slice(0, N).map(e => +e);
let dp = Array.from({length: K+1}, () => Infinity);
dp[0] = 0;

for (let i = 0 ; i < N; i ++) {
    for (let j = coin[i]; j < K + 1; j ++) {
        dp[j] = Math.min(dp[j], dp[j - coin[i]] + 1);
    };
};

if (dp[K] === Infinity) console.log(-1);
else console.log(dp[K])