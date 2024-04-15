let fs = require("fs");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./BackJoon/Two-Pointer/16472.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const alphabet = input.shift();
let obj = {};
let left = 0;
let right = 0;
let result = 0;

while (right < alphabet.length) {
  if (!obj[alphabet[right]] && Object.keys(obj).length < N) {
    obj[alphabet[right]] = 1;
    result = Math.max(result, right - left + 1);
    right += 1;
    continue;
  } else if (obj[alphabet[right]]) {
    obj[alphabet[right]] += 1;
    result = Math.max(result, right - left + 1);
    right += 1;
    continue;
  }

  if (obj[alphabet[left]] - 1 === 0) {
    delete obj[alphabet[left]];
    left += 1;
  } else {
    obj[alphabet[left]] -= 1;
    left += 1;
  }
}

console.log(result);
