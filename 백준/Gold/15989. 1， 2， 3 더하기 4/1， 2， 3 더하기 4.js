let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/DP/15989.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = +input.shift();
const tc = input.map(Number);
const nums = [1, 2, 3];

tc.forEach((e) => {
  const dp = Array.from({ length: e + 1 }, () => 0);
  dp[0] = 1;

  nums.forEach((num) => {
    for (let i = num; i <= e; i++) {
      dp[i] = dp[i] + dp[i - num];
    }
  });

  console.log(dp[e]);
});
