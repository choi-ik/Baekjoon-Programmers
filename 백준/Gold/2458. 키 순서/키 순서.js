let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/2458.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const children = input.map((e) => e.split(" ").map(Number));
const down = Array.from({ length: N + 1 }, () => []);
const up = Array.from({ length: N + 1 }, () => []);
let visit = Array.from({ length: N + 1 }, () => true);
let count = 0;
let result = 0;

children.forEach(([x, y]) => {
  up[x].push(y);
  down[y].push(x);
});

function dfs(graph, start) {
  visit[start] = false;

  for (let i = 0; i < graph[start].length; i++) {
    const x = graph[start][i];

    if (visit[x]) {
      visit[x] = false;
      count++;
      dfs(graph, x);
    }
  }
}

for (let i = 1; i <= N; i++) {
  count = 0;
  visit = Array.from({ length: N + 1 }, () => true);
  dfs(down, i);
  visit = Array.from({ length: N + 1 }, () => true);
  dfs(up, i);

  if (count === N - 1) result++;
}

console.log(result);
