const { error } = require("console");
let fs = require("fs");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./BackJoon/BruteForce/1107.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const M = +input[1];
const errorBtn = M !== 0 ? input[2].split(" ").map((e) => +e) : false;
const basicChannel = 100;

const numArr = Array.from({ length: 1000000 }, (_, i) => i);
let min = Infinity;
let num = 0;

for (const value of numArr) {
  if (Math.abs(value - N) < min) {
    let isCheck = false;

    String(errorBtn)
      .split("")
      .forEach((e) => {
        if (String(value).split("").includes(e)) isCheck = true;
      });

    if (!isCheck) {
      min = Math.abs(value - N);
      num = String(value);
    }
  }
}

min !== Infinity
  ? console.log(Math.min(num.length + min, Math.abs(N - basicChannel)))
  : console.log(Math.abs(N - basicChannel));
