let fs = require("fs");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./BackJoon/Two-Pointer/15961.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, d, k, c] = input.shift().split(" ").map(Number);
const belt = input.map(Number);

let left = 1;
let right = k;
let sushi = { [c]: 1 };

for (let i = 0; i < k; i++) {
  if (sushi[belt[i]]) sushi[belt[i]]++;
  else sushi[belt[i]] = 1;
}

let count = Object.keys(sushi).length;
let result = Object.keys(sushi).length;

while (left < N) {
  if (sushi[belt[left - 1]] && sushi[belt[left - 1]] - 1 === 0) {
    delete sushi[belt[left - 1]];
    count--;
  } else if (sushi[belt[left - 1]] && sushi[belt[left - 1]] - 1 > 0) {
    sushi[belt[left - 1]] -= 1;
  }

  if (sushi[belt[right]]) sushi[belt[right]]++;
  else {
    sushi[belt[right]] = 1;
    count++;
  }

  result = Math.max(result, count);

  left++;
  right = (right + 1) % N;
}

console.log(result);
