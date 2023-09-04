let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
let map = [];
let cheese = []; // 치즈 공간
let air = {}; // 외부 공기 공간
let answer = 0; // 정답 출력
// 상하좌우 탐색하기 위한 변수
let dx = [0, 0, -1, 1];
let dy = [1, -1, 0, 0];

for (let i = 1; i < input.length; i ++) {
    map.push(input[i].split(' ').map((e, j) => {
        // 치즈 좌표 
        if (e === '1') cheese.push([i - 1, j]);
        return Number(e);
    }));
};

// 외부 공기 찾기 위한 bfs 함수
function bfs() {
    // 가장자리 부분은 치즈가 오지 않기 때문에 0,0 부터 탐색 시작
    let queue = [[0, 0]];
    let visit = Array.from({length: N}, () => Array.from({length: M}, () => true)); // bfs를 위한 방문 배열
    air = {}; // 외부 공기 공간 초기화
    
    while (queue.length) {
        const [x, y] = queue.shift();

        for (let i = 0; i < 4; i ++) {
            let nx = x + dx[i];
            let ny = y + dy[i];
            
            if (nx < 0 || nx >= N || ny < 0 || ny >= M || map[nx][ny] === 1 || visit[nx][ny] === false) continue;
            queue.push([nx, ny]);
            air[String(nx) + '-' + String(ny)] = true; // 외부 공기 좌표 딕셔너리에 저장
            visit[nx][ny] = false; // 방문 처리
        }
    };
};
let idx  = 0
// 더 이상 치즈가 존재하지 않을 때까지 반복
while (cheese.length) {
    bfs();

    for (let i = 0; i < cheese.length;) {
        let count = 0;

        for (let j = 0; j < 4; j ++) {
            let nx = cheese[i][0] + dx[j];
            let ny = cheese[i][1] + dy[j];
            
            // 탐색한 곳이 치즈면 다시 탐색
            if (map[nx][ny] === 1) continue;

            // 외부 공기가 존재하는지 확인 후 count 증가
            if (air.hasOwnProperty(String(nx) + '-' + String(ny))) count ++;
        }
        
        // 외부 공기가 2개 이상 접촉될 시 치즈 녹임
        if (count >= 2) {
            map[cheese[i][0]][cheese[i][1]] = 0;
            cheese.splice(i, 1);
            
        }
        else i ++;
    };

    answer ++;
};

console.log(answer)
