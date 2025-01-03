/**
 * N <= 100, M <= 100 -> BFS를 하게된다면 O(V+E) -> V = 10000개, E = 4 * V 총 4만 -> 5만 -> 1만의 시간 복잡도
 * 시작점부터 도착지점까지의 최단 거리를 구함과 동시에 이동하면서 지점마다 1이 있다면 카운팅을 세기
 */

let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/BFS/1261.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [m, n] = input.shift().split(" ").map(Number); // 가로, 세로 크기
const board = input.map((line) => line.split("").map(Number));

// BFS 함수 정의
function BFS() {
  const visited = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => Infinity)
  ); // Infinity로 초기화

  const direction = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const queue = [[0, 0]];
  visited[0][0] = 0;

  while (queue.length) {
    const [x, y] = queue.shift();

    for (const [dx, dy] of direction) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue; // 범위 체크
      const cost = visited[x][y] + board[nx][ny];

      if (cost < visited[nx][ny]) {
        visited[nx][ny] = cost;
        if (board[nx][ny] === 1) {
          queue.push([nx, ny]); // 벽일 경우
        } else {
          queue.unshift([nx, ny]); // 빈 방일 경우
        }
      }
    }
  }

  return visited[n - 1][m - 1]; // 도착지점까지 최소 비용
}

console.log(BFS());
