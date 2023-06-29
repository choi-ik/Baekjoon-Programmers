let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();

let dp = Array.from({length: N+1}, () => Array.from({length: 10}, () => 0));
let temp = 1000000000;
let sum = 0;

for (let i = 1; i < 10; i ++) {
    dp[1][i] = 1;
};


for (let i = 2; i <= N; i ++) {
    for (let j = 0; j < 10; j ++) {
        if (j === 0) {      // 가장 마지막 숫자가 0 이라면 앞에 오는 숫자가 1일 수 밖에 없음. 
            dp[i][j] = dp[i-1][1] % temp;
        }
        else if (j === 9) {     // 가장 마지막 숫자가 9라면 계단수는 8만 존재
            dp[i][j] = dp[i-1][8] % temp;
        }
        else {      // 가장 마지막 숫자가 1~8사이라면 앞에 오는 숫자는 현재 숫자의 - 1과 + 1한 숫자이다.
            dp[i][j] = (dp[i-1][j-1] + dp[i-1][j+1]) % temp;
        }
    };
};

sum = dp[N].reduce((acc, cur) => acc + cur, 0);
console.log(sum % temp)
