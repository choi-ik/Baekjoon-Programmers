let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/14889.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const half = Math.floor(N / 2);
const personArr = input.map(item => item.split(' ').map(Number));
const visit = Array.from({length: N}, () => true);
let result = Infinity;

function halfTeam(member, idx) {
    if (member === half) {
        let point1 = 0;
        let point2 = 0; 

        for (let i = 0; i < N; i ++) {
            for (let j = 0; j < N; j ++) {
                if (visit[i] && visit[j]) point1 += personArr[i][j];
                else if (!visit[i] && !visit[j]) point2 += personArr[i][j];
            }
        }

        result = Math.min(result, Math.abs(point1 - point2));
    }

    for (let i = idx; i < N; i ++) {
        if (visit[i]) {
            visit[i] = false;
            halfTeam(member + 1, i + 1);
            visit[i] = true;
        }
    }
}

halfTeam(0, 0);
console.log(result)