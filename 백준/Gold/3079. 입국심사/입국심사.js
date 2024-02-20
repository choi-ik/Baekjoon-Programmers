let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/LIS/3079.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const T = input.slice(1).map(Number);

T.sort((a, b) => a - b);

function binarySearch(start, end) {
  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    let count = 0;

    for (const time of T) count += Math.floor(mid / time);

    if (mid === end) return mid;
    if (count >= M) end = mid;
    else start = mid + 1;
  }

  return start;
}

console.log(binarySearch(0, T[T.length - 1] * M));
