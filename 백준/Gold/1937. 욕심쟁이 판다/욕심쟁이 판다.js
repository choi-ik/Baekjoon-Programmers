let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/DFS/1937.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const forest = input.map((e) => e.split(" ").map(Number));
const dp = Array.from({ length: N }, () => Array(N).fill(0));
const dx = [1, -1, 0, 0];
const dy = [0, 0, -1, 1];
let result = 0;

const dfs = (xy) => {
  const [x, y] = xy;

  if (dp[x][y] > 0) {
    return dp[x][y];
  }

  dp[x][y] = 1;

  for (let i = 0; i < 4; i++) {
    const nx = dx[i] + x;
    const ny = dy[i] + y;

    if (
      nx < 0 ||
      nx >= N ||
      ny < 0 ||
      ny >= N ||
      forest[nx][ny] <= forest[x][y]
    )
      continue;

    dp[x][y] = Math.max(dp[x][y], dfs([nx, ny]) + 1);
  }

  return dp[x][y];
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    dfs([i, j], 1);
    result = Math.max(result, dp[i][j]);
  }
}

console.log(result);
