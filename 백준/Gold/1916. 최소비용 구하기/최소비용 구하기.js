let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = [+input[0], +input[1]];
const city = Array.from({length: N + 1} , () => []);
let dist = Array.from({length: N + 1}, () => Infinity); // 최단 경로 저장 할 배열
let visit = Array.from({length: N + 1}, () => false); // 노드 방문 배열

for (let i = 2; i < input.length - 1; i ++) {
    let [start, end, cost] = input[i].split(' ').map(Number);

    city[start].push([end, cost]);
};

// 출발, 도착 도시
const [s, e] = input[input.length - 1].split(' ').map(Number); 

// 방문하지 않은 노드중에서 최단 거리가 가장 짧은 노드의 인덱스 반환
function getSmallNode() {
    let min  = Infinity;
    let idx = 0;

    for (let i in dist) {
        if (!visit[i] && min > dist[i]) {
            min = dist[i];
            idx = i;
        }
    };

    return idx;
};

// 다익스트라 함수
function dijkstra(start) {
    // 시작 노드 초기화
    dist[start] = 0;
    visit[start] = true;

    // 현재 노드에서 이동할 노드까지의 비용 업데이트
    for (let i of city[start]) {
        const [node, cost] = i;
        // 이동할 노드까지의 비용을 더 작은 비용으로 업데이트 
        dist[node] = Math.min(dist[node], cost);
    };

    // 시작 노드를 제외한 전체 노드에 대해 반복
    for (let i = 0; i < N; i ++) {
        // 현재 가장 작은 가중치를 가진 방문하지 않은 인덱스 get
        const cur = +getSmallNode();
        visit[cur] = true;

        for (let j of city[cur]) {
            const [node, cost] = [j[0], dist[cur] + j[1]];

            // 더 작은 비용 입력
            dist[node] = Math.min(dist[node], cost);
        };
    };
};

dijkstra(s);
console.log(dist[e]);
