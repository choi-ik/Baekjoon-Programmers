let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();
let dp = Array.from({length: N}, () => Array.from({length: 10}, () => 0));
let mod = 10007;

for (let i = 0; i < 10; i ++) {
    dp[0][i] = 1; 
};


for (let i = 1; i < N; i ++) {
    for (let j = 0; j < 10; j ++) {
        for (let k = 0; k <= j; k ++) {
            dp[i][j] += dp[i-1][k] % mod
        };
    };
};

let sum = dp[N-1].reduce((acc, cur) => acc + cur, 0)
console.log(sum % mod)