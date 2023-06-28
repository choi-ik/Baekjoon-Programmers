let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();
let numArr = input[0].split(" ").map(e => +e)
let dp = [numArr[0]];

for (let i = 1; i < N; i ++) {
    if (numArr[i-1] + numArr[i] <= dp[i-1] + numArr[i]) {
        dp.push(dp[i-1] + numArr[i]);
    } else {
        dp.push(numArr[i-1] + numArr[i]);
    }
};
// 수를 1개만 골라도 되므로, 처음 테스트케이스로 주어진 배열중 가장 큰 값이랑, DP 배열의 큰값 중, 더 큰 값 출력
console.log(Math.max(...numArr, ...dp));