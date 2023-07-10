let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();
let board = Array.from({length: N}, () => 0);
let count = 0;

// 퀸을 놓을 수 있는지 없는지 확인하는 함수
function promising(x) {
    // 같은 열 X, 대각선 X
    for (let i = 0; i < x; i ++) {
        if (board[x] === board[i] || x - i === Math.abs(board[x] - board[i])) return 0;
    }

    return 1;
}

// 백트래킹 함수
function backTraking(x) {
    if (x === N) {
        count ++;
        return;
    };

    for (let i = 0; i < N; i ++) {
        board[x] = i; // x번째 행, i번째 열에 퀸을 배치

        if (promising(x)) { // 현재 퀸을 놓은 자리가 괜찮다면
            backTraking(x + 1); // 그 다음 행에 대해 퀸을 놓는 것을 해 봄.
        }
    }
};


backTraking(0);
console.log(count)