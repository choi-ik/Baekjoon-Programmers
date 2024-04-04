let fs = require("fs");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./BackJoon/Two-Pointer/2230.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const numArr = [];
let result = Infinity;

for (let i = 1; i < input.length; i++) {
  numArr.push(Number(input[i]));
}

numArr.sort((a, b) => a - b);

let l = 0;
let r = 1;

while (l < N && r < N) {
  const value = Math.abs(numArr[l] - numArr[r]);

  if (value < M) r++;
  else if (value === M) {
    result = value;
    break;
  } else {
    result = Math.min(value, result);
    l++;
  }
}

console.log(result);
