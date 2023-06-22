let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input.shift().split(" ").map(e => +e);
// 블록에 값 넣기
let block = input.slice(0, N).map((e) => e.split(" ").map(e => +e));
// 누적 합 배열
let prefixSum = Array.from(Array(N + 1), () => new Array(N + 1).fill(0));
let answer = "";

// 블록 모형으로 누적합 구하기
for (let x = 1; x < N + 1; x ++) {
    for (let y = 1; y < N + 1; y ++) {
        prefixSum[x][y] = block[x-1][y-1] + prefixSum[x][y-1] + prefixSum[x-1][y] - prefixSum[x-1][y-1];
    };
};

// 제일 큰 값 - 작은 좌표의 y축 바로 왼쪽 값 - 큰 좌표의 x축 바로 위쪽 값 + 작은 좌표 큰 좌표 박스의 대각선 위 값, 
for (let i = N; i < input.length; i ++) { 
    const[x1, y1, x2, y2] = input[i].split(" ").map(e => +e);

    answer += prefixSum[x2][y2] - prefixSum[x2][y1-1] - prefixSum[x1-1][y2] + prefixSum[x1-1][y1-1] + "\n";
};

console.log(answer)