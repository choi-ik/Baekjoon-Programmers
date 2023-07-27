let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input.shift().split(" ").map(Number);
let map = input.slice(0, N).map(e => e.split(" ").map(Number));
let visit = Array.from({length: N}, () => Array.from({length: M}, () => true))
let ice = [];

// 빙산 위치 찾기
for (let i = 0; i < N; i ++) {
    for (let j = 0; j < M; j ++) {
        if (map[i][j] > 0) ice.push([i, j]);
    };
};

let idx = 0; // 빙산이 녹는 시간(년)
while (true) {
    let dx = [-1, 1, 0, 0];
    let dy = [0, 0, -1, 1];    

    // 방문 빙산  초기화
    visit = Array.from({length: N}, () => Array.from({length: M}, () => true));

    // 빙산 덩어리
    let lump = 0;
 
    // 빙산 덩어리 찾기
    ice.forEach(([x, y]) => {
        // 탐색 조건 -> 빙산이 남아있고, 아직 그 빙산을 방문하지 않았을때
        if (map[x][y] > 0 && visit[x][y] === true) {
            let queue = [[x, y]];
             
            // BFS 탐색 시작
            let i = 0;
            while (i < queue.length) {
                const [nx, ny] = queue[i];
                
 
                for (let j = 0; j < 4; j ++) {
                    let kx = dx[j] + nx;
                    let ky = dy[j] + ny;
 
                    if (map[kx][ky] > 0 && visit[kx][ky] === true) {
                        queue.push([kx, ky]);
                        visit[kx][ky] = false;
                    }
                };
                 
                i++;
            };
 
            // 덩어리 추가
            lump ++;
        };
    });

    // 덩어리가 2개 이상일때 탐색 종료
    if (lump >= 2) break;
    // 덩어리가 2개가 되기전에 빙산이 다 녹아 아예 없을 때
    if (lump === 0) {
        idx = 0;
        break;
    };

    // 방문 빙산  초기화
    visit = Array.from({length: N}, () => Array.from({length: M}, () => true));

    // 빙산 녹이기
    ice.forEach(([x, y]) => {
        // 탐색 조건 -> 빙산이 아직 존재할 때만 탐색
        if (map[x][y] > 0) {
            visit[x][y] = false
            // 양 끝 행, 열은 모두 0이기에 인덱스 아웃 조건 설정하지 않아도 됨.
            for (let i = 0; i < 4; i ++) {
                let nx = dx[i] + x;
                let ny = dy[i] + y;
    
                // 상하좌우 주변이 바다면 빙산을 1씩 녹임
                if (map[x][y] === 0) break;
                if (map[nx][ny] <= 0 && visit[nx][ny] === true) map[x][y] -= 1;
            };
        };
    });

    // 1년 추가
    idx ++;
};

console.log(idx)
