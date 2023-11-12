let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/LIS/20444.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map((e) => BigInt(e));

// 이분 탐색
function banarySearch(width, height) {
  while (width <= height) {
    const mid = (width + height) / BigInt(2);
    // (x+1) * (y+1) === 조각난 색종이 개수
    const v = (mid + BigInt(1)) * (N - mid + BigInt(1));

    // N번의 가위질로 K의 색종이를 만들수 있을 때
    if (v === K) return true;

    if (v < K) width = mid + BigInt(1);
    else if (v > K) height = mid - BigInt(1);
  }

  return false;
}

banarySearch(BigInt(0), N / BigInt(2)) ? console.log("YES") : console.log("NO");
