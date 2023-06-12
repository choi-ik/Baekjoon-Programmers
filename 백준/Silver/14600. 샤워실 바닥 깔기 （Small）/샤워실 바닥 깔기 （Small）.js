/*
    빈 공간을 발견할 때마다 4가지 도형을 넣어보며 문제에서 주어진 조건대로 모든 칸을 채울 수 있는지 백트래킹으로 확인.
    주어진 4가지 도형을 나타낼 배열 생성 -> ⌈, ⌉, ⌊, ⌋
*/

let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const K = +input[0];
let tile = input[1].split(" ").map(e => +e).join("");  // 배수구 입구
let tileArr = [];
let answer = [];
let num = 0;

// ⌈, ⌉, ⌊, ⌋ 모양
let dx = [[0, 0, 1], [0, 1, 1], [0, 0, -1], [0, -1, -1]];
let dy = [[0, -1, -1], [0, 0, 1], [0, 1, 1], [0, 0, -1]];

// 2차원 배열 만들기
for (let i = (2**K) -1; i >= 0; i--) {
    tileArr.push([]);
    for (let j = 0; j < 2**K; j++) {
        
        tileArr[(2**K)-1-i][j] = -2;
        if (String(j+1) + String(i + 1) === tile) tileArr[(2**K)-1-i][j] = -1;
    };
};

// 타일을 깔기 위한 백트래킹 함수
function dfs(arr, depth, cnt) {
    if (num > 0) return;

    if (cnt === 0) {
        num ++;
        for (let i = 0; i < 2**K; i++) {
            console.log(arr[i].join(" "));
        };
    } else {
        // 좌표 왼쪽 가장 아래부처 시작
        for (let i = (2**K) - 1; i >= 0; i--) {
            for (let j = 0; j < 2**K; j++) {
                if (arr[i][j] === -2) {
                    
                    // 도형 입혀보기
                    for (let ix = 0; ix < 4; ix++) {
                        let check = true;
                        
                        for (let jx = 0; jx < 3; jx++) {
                            let nx = i + dx[ix][jx];
                            let ny = j + dy[ix][jx];

                            if (nx < 0 || nx >= 2**K || ny < 0 || ny >= 2**K) {
                                check = false;
                                break;
                            }

                            if (arr[nx][ny] !== -2 || arr[nx][ny] === -1) {
                                check = false;
                                break;
                            }
                        }

                        if (check) {
                            for (let jx = 0; jx < 3; jx++) {
                                let nx = i + dx[ix][jx];
                                let ny = j + dy[ix][jx];
                                cnt--;
                                arr[nx][ny] = depth;
                            }

                            dfs(arr, depth + 1, cnt);

                            for (let jx = 0; jx < 3; jx++) {
                                let nx = i + dx[ix][jx];
                                let ny = j + dy[ix][jx];
                                cnt++;
                                arr[nx][ny] = -2;
                            }
                        }
                    }
                }
            };
        };
    };
};

dfs(tileArr, 1, (2**K)**2 - 1)