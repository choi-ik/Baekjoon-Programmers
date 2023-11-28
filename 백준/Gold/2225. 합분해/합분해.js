let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/DP/2225.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);

const dp = [];

// dp 초기화
for (let i = 0; i <= K; i++) {
  dp[i] = Array(N + 1).fill(i === 1 ? 1 : 0);
}

for (let i = 1; i <= K; i++) {
  dp[i][0] = 1;
}

// dp 누적 경우의 수 초기화
for (let i = 1; i <= K; i++) {
  for (let j = 1; j <= N; j++) {
    dp[i][j] = (dp[i][j - 1] + dp[i - 1][j]) % 1000000000;
  }
}

// K가 1자리로 이루어져있다면 무조건 1
if (K === 1) console.log(1);
// N이 1이라 0과 1로만 이루어져 있다면 K개의 개수만큼의 경우의 수가 나옴
else if (N === 1) console.log(K);
// 짝수 일 경우 중앙 값으로 N을 만들 수 있기에 + 1하여 출력
else console.log(dp[K][N]);
