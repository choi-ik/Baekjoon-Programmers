let fs = require("fs");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./BackJoon/Two-Pointer/1484.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const G = Number(input[0]);
const numArr = Array.from({ length: 100001 }, (_, idx) => idx * idx);

let l = 1;
let r = 2;
let result = "";

while (l < 100001 && r < 100001) {
  if (Math.abs(numArr[l] - numArr[r]) < G) r++;
  else if (Math.abs(numArr[l] - numArr[r]) === G) {
    result += r + "\n";
    r++;
  } else l++;
}

result ? console.log(result) : console.log(-1);
