let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/DP/9084.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const tc = Array.from({ length: N }, () => []);

for (let i = 0; i < N; i++) {
  const coins = input[i * 3 + 1].split(" ").map(Number);
  const hap = +input[i * 3 + 2];

  tc[i] = [coins, hap];
}

tc.forEach((e) => {
  const [coins, hap] = e;
  const dp = Array.from({ length: hap + 1 }, () => 0);
  dp[0] = 1;

  coins.forEach((coin) => {
    for (let i = coin; i < dp.length; i += 1) {
      dp[i] = dp[i] + dp[i - coin];
    }
  });

  console.log(dp[dp.length - 1]);
});
