function solution(n, computers) {
    let answer = 0;
    let visit = Array.from({length: computers.length}, () => true); // 방문 배열
    
    // 각각의 컴퓨터를 순회하며 방문이 가능하다면 방문 가능한 컴퓨터부터 dfs 탐색을 통해 네트워크 개수 구함
    for (let i = 0; i < computers.length; i ++) {
        // 현재 컴퓨터가 방문할 수 있다면 dfs를 실행 후 반환 받은 방문 배열을 visit에 대입
        if (visit[i]) {
            visit = dfs(i, computers, visit);
            answer ++;
        }
    }
    
    return answer;
};

// dfs 탐색
function dfs(i, computers, visit) {
    // 방문한 컴퓨터를 방문 처리 해주고, 재귀를 통해 변경한 visit 배열을 리턴하여 visit 배열에 넣은 후 리턴
    for (let idx = 0; idx < computers[i].length; idx ++) {
        if (visit[idx] && computers[i][idx] === 1) {
            visit[idx] = false;
            visit = dfs(idx, computers, visit);
        }
    }
    
    return visit;
};