let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, S, M] = input.shift().split(" ").map(e => +e);
const vloume = input.shift().split(" ").map(e => +e);
let dp = Array.from({length: N+1}, () => Array.from({length: M+1}, () => -1));
dp[0][S] = 1;


for (let x = 0; x < N; x ++) {
    for (let y = 0; y <= M; y ++) {
        if (dp[x][y] > 0) {
            if (y + vloume[x] <= M) dp[x+1][y + vloume[x]] = 1;
            if (y - vloume[x] >= 0) dp[x+1][y - vloume[x]] = 1;
        }
    };
};

let result = 0;
let check = false;
for (let i = 0; i <= M; i ++) {
    if (dp[N][i] === 1) {
        result = i;
        check = true;
    };
};
if (check) console.log(result);
else console.log(-1)
