function solution(n, computers) {
    let answer = 0;
    let visited = new Array(computers.length).fill(false);

    function DFS(i) {
        visited[i] = true;
        for(let j=0; j<computers[i].length; j++) {
            if(computers[i][j] === 1 && visited[j] === false) {
                DFS(j);
            }
        }
    }
    
    for(let i=0; i<n; i++) {
        if(visited[i] === false) {
            DFS(i);
            answer++;
        }
    };
    
    console.log(computers);
    console.log(answer)
    return answer;
}