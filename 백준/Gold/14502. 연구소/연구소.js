let fs = require("fs");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./BackJoon/BruteForce/14502.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const map = [];

let result = 0;

input.forEach((e) => map.push(e.split(" ").map(Number)));

makeWall(0);

// 벽 세우기
function makeWall(count) {
  if (count === 3) {
    const mapCopy = map.map((m) => [...m]);

    result = Math.max(result, bfs(mapCopy));

    return;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 0) {
        map[i][j] = 1;
        makeWall(count + 1);
        map[i][j] = 0;
      }
    }
  }
}

function bfs(mapCopy) {
  const dx = [0, 0, -1, 1];
  const dy = [1, -1, 0, 0];
  let count = 0;
  let idx = 0;
  const queue = [];

  // 바이러스 좌표
  mapCopy.forEach((e, i) => {
    e.forEach((f, j) => {
      if (f === 2) queue.push([i, j]);
    });
  });

  while (idx < queue.length) {
    const [x, y] = queue[idx];

    for (let i = 0; i < 4; i++) {
      const nx = dx[i] + x;
      const ny = dy[i] + y;

      if (nx >= 0 && nx < N && ny >= 0 && ny < M && mapCopy[nx][ny] === 0) {
        mapCopy[nx][ny] = 2;
        queue.push([nx, ny]);
      }
    }

    idx++;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (mapCopy[i][j] === 0) count += 1;
    }
  }

  return count;
}

console.log(result);
