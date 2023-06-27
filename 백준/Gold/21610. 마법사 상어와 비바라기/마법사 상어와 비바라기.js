let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input.shift().split(" ").map(e => +e);
let board = input.slice(0, N).map(e => e.split(" ").map(e => +e));
let moves = input.slice(N).map(e => e.split(" ").map(e => +e));

// 사라진 구름이 위치한 배열
let v = [];

// 처음 구름
let clouds = [[N-2, 0], [N-2, 1], [N-1, 0], [N-1, 1]];

// ←, ↖, ↑, ↗, →, ↘, ↓, ↙  
const dir = [[], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1]];

// 좌우상하 대각선
const dx = [-1, -1, 1, 1];
const dy = [-1, 1, -1, 1];

moves.forEach(([d, s]) => {
    let newCloud = [];
    v = Array.from({length: N}, () => Array.from({length: N}, () => true));

    // 구름 이동
    clouds.forEach(([x, y]) => {
        let nx = (x + dir[d][0] * s) % N;
        let ny = (y + dir[d][1] * s) % N;

        // 좌표값이 음수라면 길이 만큼 더해줌줌
        if (nx < 0) nx += N;
        if (ny < 0) ny += N;

        newCloud.push([nx, ny]);
        // 구름이 이동한 곳 물의 양 +1
        board[nx][ny] += 1;
        // 5번 조건에서 구름이 다시 생길때 이전에 구름이 있었던 칸은 구름이 생기지 않게 하기 위함
        v[nx][ny] = false;
    });

    newCloud.forEach(([x, y]) => {
        let count = 0;

        for (let i = 0; i < 4; i ++) {
            let nx = x + dx[i];
            let ny = y + dy[i];

            if (nx < 0 || nx >= N || ny < 0 || ny >= N || board[nx][ny] < 1) continue;
            count += 1;
        };

        board[x][y] += count;
    });

    // 구름 배열 초기화
    clouds = [];

    // 구름 생성 및 구름이 생성된 곳 물의 양 -2
    for (let i = 0; i < N; i ++) {
        for (let j = 0; j < N; j ++) {
            if (board[i][j] >= 2 && v[i][j]) {
                clouds.push([i, j]);
                board[i][j] -= 2;
                v[i][j] = false;
            }
        }
    };
});

let result = 0;

for (let i = 0; i < N; i ++) {
    for (let j = 0; j < N; j ++) {
        result += board[i][j];
    }
};

console.log(result);