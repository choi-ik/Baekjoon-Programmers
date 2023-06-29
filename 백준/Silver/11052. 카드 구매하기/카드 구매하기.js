let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();
const card = [0, ...input.shift().split(" ").map(e => +e)];
let dp = Array.from({length: N + 1}, () => 0);


for (let i = 1; i < card.length; i ++) {
    for (let j = 1; j <= i; j ++) {
        // 1 ~ n장의 카드를 뽑을 때 뽑을 수 있는 경우의 수를 모두 구해 그 중 가장 큰 값을 dp에 넣어 dp[N]은 가장 큰 값이 들어가게 한다.
        dp[i] = Math.max(dp[i], dp[i-j] + card[j])
    };
};

console.log(dp[N])