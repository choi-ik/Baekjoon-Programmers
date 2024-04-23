let fs = require("fs");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./BackJoon/Binary_Search/1477.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, L] = input.shift().split(" ").map(Number);
let arr = [];

if (N !== 0)
  arr = [0, ...input.shift().split(" ").map(Number), L].sort((a, b) => a - b);
else arr = [0, L];

// 휴게소간 임의의 거리 최소 1, 최대 L
let left = 1;
let right = L - 1;
let result = 0;

// 이분 탐색
while (left <= right) {
  let mid = Math.floor((left + right) / 2);
  let count = 0;

  // 휴게소 사이의 거리와 mid(임의의 거리) 비교
  for (let i = 1; i <= N + 1; i++) {
    let tempDist = arr[i] - arr[i - 1];
    count += Math.floor(tempDist / mid);

    // 설치하려는 곳에 휴게소가 있다면 -1
    if (tempDist % mid === 0) count -= 1;
  }

  if (count <= M) {
    result = mid;
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

console.log(result);
