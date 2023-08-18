let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
let [r, c, d] = input[1].split(' ').map(Number); // (r,c) 좌표, 방향
const map = input.slice(2, input.length).map(e => e.split(' ').map(Number));

// 청소 여부 배열 (기본 값 false)
let mapClear = Array.from({length: N}, () => Array.from({length: M}, () => false));

// 방향 dict
let direction = {
    0: [-1, 0], // 상
    1: [0, 1], // 우
    2: [1, 0], // 하
    3: [0, -1], // 좌
};

// 청소한 칸
let clear = 0;
// 현재 위치한 칸
let nowBlock = [r, c];

while(true) {
    let [x, y] = nowBlock;
    let dx = [-1, 1, 0 ,0];
    let dy = [0, 0, -1, 1];

    // 1번 조건 (현재 칸이 아직 청소되지 않은 경우, 현재 칸 청소)
    if (map[x][y] === 0 && mapClear[x][y] === false) {
        clear ++;
        // 현재 칸 청소
        mapClear[x][y] = true;
    };
    
    // 2, 3번 조건 (현재 칸 주변 4칸중 확인)
    let check = false;
    for (let i = 0; i < 4; i ++) {
        let nx = x + dx[i];
        let ny = y + dy[i];

        if (map[nx][ny] === 0 && mapClear[nx][ny] === false) {
            check = true;
        };
    };

    // 주변 칸 중 청소되지 않은 빈 칸이 있는 경우
    if (check) {
        // 반시계 방향으로 90도 회전 -> |현재방향 - 1 + 4| % 4
        d = Math.abs((d - 1) + 4) % 4;
        
        // 한칸 전진 할 좌표
        let nx = x + direction[d][0];
        let ny = y + direction[d][1];

        // 바라보는 방향 기준 앞쪽 칸이 청소되지 않은 빈 칸 일때 한칸 전진
        if (map[nx][ny] === 0 && mapClear[nx][ny] === false) {
            nowBlock = [nx, ny];
        }
    } else { // 주변 칸 중 청소되지 않은 빈칸이 없는 경우
        // 한칸 후진 할 좌표
        let nx = direction[d][0] * (-1);
        let ny = direction[d][1] * (-1);

        // 후진 할 좌표가 벽이라면 작동 종료
        if (map[x + nx][y + ny] === 1) break;
        else nowBlock = [x + nx, y + ny];
    }
};

console.log(clear)