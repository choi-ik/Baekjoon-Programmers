function solution(maps) {
    let answer = [];
    
    // 이동 할 네 가지 방향 정의 (상->하->좌->우) 순서
    let dx = [-1, 1, 0, 0];
    let dy = [0, 0, -1, 1];
    
    function BFS(x, y) {
        let queue = [[x,y]];

        while(queue.length > 0) {
            const [x1, y1] = queue.shift();
            
            for(let i=0; i<4; i++) {
                let nx = x1 + dx[i];
                let ny = y1 + dy[i];
                // 배열을 벗어날 경우 무시하기
                if(nx < 0 || nx > maps.length-1 || ny < 0 || ny > maps[0].length-1) continue;
                
                // 벽을 만난 경우 무시
                if(maps[nx][ny] === 0) continue;
                
                // 해당 노드를 처음 방문할 때만 최단 거리 기록
                if(maps[nx][ny] === 1) {
                    maps[nx][ny] = maps[x1][y1] + 1;
                    queue.push([nx, ny]);
                }
            }
        }
        return maps[maps.length-1][maps[0].length-1];
    }
    BFS(0,0);
    if(maps[maps.length-1][maps[0].length-1] === 1) return -1;

    return BFS(0, 0);
    
}