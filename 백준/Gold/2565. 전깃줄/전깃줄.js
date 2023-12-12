let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/DP/2565.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const twinTower = input.map((e) => e.split(" ").map(Number));

twinTower.sort((a, b) => a[0] - b[0]);

const dp = Array.from({ length: N }, () => 1);

// 최장 증가 부분 수열
for (let i = 1; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (twinTower[i][1] > twinTower[j][1]) dp[i] = Math.max(dp[i], dp[j] + 1);
  }
}

console.log(N - Math.max(...dp));
