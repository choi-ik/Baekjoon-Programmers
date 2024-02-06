let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/11052.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const card = input[0].split(" ").map(Number);
const dp = Array(N + 1).fill(0);
const Pi = Array(N + 1).fill(0);

for (let i = 0; i < N; i++) Pi[i + 1] = card[i];

for (let i = 0; i <= N; i++) {
  for (let j = 0; j <= i; j++) {
    dp[i] = Math.max(dp[i], dp[i - j] + Pi[j]);
  }
}

console.log(dp[dp.length - 1]);
