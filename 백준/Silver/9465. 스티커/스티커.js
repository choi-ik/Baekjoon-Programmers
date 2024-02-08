let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/DP/9465.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
const n = +input.shift();

for (let i = 0; i < n; i++) {
  const N = +input[3 * i];
  const arr = [
    input[3 * i + 1].split(" ").map(Number),
    input[3 * i + 2].split(" ").map(Number),
  ];

  const dp = Array.from({ length: 2 }, (_, k) => [0, 0, ...arr[k]]);

  for (let i = 2; i < N + 2; i++) {
    for (let j = 0; j < 2; j++) {
      if (j === 0) {
        dp[j][i] = Math.max(
          dp[j + 1][i - 1] + dp[j][i],
          dp[j + 1][i - 2] + dp[j][i]
        );
      } else {
        dp[j][i] = Math.max(
          dp[j - 1][i - 1] + dp[j][i],
          dp[j - 1][i - 2] + dp[j][i]
        );
      }
    }
  }

  console.log(Math.max(dp[0][N + 1], dp[1][N + 1]));
}
