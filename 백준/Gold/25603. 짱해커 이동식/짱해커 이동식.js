let fs = require("fs");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./BackJoon/Priority_Queue/25603.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, k] = input[0].split(" ").map(Number);
const costs = input[1].split(" ").map(Number);

let maxCost = 0;
let idx = 0;

while (idx + k <= n) {
  // 연속된 k개의 의뢰 중 최소 비용 찾기
  const check = Math.min(...costs.slice(idx, idx + k));

  // 최소 비용을 기준으로 idx 갱신
  for (let i = k - 1; i >= 0; i--) {
    if (costs[idx + i] === check) {
      idx += i + 1;
      break;
    }
  }

  // 최대 의뢰 비용 갱신
  if (check > maxCost) {
    maxCost = check;
  }
}

// 동식이가 수락한 의뢰들 중 가장 높은 비용 출력
console.log(maxCost);
