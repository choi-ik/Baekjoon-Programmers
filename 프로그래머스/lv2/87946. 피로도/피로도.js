function solution(k, dungeons) {
    let answer = [];
    let visit = new Array(dungeons.length).fill(false);
    
    function DFS(level, health) {
        answer.push(level);
        
        for(let i = 0; i < dungeons.length; i++) {
            if(health >= dungeons[i][0] && visit[i] === false) {
                visit[i] = true;
                DFS(level + 1, health - dungeons[i][1]);
                visit[i] = false;
            }
        }
    }
    
    DFS(0, k);
    return Math.max(...answer);
}