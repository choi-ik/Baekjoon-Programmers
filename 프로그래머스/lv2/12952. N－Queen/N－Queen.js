function solution(n) {
    let answer = 0;
    
    // 체스를 놓을 수 있는지 확인
    function check(board, row) {
        for(let i = 1; i < row; i ++) {
            // 같은 열에 체스가 있다면 false
            if (board[i] === board[row]) return false;
            /* 같은 대각선 라인에 체스가 있다면 false -> 대각 위치는 행과 열을 스위칭한 후 빼도 그 값이 같음
            ex) x: 3, y : 2 => |3 - 2| === |2 - 3| 이면 서로 대각 위치임 */
            if (Math.abs(board[i] - board[row]) === Math.abs(i - row)) return false;
        };
        
        return true;
    };
    
    // 체스를 놓을 수 있는 경우의 수를 찾는 함수
    function dfs(board, row) {
        // 체스를 n개 놓을 수 있는 경우의 수를 찾았을 때
        if (row === n) {
            answer ++;
            return;
        };
        
        for (let i = 1; i <= n; i ++) {
            // 체스가 놓여진 다음 행에 체스 놓기
            board[row + 1] = i;
            
            // 다음 행에 체스를 놓을 수 있다면 그 다음 행에 체스를 놓기 위해 재귀 호출
            if (check(board, row + 1)) dfs(board, row + 1);
        }
    }
    
    for (let i = 1; i <=n; i ++) {
        // 게임 보드 n + 1 길이로 생성(계산 편의상)
        let board = Array(n + 1).fill(0);
        // 보드의 시작 행에 체스 놓기
        board[1] = i;
        dfs(board, 1);
    };
    
    return answer;
}