let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/DFS/1520.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [M, N] = input.shift().split(" ").map(Number);
const map = input.map((e) => e.split(" ").map(Number));
const dp = Array.from({ length: M }, () => Array(N).fill(-1));
const dx = [1, -1, 0, 0];
const dy = [0, 0, -1, 1];

const dfs = (x, y) => {
  if (dp[x][y] > -1) return dp[x][y];
  if (x === M - 1 && y === N - 1) return 1;

  dp[x][y] = 0;

  for (let i = 0; i < 4; i++) {
    const nx = dx[i] + x;
    const ny = dy[i] + y;

    if (nx < 0 || nx >= M || ny < 0 || ny >= N || map[x][y] <= map[nx][ny])
      continue;

    dp[x][y] += dfs(nx, ny);
  }

  return dp[x][y];
};

console.log(dfs(0, 0));
