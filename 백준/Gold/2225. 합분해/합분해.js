let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/DP/2225.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, k] = input[0].split(" ").map(Number);
const dp = Array.from({ length: k }, () => new Array(n + 1).fill(1));

for (let i = 1; i < dp.length; i++) {
  for (let j = 1; j < dp[i].length; j++) {
    dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % 1000000000;
  }
}
console.log(dp[dp.length - 1].at(-1));
