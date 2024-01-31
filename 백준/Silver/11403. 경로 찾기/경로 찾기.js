let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/11430.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const map = input.map(item => item.split(' ').map(Number));
const result = Array.from({length: N}, () => Array(N).fill(0));

for (let i = 0; i < N; i ++) {
    const visit = Array(N).fill(true)
    dfs(i, i, visit)
}

function dfs (raw, nextRaw, visited) {
    for (let i = 0; i < N; i ++) {
        if (map[nextRaw][i] && visited[i]) {
            result[raw][i] = 1;
            visited[i] = false;

            dfs(raw, i, visited);
        }
    }
}

console.log(result.map(item => item.join(' ')).join('\n'))