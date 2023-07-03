let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();
/*  사자가 한마리도 없을 떄도 한가지 경우로 친다고 했으니 N이 0이어도 1
    N이 1일 때는 3가지 경우의 수가 있어 N이 0과 1일때 경우의 수를 미리 DP에 집어넣었음.
*/
let dp = [1, 3]; 

for (let i = 2; i <= N; i ++) {
    dp[i] = (dp[i-2] + dp[i-1] * 2) % 9901;
}

console.log(dp[N])