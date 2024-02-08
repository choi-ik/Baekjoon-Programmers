let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/DP/2156.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const arr = [0, 0, 0];
input.forEach((e) => arr.push(Number(e)));

const dp = [...arr];

for (let i = 3; i < N + 3; i++) {
  dp[i] = Math.max(
    arr[i] + arr[i - 1] + dp[i - 3],
    arr[i] + dp[i - 2],
    dp[i - 1]
  );
}
console.log(dp[dp.length - 1]);
