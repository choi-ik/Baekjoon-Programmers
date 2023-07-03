let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();
const board = input.slice(0, N).map(e => e.split(" ").map(e => +e));
let dp = Array.from({length: N}, () => Array.from({length: N}, () => BigInt(0)));
// 처음 시작하는 부분을 1로 초기화
dp[0][0] = BigInt(1);

for (let x = 0; x < N; x ++) {
    for (let y = 0; y < N; y ++) {
        if (x === N-1 && y === N-1) break;

        let value = board[x][y];
        let down = x + value;
        let right = y + value;

        // [N-1][N-1]에 도착하는 모든 경우의 수 들을 구함
        if (down < N) dp[down][y] += dp[x][y];
        if (right < N) dp[x][right] += dp[x][y];
    };
};

console.log(dp[N-1][N-1].toString());
