function solution(maps) {
    let answer = 0;
    let start = [];
    let lever = [];
 
    // 시작 위치 구하기
    maps.forEach((row, idx) => {
        const x = row.indexOf('S');
        const l = row.indexOf('L');
        
        if (x !== -1) start = [[idx, x]];
        if (l !== -1) lever = [[idx, l]];
    });
    
    answer += BFS('L', start);
    answer += BFS('E', lever)
    
    function BFS(point, queue) {
        const dx = [0, 0, -1, 1];
        const dy = [1, -1, 0, 0];
        const map = Array.from({length: maps.length}, () => Array(maps[0].length).fill(0))
        const visit = Array.from({length: maps.length}, () => Array(maps[0].length).fill(true))
        let idx = 0;
        
        while (idx < queue.length) {
            const [x, y] = queue[idx];
            if (maps[x][y] === point) return map[x][y];
            
            for (let i = 0; i < 4; i ++) {
                const nx = x + dx[i];
                const ny = y + dy[i];
                
                if (nx < 0 || nx >= maps.length || ny < 0 || ny >= maps[0].length || maps[nx][ny] === 'X' || !visit[nx][ny]) continue;
                
                map[nx][ny] = map[x][y] + 1;
                visit[nx][ny] = false;
                queue.push([nx, ny])
            }
            
            idx ++;
        };       
    };
    
    return answer || -1;
}