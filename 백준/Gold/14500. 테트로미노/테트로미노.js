let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/14500.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const map = [];
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

input.forEach((e) => {
  map.push(e.split(" ").map(Number));
});

// ㅗ, ㅓ, ㅏ, ㅜ 모양
const kx = [
  [0, 0, 0, 1],
  [0, 1, 2, 1],
  [0, 0, 0, -1],
  [0, -1, 0, 1],
];
const ky = [
  [0, 1, 2, 1],
  [0, 0, 0, 1],
  [0, 1, 2, 1],
  [0, 1, 1, 1],
];

const visit = Array.from({ length: N }, () => Array(M).fill(true));
let result = 0;

// 4번 돌아 도형 하나 만들어지면 점수 구함
function dfs(x, y, sum, depth) {
  if (depth === 4) {
    result = Math.max(result, sum);
    return;
  }

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
      if (visit[nx][ny]) {
        visit[nx][ny] = false;
        dfs(nx, ny, sum + map[nx][ny], depth + 1);
        visit[nx][ny] = true;
      }
    }
  }

  return sum;
}

function noDFS(x, y) {
  for (let i = 0; i < 4; i++) {
    let isCheck = false;
    let sum = 0;

    for (let j = 0; j < 4; j++) {
      const nx = x + kx[i][j];
      const ny = y + ky[i][j];

      if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
        sum += map[nx][ny];
      } else {
        isCheck = true;
        break;
      }
    }

    if (!isCheck) result = Math.max(result, sum);
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    dfs(i, j, 0, 0);
    noDFS(i, j);
  }
}

console.log(result);
