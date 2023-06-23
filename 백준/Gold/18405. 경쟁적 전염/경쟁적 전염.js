/*
    특정한 위치에 바이러스 존재.
    모든 바이러스는 1~k 번 중하나.
    모든 바이러스는 1초마다 상, 하, 좌, 우로 증식해 감.
    매 초마다 번호가 낮은 종류의 바이러스부터 먼저 증식.
    증식 과정에서 특정 칸에 이미 어떠한 바이러스가 존재한다면 그곳에는 바이러스가 들어갈 수 없음.
    S 초 후 x,y에 존재하는 바이러스 종류 출력, 바이러스 존재하지 않으면 0 출력.
    
*/

let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, K] = input.shift().split(" ").map(e => +e);
let [S, X, Y] = input[input.length-1].split(" ").map(e => +e);
let board = [Array.from({length: N+1}, () => -1)]; // 바이러스 2차원 배열
let v = Array.from({length: N+1}, () => Array.from({length: N+1}, () => false))

for (let i = 0 ; i < N; i ++) {
    board.push([-1, ...input[i].split(" ").map(e => +e)]);
};

let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];

let queue = []; 

for (let x = 0; x < N+1; x ++) {
    for (let y = 0; y < N+1; y ++) {
        if (board[x][y] > 0) queue.push([x, y, board[x][y], 0]);
    }
}

queue.sort((a, b) => a[2] - b[2]);

while (queue.length) {
    let [x, y, num, cnt] = queue.shift();

    v[x][y] = true; // 방문 처리

    // 상 하 좌 우 탐색
    for (let i = 0; i < 4; i ++) {
        let nx = x + dx[i];
        let ny = y + dy[i];

        if (nx < 0 || nx >= N+1 || ny < 0 || ny >= N+1) continue;
        if (board[nx][ny] === 0 && v[nx][ny] === false) {
            if (cnt + 1 > S) continue;  // S초 이상시 큐에 넣지 않는다

            board[nx][ny] = num;
            queue.push([nx, ny, num, cnt + 1]);
        }
    }
};

console.log(board[X][Y]);