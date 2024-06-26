let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/DP/13398.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = +input.shift();
const board = input[0].split(" ").map(Number);
const dp = Array.from({ length: 2 }, () => Array(n).fill(0));
dp[0][0] = board[0];
dp[1][0] = board[0];

for (let i = 1; i < n; i++) {
  dp[0][i] = Math.max(dp[0][i - 1] + board[i], board[i]);
  dp[1][i] = Math.max(dp[0][i - 1], dp[1][i - 1] + board[i]);
}

console.log(Math.max(...dp[0], ...dp[1]));
