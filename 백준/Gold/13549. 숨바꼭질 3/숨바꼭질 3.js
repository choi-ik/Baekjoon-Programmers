let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
let visit = Array.from({length: 1000001}, () => false);


function bfs(n, m) {
    let queue = [[n, 0]];
    visit[n] = true;

    while(queue.length) {
        const [location, time] = queue.shift();
        
        // 동생 위치 찾으면 탐색 종료
        if (location === m) return time;

        for (let next of [location * 2, location - 1, location + 1]) {
            // 수빈과 동생이 존재할 수 있는 위치 및 방문하지 않은 곳이여야만 탐색
            if (!visit[next] && next >= 0 && next <= 100000) {
                // 방문 처리리
                visit[next] = true;

                // *2로 이동할 때는 시간을 증가시키지 않고, 우선순위 반영하여 큐의 맨 앞에 넣음
                if (next === location * 2) queue.unshift([next, time]);
                // X-1, X+1로 이동할 때는 시간을 증가시키고, 큐에 순서대로 넣어준다.
                else queue.push([next, time + 1]);
            }
        }
    }
};

console.log(bfs(N, M));