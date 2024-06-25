let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/DFS/16946.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const map = input.map((e) => e.split("").map(Number));
const mapObj = {};
const mapCopy = input.map((e) => e.split("").map(Number));
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];
let count = 2;

const dfs = (x, y, visit, cnt) => {
  if (!mapObj[cnt]) mapObj[cnt] = 1;

  const stack = [[x, y]];
  visit[x][y] = false;
  map[x][y] = cnt;

  while (stack.length) {
    const [cx, cy] = stack.pop();

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (
        nx < 0 ||
        nx >= N ||
        ny < 0 ||
        ny >= M ||
        !visit[nx][ny] ||
        map[nx][ny] === 1
      ) {
        continue;
      }

      mapObj[cnt]++;
      visit[nx][ny] = false;
      map[nx][ny] = cnt;
      stack.push([nx, ny]);
    }
  }
};

const visit = Array.from({ length: N }, () => Array(M).fill(true));

map.forEach((e, i) => {
  e.forEach((k, j) => {
    visit[i][j] = false;

    if (k === 0) {
      dfs(i, j, visit, count);
      count += 1;
    }
  });
});

map.forEach((e, i) => {
  e.forEach((k, j) => {
    if (k === 1) {
      const arr = [];
      for (let idx = 0; idx < 4; idx++) {
        const nx = i + dx[idx];
        const ny = j + dy[idx];

        if (
          nx < 0 ||
          nx >= N ||
          ny < 0 ||
          ny >= M ||
          map[nx][ny] === 1 ||
          arr.includes(map[nx][ny])
        )
          continue;

        arr.push(map[nx][ny]);
        mapCopy[i][j] += mapObj[map[nx][ny]];
      }

      mapCopy[i][j] = mapCopy[i][j] % 10;
    }
  });
});

mapCopy.map((e) => console.log(e.join("")));
