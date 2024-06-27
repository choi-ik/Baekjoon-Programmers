let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/Greedy/1082.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = +input.shift();
const nums = input.shift().split(" ").map(Number);
const m = +input.shift();
const dp = Array.from({ length: m + 1 }, () => BigInt(-1));

for (let i = n - 1; i >= 0; i--) {
  const p = BigInt(nums[i]);

  for (let j = p; j < m + 1; j++) {
    const newValue = BigInt(dp[j - p]) * BigInt(10) + BigInt(i);
    dp[j] = dp[j] > newValue ? dp[j] : newValue;
    dp[j] = dp[j] > BigInt(i) ? dp[j] : BigInt(i);
  }
}

console.log(BigInt(dp[m]).toString());
