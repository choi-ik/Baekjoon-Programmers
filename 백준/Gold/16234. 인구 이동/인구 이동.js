/*
    우선 0,0 부터 BFS 탐색 시작.
    1. 옆으로 퍼져 나가면서 L 이상 R 이하이면 다른 임시 배열에 좌표 저장.
    2. 한번 순회가 끝나면 count += 1
    3. 저장된 좌표를 순회하며 원래 배열에 평균값을 넣어주기.
    4. 1번 다시 반복
    5. 더 이상 탐색 불가하면 break
*/

let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [N, L, R] = input[0].split(" ").map(e => +e);
let country = [];

// 나라 맵 만들기
for (let i = 1; i <= N; i++) {
    country.push(input[i].split(" ").map(e => +e));
};

// 상 하 좌 우
let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];
let result = 0;

while (true) {
    let check = false;
    // 벙문 배열 생성 ->  while 문이 돌 때마다 초기화
    let v = Array.from(Array(country.length), () => Array(country.length).fill(false));

    // 모든 좌표에서 BFS 탐색 하기 위함
    for (let i = 0; i < N; i ++) {
        for (let j = 0; j < N; j ++) {
            if (!v[i][j]) {
                let queue = [[i, j]];
                let visit = [[i, j]];
                let count = 1;
                let sum = country[i][j];
                v[i][j] = true;

                // BFS 탐색
                while (queue.length) {
                    const [x, y] = queue.shift();

                    // 상 하 좌 우 - 탐색
                    for (let k = 0; k < 4; k ++) {
                        let nx = x + dx[k];
                        let ny = y + dy[k];

                        if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
                        
                        // 인구수 차이 
                        const sub = Math.abs(country[x][y] - country[nx][ny]);

                        // 방문가능하고 L 이상 R 이하 조건 만족 할 경우
                        if  (!v[nx][ny] && sub >= L && sub <= R) {
                            v[nx][ny] = true;   // 방문 처리
                            queue.push([nx, ny]);
                            visit.push([nx, ny]);
                            count ++;
                            sum += country[nx][ny];
                            check = true;                   
                        }
                    }
                }
                let average = Math.floor(sum / count);

                // 나라 배열에 평균 값 넣어주기.
                for (let [x, y] of visit) {
                    country[x][y] = average;
                }
            }
        }
    }

    if (!check) break;
    else result += 1; 
};

console.log(result)