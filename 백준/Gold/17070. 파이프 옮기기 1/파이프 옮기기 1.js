let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/DP/17070.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const board = input.map((e) => e.split(" ").map(Number));
// 0: 가로, 1: 세로, 2: 대각선
const dp = Array.from({ length: 3 }, () =>
  Array.from({ length: N }, () => Array(N).fill(0))
);

dp[0][0][1] = 1;
for (let i = 2; i < N; i++) {
  if (board[0][i] === 0) {
    dp[0][0][i] = dp[0][0][i - 1];
  }
}

for (let i = 1; i < N; i++) {
  for (let j = 1; j < N; j++) {
    // 대각선으로 갈 수 있을 경우
    if (board[i][j] === 0 && board[i - 1][j] === 0 && board[i][j - 1] === 0) {
      dp[2][i][j] =
        dp[0][i - 1][j - 1] + dp[1][i - 1][j - 1] + dp[2][i - 1][j - 1];
    }

    if (board[i][j] === 0) {
      dp[0][i][j] = dp[0][i][j - 1] + dp[2][i][j - 1];
      dp[1][i][j] = dp[1][i - 1][j] + dp[2][i - 1][j];
    }
  }
}

let result = 0;
for (let i = 0; i < 3; i++) {
  result += dp[i][N - 1][N - 1];
}

console.log(result);
