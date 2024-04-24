let fs = require("fs");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./BackJoon/Binary_Search/2295.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const numArr = [...input.map(Number)].sort((a, b) => a - b);
const hapArr = [];
let result = 0;

// a + b = c - d;
for (let i = 0; i < numArr.length; i++) {
  for (let j = i; j < numArr.length; j++) {
    hapArr.push(numArr[i] + numArr[j]);
  }
}

hapArr.sort((a, b) => a - b);

for (let i = 0; i < numArr.length; i++) {
  for (let j = i; j < numArr.length; j++) {
    let num = numArr[j] - numArr[i];
    let left = 0;
    let right = hapArr.length - 1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (num < hapArr[mid]) right = mid - 1;
      else if (num > hapArr[mid]) left = mid + 1;
      else {
        result = Math.max(result, numArr[j]);
        break;
      }
    }
  }
}

console.log(result);
