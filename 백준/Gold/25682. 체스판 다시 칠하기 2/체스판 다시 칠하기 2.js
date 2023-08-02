let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, K] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + N).map(e => e.trim().split(""));


function chess(color) {
    let prefix_sum = Array.from({length: N + 1}, () => Array(M + 1).fill(0));
    let value = 0;


    for (let i = 0; i < N; i ++) {
        for (let j = 0; j < M; j ++) {
            // 인덱스가 0부터 시작한다는 것을 고려 -> map(체스판)의 행과 열의 합(짝/홀)을 구해 map의 게임 말과 매개변수로 넘어온 게임 말의 일치 여부를 통해 value 값 설정  
            if ((i + j) % 2 === 0) map[i][j] !== color ? value = 1 : value = 0;
            else map[i][j] === color ? value = 1 : value = 0; 

            // 누적합 구하는 공식
            prefix_sum[i + 1][j + 1] = prefix_sum[i][j + 1] + prefix_sum[i + 1][j] - prefix_sum[i][j] + value;
        };
    };

    let count = Infinity;

    // K * K를 확인할 수 있는 범위 설정
    for (let i = 1; i < N - K + 2; i ++) {
        for (let j = 1; j < M - K + 2; j ++) {
            // 구간 합 구하는 공식
            count = Math.min(count, prefix_sum[i + K - 1][j + K - 1] - prefix_sum[i + K - 1][j - 1] - prefix_sum[i - 1][j + K - 1] + prefix_sum[i - 1][j - 1])
        };
    };

    return count;
};

// 둘 중 더 작은 값 출력
console.log(Math.min(chess("B"), chess("W")));