function solution(board) {
    // 상 우 하 좌
    const dx = [-1, 0, 1, 0];
    const dy = [0, 1, 0, -1];
    const n = board.length;
    let cost = Array.from({length: n}, () => Array(n).fill(Infinity));
    let answer = 0;
    
    function bfs() {
        const q = [[0, 0, 0, -1]]; // [y, x, 비용, 방향]
        cost[0][0] = 0;
        
        let idx = 0;
        while (idx < q.length) {
            const [x, y, price, direction] = q[idx];
            
            // 4방향 탐색
            for (let i = 0; i < 4; i ++) {
                const nx = x + dx[i];
                const ny = y + dy[i];
                
                if (0 <= nx && nx < n && 0 <= ny && ny < n && board[nx][ny] !== 1) {
                    if ((direction === -1 || direction === i) && price + 100 <= cost[nx][ny]) {
                        cost[nx][ny] = price + 100;
                        q.push([nx, ny, price + 100, i]);
                    } else if (price + 600 <= cost[nx][ny] + 400) {
                        cost[nx][ny] = price + 600;
                        q.push([nx, ny, price + 600, i]);
                    }
                }
            }
            
            idx ++;
        }
    };
    
    bfs();
    console.log(cost)
    return cost[n - 1][n - 1];
}