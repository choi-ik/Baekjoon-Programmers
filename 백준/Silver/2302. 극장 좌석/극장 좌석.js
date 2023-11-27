let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/DP/2302.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const M = +input.shift();
const vip = input.map(Number);

let answer = 1;

const DP = [1, 1, 2, 3];

for (let i = 4; i <= N; i ++) {
    DP.push(DP[i - 2] + DP[i - 1]);
};

let count = 0;

for (let i = 1; i <= N; i ++) {    
    if (vip.filter(e => e === i).length) {
        answer *= DP[count];
        count = 0;

        continue;
    };

    if (i === N) {
        count += 1;
        answer *= DP[count];
    };

    count ++;
};

console.log(answer === 0 ? 1 : answer)