let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, K] = input.shift().split(" ").map(e => +e);
// 행은 1부터 시작하기 위해 N+1, 열도 1부터 시작하기 위해 K+1.
let dp = Array.from({length: N+1}, () => Array.from({length: K+1}, () => 0));   // [가방 무게, 가치]
const W = [0];   // 무게
const V = [0];   // 가치


for (let i = 0; i < N; i ++) {
    let temp = input[i].split(" ").map(e => +e);
    W.push(temp[0]);
    V.push(temp[1]);
};

for (let i = 1; i <= N; i ++) { // i = 현재 넣을지 말지 보고있는 물건.
    for (let j = 1; j <= K; j ++) { // j = 현재 배낭의 무게고 현재 물건 i의 무게부터 끝까지 순환해본다.

        if (j - W[i] >= 0) dp[i][j] = Math.max(dp[i-1][j-W[i]] + V[i], dp[i-1][j]);
        else dp[i][j] = dp[i-1][j];
    }
}

console.log(dp[N][K]);