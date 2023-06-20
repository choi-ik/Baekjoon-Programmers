let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [H, W] = input.shift().split(" ").map(e => +e);
const height = input.shift().split(" ").map(e => +e);

let block = Array.from({length: H}, () => Array.from({length: W}, () => 0));
let count = 0;

height.forEach((e, idx) => {
    for (let i = 0; i < e; i ++) {
        block[H-1-i][idx] = 1;
    };
});

for (let i = H-1; i >= 0; i --) {
    // if (block.length <= 2) {
    //     count = 0;
    //     break;
    // };

    let wall = [];
    
    for (let j = 0; j < W; j ++) {
        if (block[i][j] === 1) {
            wall.push([i, j]);
        }
    };
 
    // 탐색하는 부분이 바닥이고, 양 옆이 모두 뚫려있다면 0 출력
    if (i === H-1) {
        let check = false;
        for (let k = 0; k < wall.length - 1; k ++) {
            // 바닥에 양끝이 벽이 아닐 경우
            if (wall[0][1] !== 0 && wall[wall.length - 1][1] !== wall.length - 1) {
                // 벽사이의 간격이 1이 넘을 경우 물이 고일 수 있음
                if (Math.abs(wall[k][1] - wall[k+1][1]) > 1) {
                    check = true;
                }
            } 
            // 바닥 양긑이 벽이면 물이 고일 수 있음
            else {
                check = true;
                break;
            }
        };
        // check의 변동이 없다면 양옆이 모두 뚫려있고, 벽 사이에 빈 공간이 없는 경우
        if (!check) {
            count = 0;
            break;
        }
    };

    // 벽 배열의 길이가 1 이상이면 두 벽 사이의 거리를 재서 물이 고일 수 있는 양을 구함
    if (wall.length > 1) {
        for (let k = 0; k < wall.length - 1; k ++) {
            count += Math.abs(wall[k][1] - wall[k+1][1]) - 1; 
        };
    }
};

console.log(count)