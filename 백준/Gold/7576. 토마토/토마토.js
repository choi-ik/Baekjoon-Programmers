/**
 * 익은 토마토의 인접한 곳에 있는 익지 않은 토마토들은 익은 토마토의 영향을 받아 익음
 * 앞, 뒤, 양 옆 네 방향에 있는 토마토가 인접한 토마토
 * 대각선은 영향 주지 못함
 * 며칠이 지나면 토마토들이 모두 익는지 그 최소 일수를 구하라
 * 토마토가 상자 칸에 들어가있지 않을 수도 있음
 *
 * 1. BFS로 모든 칸 탐색
 * 2. 사과가 들어있는 칸 모두 BFS의 큐에 담음
 * 3. 더이상 아무곳도 갈 수 없을 떄 가장 큰 값을 return -> 최단 거리이기 때문에 가장 큰 값이 가장 적은 날짜에 모든 사과를 익힌것임. */

let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/7576.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [M, N] = input.shift().split(" ").map(Number);
const box = input.map((apples) => apples.split(" ").map(Number));
const queue = [];

box.forEach((cells, i) => {
  cells.forEach((cell, j) => {
    if (cell === 1) queue.push([i, j]);
  });
});

let index = 0;
let result = 0;
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

while (index < queue.length) {
  const [x, y] = queue[index];

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (
      nx < 0 ||
      nx >= N ||
      ny < 0 ||
      ny >= M ||
      box[nx][ny] === -1 ||
      box[nx][ny] > 0
    )
      continue;

    box[nx][ny] += box[x][y] + 1;
    result = Math.max(result, box[nx][ny]);
    queue.push([nx, ny]);
  }

  index++;
}

let fail = false;

for (let cells of box) {
  for (let cell of cells) {
    if (cell === 0) {
      fail = true;
    }
  }
}

fail
  ? console.log(-1)
  : result === 0
  ? console.log(0)
  : console.log(result - 1);
