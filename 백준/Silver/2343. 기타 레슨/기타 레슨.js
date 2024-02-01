/**
 * 이분 탐색으로 접근
 * 가운데를 기준으로 높은 숫자를 모두 더해 가운데 숫자부터 아래로 내려가면서 높은 숫자를 모두 더한 값에 충족하는지 확인
 * 높은 숫자를 모두 합친것 보다 크면 그때마다 1씩 증가
 * 1씩 증가한 값을 M과 비교하여 중간 지점 위치를 큰 숫자 쪽으로 올릴지, 내릴지 결정하여 M과 같아진다면 종료
 */

let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/2343.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const lesson = input.shift().split(" ").map(Number);

let max = lesson.reduce((acc, val, idx) => {
  return (acc = acc + val);
}, 0);

console.log(binarySearch(lesson, Math.max(...lesson), max));

function binarySearch(list, row, high) {
  let mid = 0;

  while (row <= high) {
    mid = Math.floor((row + high) / 2);
    let count = 1;

    let maxPoint = 0;
    for (let point of list) {
      maxPoint += point;

      if (maxPoint > mid) {
        count += 1;
        maxPoint = point;
      }
    }

    if (count <= M) high = mid - 1;
    else if (count > M) row = mid + 1;
  }

  return row;
}
