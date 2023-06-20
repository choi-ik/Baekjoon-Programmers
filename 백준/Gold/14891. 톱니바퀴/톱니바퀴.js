let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

// 톱니바퀴
let gear = [];

for (let i = 0; i < 4; i ++) {
    gear.push((input.shift().trim().split("")));
};

// 회전 수
const k = input.shift();
const rotation = [];
// 답
let count = 0;
let idx = 0;
// 변경할 톱니바퀴와 방향 설정
for (let i = 0; i < k; i ++) {
    rotation.push(input.shift().split(" ").map(e => +e));
};

for (let [num, dir] of rotation) {
    // 배열 깊은 복사
    let gearCopy = JSON.parse(JSON.stringify(gear));
    let dirCopy = dir;
    num -= 1;

    // 처음 선택된 톱니바퀴 변경
    if (dir === -1) {
        let temp = gearCopy[num].shift();
        gearCopy[num].push(temp);
    }else if (dir === 1) {
        let temp = gearCopy[num].pop();
        gearCopy[num].unshift(temp);
    };

    // 처음 선택된 톱니 기준 왼쪽 톱니 탐색
    if (num !== 0) {
        for (let i = num; i > 0; i --) {
            if (gear[i-1][2] !== gear[i][6]) {
                // 시계 반대 방향
                if (dir === -1) {
                    let temp = gearCopy[i-1].pop();
                    gearCopy[i-1].unshift(temp);
                    dir += 2;
                }
                // 시계 방향
                else if (dir === 1) {
                    let temp = gearCopy[i-1].shift();
                    gearCopy[i-1].push(temp);
                    dir -= 2;
                }
                // 맞물린 톱니가 같다면 정지  
            } else break;
        }
    };

    dir = dirCopy;

    // 처음 선택된 톱니 기준 오른쪽 톱니 탐색
    if (num !== 3) {
        for (let i = num; i < 3; i ++) {
            if (gear[i][2] !== gear[i+1][6]) {
                // 시계 반대 방향
                if (dir === -1) {
                    let temp = gearCopy[i+1].pop();
                    gearCopy[i+1].unshift(temp);
                    dir += 2;
                }
                // 시계 방향
                else if (dir === 1) {
                    let temp = gearCopy[i+1].shift();
                    gearCopy[i+1].push(temp);
                    dir -= 2;
                }  
                // 맞물린 톱니가 같다면 정지
            } else break;
        }
    };

    // 복사하여 수정한 배열을 다시 원본배열에 입력
    gear = gearCopy;
};


gear.forEach((e, i) => {
    if (e[0] === '1' && i == 0) count += 1;
    else if (e[0] === '1' && i == 1) count += 2;
    else if (e[0] === '1' && i == 2) count += 4;
    else if (e[0] === '1' && i == 3) count += 8;
});

console.log(count)