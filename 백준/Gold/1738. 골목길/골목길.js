/*
    * 민승이네 집에서 코레스코 콘도까지 가기 위해 얽혀있는 골목길들 통과.
    * 길을 가다 깡패에세 금품을 갈취 당하거나 => 음수, 흘린 금품을 주워 금품을 획득 => 양수 , 한 번 지나간 길을 다시 방문해도 갈취당하거나 획득함.
    * 골목길 연결 상태, 갈취 또는 획득하게 되는 금품의 양이 주어졌을때, 최대한 유리한 경로를 따라 콘도로 가기 위해 어떻게 해야하는지.
    * 보유중인 금품의 양이 음수가 될 수 있음. 금품의 양이 최대가 되는 것이 최적의 경로
    * 출발은 민승이네 집.
    * 골목길은 기본적으로 모두 일방통행.
    * 최적의 경로가 존재하지 않으면 -1 출력
    * 존재하면, 교차점들이 번호를 공백을 두고 출력.
    * 민승이네 집은 1번 교차점, 콘도는 N번 교차점.
*/

let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input.shift().split(" ").map(e => +e);
// 출발 지점, 도착 지점, 금품의 양(양수 획득, 음수 갈취)
let [U, V, W] = [0, 0, 0];
let graph = Array.from({length: N + 1}, () => []);
// 최장 거리를 업데이트 하기 위해 음의 무한대로 거리 값을 초기화
let dist = Array.from({length: N + 1}, () => -(10 ** 12));
// paht는 집에서부터 콘도까지 이어지는 노드의 번호 배열
let path = Array.from({length: N + 1}, () => 0);


for (let i = 0; i < M; i ++) {
    [U, V, W] = input[i].split(" ").map(e => +e);

    // 주어지는 골목길은 모두 일방 통행이기 때문에 양방향이 아님
    graph[U].push([V, W]);
};


// 벨만-포드 함수
function BF(start) {
    dist[start] = 0;

    for (let i = 0; i < N; i ++) {
        for (let cur = 1; cur < N + 1; cur ++) {
            for (let [next, cost] of graph[cur]) {
                // 최장 거리를 구해야 함으로 다음 노드가 현재 노드보다 가중치가 적을때 큰 가중치 값을 넣어주는 로직
                if (dist[cur] !== -(10 ** 12) && dist[next] < dist[cur] + cost) {
                    dist[next] = dist[cur] + cost;
                    path[next] = cur;

                    // 사이클이 존재한다면 해당 노드에 대한 거리 값 양의 무한대로 표시
                    if (i === N - 1) dist[next] = 10 ** 12;
                }
            }
        }
    };

    let result = [];
    // 도착 노드(콘도)
    let curNode = N;

    // 콘도의 가중치가 무한대라면 사이클이 존재하여  출력
    if (dist[N] === 10 ** 12) {
        console.log(-1);
        return;
    };

    // path에 들어있는 숫자를 뒤에서부터 순서대로 result에 넣어줌
    while (curNode !== 0) {
        result.push(curNode);
        curNode = path[curNode];
    };

    result = result.reverse();
    console.log(result.join(" "));
};

BF(1);
