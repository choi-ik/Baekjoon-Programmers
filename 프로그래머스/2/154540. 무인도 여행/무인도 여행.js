function solution(maps) {
    const answer = [];
    const row = maps.length;
    const col = maps[0].length;
    let visit = Array.from({length: row}, () => Array(col).fill(true));
    
    maps.forEach((coordinate, i) => {
        for (let j = 0; j < coordinate.length; j ++) {
            if (visit[i][j] === true && maps[i][j] !== 'X') {
                answer.push(BFS(i, j))
            } 
        }
    })
    
    // BFS
    function BFS(cx, cy) {
        const queue = [[cx, cy]];
        const dx = [-1, 1, 0, 0];
        const dy = [0, 0, -1, 1];
        let idx = 0;
        let count = 0;
        
        count += Number(maps[cx][cy]);
        visit[cx][cy] = false;
        
        while (idx < queue.length) {
            const [x, y] = queue[idx];
            
            for (let i = 0; i < 4; i ++) {
                const nx = x + dx[i];
                const ny = y + dy[i];
            
                if (nx >= 0 && nx < row && ny >= 0 && ny < col && visit[nx][ny] && maps[nx][ny] !== 'X') {
                    visit[nx][ny] = false;
                    queue.push([nx, ny]);
                    count += Number(maps[nx][ny]);
                }
            }
            idx ++;
        }
        
        return count;
    };
    
    return answer.length ? answer.sort((a, b) => a - b) : [-1];
}