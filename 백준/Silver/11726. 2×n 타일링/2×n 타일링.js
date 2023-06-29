let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();
let dp = [0, 1, 2];
let mod = 10007;

for (let i = 3; i <= N; i ++) {
    dp.push((dp[i-2] + dp[i-1]) % mod);
}

console.log(dp[N] % mod)