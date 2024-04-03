/** 
    각 방향으로 장애물 또는 벽에 부딪힐 때까지 계속 직진 -> 방향 설정 후 while로 계속 직진
*/
function solution(board) {
    let answer = 0;
    let queue = [];
    const dx = [0, 0, -1, 1];
    const dy = [1, -1, 0, 0];
    const visit = Array.from({length: board.length}, () => Array(board[0].length).fill(99999999999));
    
    // 시작 지점 찾아 queue에 좌표와 이동 횟수 입력
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j ++) {
            if (board[i][j] === 'R') {
                queue = [[i, j, 0]];
                break;
            }
        }
    }
    
    let idx = 0;
    while(idx < queue.length) {
        const [x, y, count] = queue[idx];
        
        // 목표 위치 도착
        if (board[x][y] === 'G') return count;
        
        // 4방향 이동
        for (let i = 0; i < 4; i ++) {
            let nx = x;
            let ny = y;
            
            // 직진 방향으로 계속 탐색
            while (0 <= nx + dx[i] && board.length > nx + dx[i] && 0 <= ny + dy[i] && board[0].length > ny + dy[i] && board[nx + dx[i]][ny + dy[i]] !== 'D') {
                nx += dx[i];
                ny += dy[i];
            }
            
            if (visit[nx][ny] > count + 1) {
                visit[nx][ny] = count + 1;
                queue.push([nx, ny, count + 1])
            } 
        }
        
        idx++;
    }
    
    return -1
}