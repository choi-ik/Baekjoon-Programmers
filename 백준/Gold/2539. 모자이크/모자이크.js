let fs = require("fs");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./BackJoon/Binary_Search/2539.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [row, col] = input.shift().split(" ").map(Number);
const paper = Number(input.shift());
const mistake = Number(input.shift());
const paperArr = [];
let left = 0;
let right = 1000000;
let result = 0;

input.forEach((direction) => {
  const [r, c] = direction.split(" ").map(Number);

  paperArr.push([r, c]);
  left = Math.max(left, r);
});

// 잘못 색칠된 종이 좌표 행,열 순서대로 정렬
paperArr.sort((a, b) => {
  return a[1] - b[1];
});

while (left <= right) {
  let mid = Math.floor((left + right) / 2);
  const count = paperCheck(mid);

  if (count <= paper) {
    result = mid;
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

function paperCheck(width) {
  let tempY = paperArr[0][1];
  let count = 1;

  for (const [x, y] of paperArr) {
    // 매개변수로 받은 width 만큼의 길이를 가진 색종이로 커버 불가능일 때
    if (y >= tempY + width) {
      count += 1;
      tempY = y;
    }
  }

  return count;
}

console.log(result);
