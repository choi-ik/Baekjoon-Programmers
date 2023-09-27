function solution(n, computers) {
    let answer = 0;
    let visit = Array.from({length: computers.length}, () => true); // 방문 배열
    
    for (let i = 0; i < computers.length; i ++) {
        if (visit[i]) {
            visit = dfs(i, computers, visit);
            answer ++;
        }
    }
    
    return answer;
}

function dfs(i, computers, visit) {
    
    for (let idx = 0; idx < computers[i].length; idx ++) {
        if (visit[idx] && computers[i][idx] === 1) {
            visit[idx] = false;
            visit = dfs(idx, computers, visit);
        }
    }
    
    return visit;
};