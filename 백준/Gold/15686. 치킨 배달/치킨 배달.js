let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [N, M] = input[0].split(" ").map(e => +e);
let city = [];
let house = [];
let chicken = [];

// 도시 배열 생성
for (let i = 1; i <= N; i++) {
    city.push(input[i].split(" ").map(e => +e));
};

// 집, 치킨 집 좌표 생성
for (let i = 0; i < N; i ++) {
    for (let j = 0; j < N; j ++) {
       if (city[i][j] === 1) house.push([i, j]);
       if (city[i][j] === 2) chicken.push([i, j])
    };
};

// 조합을 만들기 위한 방문 배열
const check = new Array(chicken.length).fill(false);
// 더 작은 값 비교하기 위해 생성
let answer = Infinity;

// 조건 M에 맞게 조합을 구하는 함수
function getMinDistance() {
    let sum = 0;
    house.forEach(([x, y]) => {
        let min = Infinity;
        chicken.forEach((_, index) => {
            if (check[index] === true) {
                const [nx, ny] = chicken[index];
                min = Math.min(min, Math.abs(x - nx) + Math.abs(y - ny));
            }
        });
        sum += min;
    });
    return sum;
};

// 백트래킹을 위한 재귀 함수
function DFS(idx, cnt) {
    if (cnt === M) {
        answer = Math.min(answer, getMinDistance());
        return;
    } else {
        for (let i = idx; i < chicken.length; i++) {
            if (check[i] === true) continue;
            check[i] = true;
            DFS(i, cnt + 1);
            check[i] = false;
        }
    }
};

DFS(0, 0);
console.log(answer);