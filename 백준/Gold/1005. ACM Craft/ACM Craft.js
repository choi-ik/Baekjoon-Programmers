let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const T = +input[0];
let answer = "";
let line = 1;

for (let i = 0; i < T; i ++) {
    const [N, K] = input[line].split(" ").map(e => +e);
    const delay = [-1, ...input[line + 1].split(" ").map(e => +e)]; // 건물 짓는 시간
    let dp = [...delay]; // DP: 각 건물의 선행 조건이 포함된 총 시간 배열

    // 위상정렬을 위해 선행되는 건물의 개수를 저장할 배열
    const build = Array.from({length: N + 1}, () => 0); 
    const graph = Array.from({length: N + 1}, () => []);
    
    // 건물들의 선행 순서와 선행 개수를 입력
    for (let j = line + 2; j < line + 2 + K; j ++) {
        const [prev, next] = input[j].split(" ").map(e => +e);
        
        graph[prev].push(next);
        build[next] ++;
    };
    
    // 타겟 건물
    const W = +input[line + 2 + K];
    line = line + 2 + K + 1

    // 위상정렬 시작
    const queue = [];

    // 선행되는 건물이 없는 경우 큐에 삽입(정렬 시작점)
    for (let j = 1; j <= N; j++) {
        if (build[j] === 0) queue.push(j);
    };

    let idx = 0;
    while (idx < queue.length) {
        const cur = queue[idx];

        // 현재 건물을 짓고 난 후, 다음에 지어야 할 건물의 비용 계산 -> 비용이 더 큰 경우만 DP 값 업데이트
        for (let j = 0; j < graph[cur].length; j ++) {
            const next = graph[cur][j];

            dp[next] = Math.max(dp[next], dp[cur] + delay[next]);
            build[next] --;

            if (build[next] === 0) queue.push(next);
        };

        idx ++;
    };

    answer += dp[W] + "\n";
};

console.log(answer.trim());