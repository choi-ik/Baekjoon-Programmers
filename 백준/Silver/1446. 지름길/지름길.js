let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/DP/1446.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, D] = input.shift().split(" ").map(Number);
const dist = input.map((item) => item.split(" ").map(Number));
let dp = Array.from({ length: D + 1 }, (_, i) => i);

dist.sort((a, b) => a[1] - b[1]);

dist.forEach(([s, e, shortcut]) => {
  // 도착 지점이 고속도로의 끝지점 보다 작고, 출발 지점에서부터 지름길을 더한 거리와 도착지 거리를 비교
  if (e <= D) dp[e] = Math.min(dp[s] + shortcut, dp[e]);

  // 출발지점부터 거리 1씩 올려가며 고속도로 종점까지 초기화
  for (let i = s + 1; i <= D; i++) {
    dp[i] = Math.min(dp[i - 1] + 1, dp[i]);
  }
});

console.log(dp[D]);
