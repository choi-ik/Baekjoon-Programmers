let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();
const box = input.shift().split(" ").map(e => +e);
let dp = Array.from({length: N}, () => 1);

/* 
    box 배열을 순회하며 i에 해당하는 box 값보다 작은 값이 있고, 그 값에 해당하는 dp 값이 dp[i] 값 보다 크다면 dp[i]를 큰 값으로 업데이트해줌
    dp[i] 값 보다 크지 않다면 그대로 자기 자신의 값인 1을 가지고 있음.
*/
for (let i = 1; i < box.length; i ++) {
    for (let j = i - 1; j >= 0; j --) { 
        if (box[i] > box[j]) {
            if (dp[j] + 1 > dp[i]) dp[i] = dp[j] + 1;
        }
    }
};

console.log(Math.max(...dp))