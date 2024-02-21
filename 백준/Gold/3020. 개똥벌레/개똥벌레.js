let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/LIS/3020.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, H] = input[0].split(" ").map(Number);
let up = input.slice(1).filter((e, i) => i % 2 === 0 && e);
let down = input.slice(1).filter((e, i) => i % 2 !== 0 && e);
let breakStone = Array(H).fill(0);

up = up.map(Number).sort((a, b) => a - b);
down = down.map(Number).sort((a, b) => a - b);

function binarySearch(targetArr, height) {
  let s = 0;
  let e = targetArr.length;

  while (s < e) {
    const mid = Math.floor((s + e) / 2);

    if (height <= targetArr[mid]) e = mid;
    else s = mid + 1;
  }

  return s;
}

for (let height = 0; height < H; height++) {
  breakStone[height] =
    Math.floor(N / 2) -
    binarySearch(up, height + 1) +
    (Math.floor(N / 2) - binarySearch(down, H - height));
}
const min = Math.min(...breakStone);
console.log(min, breakStone.filter((e) => e === min).length);
