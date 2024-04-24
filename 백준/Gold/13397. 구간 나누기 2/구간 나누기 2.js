let fs = require("fs");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./BackJoon/Binary_Search/13397.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arr = [...input.shift().split(" ").map(Number)];
let result = 10000;
let left = 0;
let right = 10000;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  if (verification(mid)) {
    right = mid - 1;
    result = Math.min(result, mid);
  } else {
    left = mid + 1;
  }
}

console.log(result);

function verification(mid) {
  let count = 1;
  let min = 10000;
  let max = 0;

  for (let i = 0; i < N; i++) {
    min = Math.min(min, arr[i]);
    max = Math.max(max, arr[i]);

    if (max - min > mid) {
      count++;
      min = max = arr[i];
    }
  }

  return M >= count;
}
