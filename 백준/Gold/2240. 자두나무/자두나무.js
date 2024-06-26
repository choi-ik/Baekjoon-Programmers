let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/DP/2240.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [T, W] = input.shift().split(" ").map(Number);
const jaduArr = input.map(Number);
const DP = Array.from({ length: T + 1 }, () => Array(W + 1).fill(0));

for (let i = 1; i < T + 1; i++) {
  // 1번 나무에서 한 번도 움직이지 않고 1번 나무에서 자두가 떨어질경우
  if (jaduArr[i - 1] === 1) DP[i][0] = DP[i - 1][0] + 1;
  // 1번 나무에서 한 번도 움직이지 않고 2번 나무에서 자두가 떨어질경우
  else DP[i][0] = DP[i - 1][0];

  // 1번 이상 움직이는 경우에 대한 검색
  for (let j = 1; j < W + 1; j++) {
    // i초에 2번 나무에서 자두가 떨어지고 현재 2번 나무에 위치
    if (jaduArr[i - 1] === 2 && j % 2 === 1) {
      DP[i][j] = Math.max(DP[i - 1][j - 1], DP[i - 1][j]) + 1;
    }
    // i초에 1번 나무에서 자두가 떨어지고 현재 1번 나무에 위치
    else if (jaduArr[i - 1] === 1 && j % 2 === 0) {
      DP[i][j] = Math.max(DP[i - 1][j - 1], DP[i - 1][j]) + 1;
    }
    // i초에 자두가 떨어지는 나무와 현재 위치가 다를 경우
    else {
      DP[i][j] = Math.max(DP[i - 1][j - 1], DP[i - 1][j]);
    }
  }
}

console.log(Math.max(...DP[T]));
