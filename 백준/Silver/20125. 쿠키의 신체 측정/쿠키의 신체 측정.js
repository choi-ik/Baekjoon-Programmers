let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();
const board = input.slice(0, N).map(e => e.trim().split(""));
let cookie = [0, 0, 0, 0, 0]; // 왼쪽팔, 오른쪽팔, 허리, 왼쪽다리, 오른쪽다리
let heart = [0, 0];

// 머리 위치 부터 찾기 -> 머리 바로 밑이 심장이기 때문에 심장위치부터 깊이우선 탐색을 진행할 것임
for (let i = 0; i < N; i ++) {
    let temp = true;

    for (let j = 0 ; j < N; j ++) {
        if (board[i][j] === "*") {
            heart[0] = i + 1;
            heart[1] = j;
            temp = false;
            break;
        }
    };

    if (!temp) break;
};

// 왼팔
for (let i = heart[1] - 1; i >= 0; i --) {
    if (board[heart[0]][i] === "*") cookie[0] += 1;
    else break;   
};

// 오른팔
for (let i = heart[1] + 1; i < N; i ++) {
    if (board[heart[0]][i] === "*") cookie[1] += 1;
    else break;   
};

// 허리
for (let i = heart[0] + 1; i < N; i ++) {
    if (board[i][heart[1]] === "*") cookie[2] += 1;
    else {
        for (let j = i; j < N; j ++) {
            if (board[j][heart[1] - 1] === "*") cookie[3] += 1;
            if (board[j][heart[1] + 1] == "*") cookie[4] += 1;
        };

        break;
    };
};


console.log(heart[0] + 1, heart[1] + 1)
console.log(cookie.join(" "));