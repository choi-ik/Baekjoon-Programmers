let fs = require("fs");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./BackJoon/Implementation/3019.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [c, p] = input[0].split(" ");
const height = input[1].split(" ").map((e) => Number(e));
const blocks = [
  ["0", "0000"],
  ["00"],
  ["001", "10"],
  ["100", "01"],
  ["000", "01", "101", "10"],
  ["000", "00", "011", "20"],
  ["000", "02", "110", "00"],
];
let result = 0;

const checkTetris = (block) => {
  const tempBlock = block.split("").map((e) => Number(e));
  let count = 0;

  for (let i = 0; i <= c - block.length; i++) {
    const diff = height[i] - tempBlock[0];
    let isPossible = true;

    for (let j = i; j < i + tempBlock.length; j++) {
      if (height[j] - tempBlock[j - i] !== diff) {
        isPossible = false;
        break;
      }
    }

    isPossible && count++;
  }

  return count;
};

blocks[p - 1].forEach((block) => {
  result += checkTetris(block);
});

console.log(result);
