let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();
let fishbowl = input.slice(0, N).map(e => e.split(" ").map(e => +e));
let x = 0;
let y = 0;
let sharkSize = 2;

for (let i = 0; i < N; i ++) {
    for (let j = 0; j < N; j ++) {
        if (fishbowl[i][j] === 9) {
            x = i;
            y = j;
        }
    };
};


function BFS(a, b, shark) {
    // 상 하 좌 우
    let dx = [-1, 1, 0, 0];
    let dy = [0, 0, -1, 1];
    let v = Array.from({length: N}, () => Array.from({length: N}, () => true)); // 방문 배열
    let dist = Array.from({length: N}, () => Array.from({length: N}, () => 0)); // 거리 배열열
    let temp = []; // 상어가 먹을 수 있는 물고기가 있는 배열
    let queue = [[a, b]]; // x, y 좌표
    v[a][b] = false; // 방문 처리

    while (queue.length) {
        const [x, y] = queue.shift();

        for (let i = 0; i < 4; i ++) {
            let nx = x + dx[i];
            let ny = y + dy[i];

           if (0 <= nx && nx < N && 0 <= ny && ny < N && v[nx][ny] === true) {
                if (fishbowl[nx][ny] <= shark) {
                    queue.push([nx, ny]);
                    v[nx][ny] = false; // 방문 처리
                    dist[nx][ny] = dist[x][y] + 1; // 거리 증가

                    if (fishbowl[nx][ny] < shark && fishbowl[nx][ny] !== 0) {
                        temp.push([nx, ny, dist[nx][ny]]);
                    };
                };
            };
        };
    };

    // 거리가 가까운 물고기가 많을때, 가장 위에 있는 물고기, 가장 위에 있는 물고기도 많으면 가장 왼쪽에 있는 물고기 먹음
    temp.sort((a, b) =>  { // 정렬을 내림차순으로 하여, 이후 탐색시 pop() 메소드를 통해 배열 재정렬 방지
        if (b[2] === a[2]) {
            if (b[0] === a[0]) return b[1] - a[1];
            return b[0] - a[0];
        }
        return b[2] - a[2];
    });

    return temp;
};

let count = 0; // 먹은 물고기 개수
let result = 0; // 답


while (true) {
    let shark = BFS(x, y, sharkSize);
    if (shark.length === 0) break; // 더 이상 먹을수 있는 물고기가 없다면 반복 종료

    const [nx, ny, dist] = shark.pop();

    result += dist;
    fishbowl[x][y] = 0 // 상어가 있던 자리 빈칸으로 변경
    fishbowl[nx][ny] = 0 // 먹은 물고기 빈칸 처리

    // 다시 탐색을 시작할 x,y 값을 먹은 물고기가 있던 자리로 이동
    x = nx
    y = ny; 
    count += 1;

    if (count === sharkSize) { // 상어 크기 만큼 물고기를 먹었을시 상어 몸집 + 1
        sharkSize += 1;
        count = 0;
    };
}

console.log(result);