function solution(maps) {
    const direction = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    
    bfs(0, 0)
    
    function bfs(x, y) {
        const queue = [[x, y]]
        let idx = 0;
  
        while (queue.length > idx) {
            const [cx, cy] = queue[idx];
            
            for (let i = 0; i < direction.length; i ++) {
                const nx = cx + direction[i][0];
                const ny = cy + direction[i][1];
                
                if (nx < 0 || nx >= maps.length || ny < 0 || ny >= maps[0].length) continue;
                if (maps[nx][ny] === 0 || maps[nx][ny] > 1) continue;
                
                maps[nx][ny] = maps[cx][cy] + 1
                queue.push([nx, ny])
            }
            
            idx += 1;
        }
    }
    
    
    return maps[maps.length - 1][maps[0].length - 1] > 1 ? maps[maps.length - 1][maps[0].length - 1] : -1
}