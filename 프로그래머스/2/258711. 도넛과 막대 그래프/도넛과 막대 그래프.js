function solution(edges) {
    let answer = [0, 0, 0, 0]; // 정점, 도넛, 막대, 8자
    let nodeObj = {}; 
    
    // 객체 형태로 노드와 간선 생성
    for (const [a, b] of edges) {
        if (!nodeObj[a]) nodeObj[a] = [0, 0];
        if (!nodeObj[b]) nodeObj[b] = [0, 0];
        
        nodeObj[a][0] += 1;
        nodeObj[b][1] += 1;
    };
    
    for (const key in nodeObj) {
        const edge = nodeObj[key];
        
        if (edge[0] >= 2 && edge[1] ===0) answer[0] = Number(key);
        else if (edge[0] === 0 && edge[1] >= 1) answer[2]++;
        else if (edge[0] >= 2 && edge[1] >= 2) answer[3]++;
    }
    
    answer[1] = nodeObj[answer[0]][0] - answer[2] - answer[3];
    
    return answer;
}