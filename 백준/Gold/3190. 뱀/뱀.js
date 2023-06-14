/*
    - 사과가 있는 칸은 2로 현재 뱀이 위치해있는 칸은 1로 비어있는 칸은 0으로 설정
    - 뱀의 위치를 추적하기 위해 path 배열과 뱀의 head, tail을 좌표로 저장
    - dirChangeTime마다 방향전환할 수 있도록 time과 비교
    - 벽을 만나거나 자신을 만나는 경우 break문으로 빠져나옴
    - 움직인 칸에 사과가 있는 경우 2였던 칸을 1로 바꾸고 path 배열에 좌표 저장, tail은 변함 없으므로 head 좌표만 갱신
    - 움직인 칸에 사과가 없는 경우 1로 바꾸고 head 갱신, tail이 한칸 줄어야 하므로 꼬리가 있던 좌표를 0으로 변경하고 path로부터 tail 좌표 갱신
    - 위의 과정을 반복하고 시간증가, dirChangeTime과 비교후 dirChangeTime 갱신
*/

let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();  // 보드의 크기
const K = +input.shift();  // 사과의 개수수
const arr = Array.from({length : N}, () => Array.from({length: N}, () => 0));  // 게임 보드

// 사과 배치
for (let i = 0; i < K; i++) {
    const [x, y] = input[i].split(" ").map(e => +e);
    arr[x - 1][y - 1] = 2;
};

const record = [];

// 시간과 방향 생성
for (let i = 0; i < +input[K]; i++) {
    const [time, dir] = input[K + 1 + i].trim().split(" ");
    record.push([+time, dir]);
};

// 우, 하, 좌, 상 순서
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

let time = 0;  // 이동한 시간
let curDir = 0;  // 나아갈 방향
let head = [0, 0];  // 뱀의 머리
let tail = [0, 0];  // 뱀의 꼬리
let dirChangeTime = record[0][0];  // 방향전환 해야하는 시간과 방향
const path = [];

while (1) {
    const nx = head[0] + dx[curDir];
    const ny = head[1] + dy[curDir];

    // 벽에 부딪히면 겜 Over
    if (nx < 0 || nx >= N || ny < 0 || ny >= N) break;
    // 몸통에 부딪혀도 겜 Over
    else if (arr[nx][ny] === 1) break;
    else {
        // 움직인 곳이 사과라면
        if (arr[nx][ny] === 2) {
            // 사과를 머리로 바꾼다.
            arr[nx][ny] = 1;
            path.push([nx, ny]);
            head[0] = nx;
            head[1] = ny;
        }
        // 움직인 곳이 그냥 길이라면
        else if (arr[nx][ny] === 0) {
            head[0] = nx;
            head[1] = ny;
            // 길을 몸으로 바꿔버리고
            arr[nx][ny] = 1;
            path.push([nx, ny]);
            // 기존 꼬리 제거
            arr[tail[0]][tail[1]] = 0;
            
            let next = path.shift();
            tail[0] = next[0];
            tail[1] = next[1];
        }
    }
    time ++;
    // 방향전환 할 시간이 되었다면
    if (time === dirChangeTime) {
        if (record[0][1] === "D") {
            curDir = (curDir + 1) % 4;
        } else if (record[0][1] === "L") {
            if (curDir - 1 < 0) curDir = 3;
            else curDir = (curDir - 1) % 4;
        }

        record.shift();
        if (record.length === 0) dirChangeTime = 0;
        else dirChangeTime = record[0][0];
    }
};

console.log(time + 1);