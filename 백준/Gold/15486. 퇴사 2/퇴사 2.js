// 오늘 상담을 시작해 퇴사전까지 벌 수 있는 돈 +

let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/DP/15486.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const T = [0];
const P = [0];
const dp = Array.from({ length: N + 2 }, () => 0);

input.forEach((e) => {
  const [t, p] = e.split(" ").map(Number);

  T.push(t);
  P.push(p);
});

for (let i = N; i >= 1; i--) {
  if (i + T[i] > N + 1) {
    dp[i] = dp[i + 1];
  } else {
    // 오늘 상담을 시작했을 때 받을 수 있는 돈과 이미 상담을 진행하여 받은 돈을 더하고 다음날의 돈과 비교하여 최대한 많은 돈을 벌어야 함
    dp[i] = Math.max(dp[i + 1], P[i] + dp[i + T[i]]);
  }
}

console.log(dp[1]);
