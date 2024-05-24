let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/DFS/17471.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const population = [0, ...input.shift().split(" ").map(Number)];
const temp = input.map((e) => e.split(" ").map(Number));
const graph = {};
const selected = Array(N + 1).fill(false);
let answer = Infinity;

temp.forEach((e, idx) => (graph[idx + 1] = e.slice(1)));

// 조합 함수
const getCombination = (limit, cnt, idx) => {
  if (limit === cnt) {
    let sectionA, sectionB;

    for (let i = 1; i <= N; i++) {
      if (selected[i]) sectionA = i;
      else sectionB = i;
    }

    const [countA, peopleA] = bfs(sectionA, true);
    const [countB, peopleB] = bfs(sectionB, false);

    if (countA + countB === N)
      answer = Math.min(answer, Math.abs(peopleA - peopleB));
  }

  for (let i = idx; i <= N; i++) {
    selected[i] = true;
    getCombination(limit, cnt + 1, i + 1);
    selected[i] = false;
  }
};

const bfs = (start, isFlag) => {
  const queue = [];
  const visited = Array(N + 1).fill(false);
  let cnt = 1;
  let people = population[start];

  queue.push(start);
  visited[start] = true;

  while (queue.length > 0) {
    const q = queue.shift();

    graph[q].forEach((next) => {
      if (visited[next] || selected[next] !== isFlag) return;

      cnt += 1;
      visited[next] = true;
      queue.push(next);

      people += population[next];
    });
  }

  return [cnt, people];
};

for (let i = 1; i < N; i++) {
  getCombination(i, 0, 1);
}

console.log(answer === Infinity ? -1 : answer);
