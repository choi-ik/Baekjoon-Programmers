let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/Greedy/19539.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const tree = input[1].split(" ").map(Number);

let a = 0;
let b = 0;

tree.forEach((e) => {
  a += Math.floor(e / 2);
  b += e % 2;
});

if (a === b) console.log("YES");
else {
  if (a - b < 0) console.log("NO");
  else {
    if ((a - b) % 3 === 0) console.log("YES");
    else console.log("NO");
  }
}
