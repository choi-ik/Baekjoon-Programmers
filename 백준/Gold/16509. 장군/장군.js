let fs = require("fs");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./BackJoon/Implementation/16509.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const SANG = input[0].split(" ").map(Number);
const KING = input[1].split(" ").map(Number);

const map = Array.from({ length: 10 }, () => Array(9).fill(0));

map[SANG[0]][SANG[1]] = 1;

const DIRECTION = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

const temp = [
  [
    [-1, -1],
    [-1, 1],
  ],
  [
    [1, 1],
    [1, -1],
  ],
  [
    [-1, 1],
    [1, 1],
  ],
  [
    [-1, -1],
    [1, -1],
  ],
];

const bfs = () => {
  const queue = [SANG];
  let idx = 0;

  while (queue.length > idx) {
    const [x, y] = queue[idx];

    for (let i = 0; i < DIRECTION.length; i++) {
      const [nx, ny] = [DIRECTION[i][0] + x, DIRECTION[i][1] + y];

      if (nx < 0 || nx >= map.length || ny < 0 || ny >= map[0].length) continue;
      if (nx === KING[0] && ny === KING[1]) continue;

      for (let j = 0; j < temp[i].length; j++) {
        const [vx, vy] = [temp[i][j][0] + nx, temp[i][j][1] + ny];

        if (vx < 0 || vx >= map.length || vy < 0 || vy >= map[0].length)
          continue;
        if (vx === KING[0] && vy === KING[1]) continue;

        const [tx, ty] = [temp[i][j][0] + vx, temp[i][j][1] + vy];

        if (tx < 0 || tx >= map.length || ty < 0 || ty >= map[0].length)
          continue;
        if (map[tx][ty]) continue;
        if (tx === KING[0] && ty === KING[1]) return map[x][y];

        map[tx][ty] = map[x][y] + 1;
        queue.push([tx, ty]);
      }
    }
    idx++;
  }

  return -1;
};

console.log(bfs());
