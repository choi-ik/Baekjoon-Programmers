/*
    * 1번 도시에서 출발, 어떤 도시로 가는 과정에서 시간을 무한히 오래 전으로 되돌릴 수 있다면 첫째 줄에 -1 출력.
    * 시간을 무한히 오래 전으로 되돌릴 수 없다면, N-1 개 줄에 걸쳐 2번, 3번 ... N번 도시로 가는 가장 빠른 시간을 순서대로 출력.
    * 만약 해당 도시로 가는 경로 없으면 -1 출력
*/

let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input.shift().split(" ").map(e => +e);
// 시작 도시, 도착 도시, 이동 시간
let [A, B, C] = [0, 0, 0];
let graph = Array.from({length: N + 1}, () => []);
let dist = Array.from({length: N + 1}, () => 10 ** 11);

for (let i = 0; i < M; i ++) {
    [A, B, C] = input[i].split(" ").map(e => +e);

    graph[A].push([B, C]);
};

// 벨만-포드 함수
function BF(start) {
    dist[start] = 0;

    for (let i = 0; i < N; i ++) {
        for (let cur = 1; cur < N + 1; cur ++) {
            for (let [next, cost] of graph[cur]) {
                if (dist[cur] !== 10 ** 11 && dist[next] > dist[cur] + cost) {
                    dist[next] = dist[cur] + cost;

                    // N번 만큼 순회하는데 최단거리가 계속 줄어들면 음수 순환 사이클링이 발생한 것 이므로, true 리턴
                    if (i === N - 1) return true;
                }
            }
        }
    }

    return false;
}

if (BF(1)) console.log(-1);
else {
    for (let i = 2; i < dist.length; i ++) {
        // 만약 해당 도시가 무한대 값이라면, 도시로 갈 수 있는 경로가 없는 것 이므로 -1 출력
        if (dist[i] === 10 ** 11) {
            console.log(-1);
            continue;
        };
        console.log(dist[i]);
    }
}

