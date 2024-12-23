function solution(n, computers) {
    const visit = Array(n).fill(1);
    let answer = 0;
    
    for (let i = 0; i < n; i ++) {
        if (visit[i]) {
            answer += 1;
            dfs(i)
        }
        
    }
    
    function dfs(num) {
        computers[num].forEach((computer, idx) => {
            if (num !== idx && computer === 1 && visit[idx]) {
                visit[idx] = 0;
                dfs(idx)
            }
        })
    }
  
    return answer;
}