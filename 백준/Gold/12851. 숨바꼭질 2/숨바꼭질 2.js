let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, K] = input.shift().split(" ").map(e => +e);
let map = Array.from({length: 100001}, () => 0);
let queue = [[N, 0]];
let count = Infinity; // 수빈이가 있는 위치에 도착하는 경우의 수 중, 작은 값을 비교하기 위해 무한대로 설정
let answer = 1;
let visit = Array.from({length: 100001}, () => true);
let i = 0;
while (i !== queue.length) {
    // 현재 위치, 이동한 횟수
    const [point, cnt] = queue[i];

    if (cnt > count) break;
    // 방문 처리
    visit[point] = false; 

    // 현재 위치가 수빈이 위치일 때
    if (point === K) {
        if (count === cnt) answer ++;
        // 더 작은 횟수로 업데이트(너비 우선 이므로 가장 먼저 도달한 횟수가 가장 적은 횟수)
        count = Math.min(count, cnt);
    };


    // 큐에 추가하지 않을 조건 (배열 범위를 벗어나거나, 수빈이의 위치를 찾은 경우의 수보다 더 많은 경우의수로 가는 경우)
    if (point - 1 >= 0 && visit[point - 1]) queue.push([point - 1, cnt + 1]);
    if (point + 1 <= 100000 && visit[point + 1]) queue.push([point + 1, cnt + 1]);
    if (point * 2 <= 100000 && visit[point * 2]) queue.push([point * 2, cnt + 1]);
    i ++;
};

console.log(count);
console.log(answer);