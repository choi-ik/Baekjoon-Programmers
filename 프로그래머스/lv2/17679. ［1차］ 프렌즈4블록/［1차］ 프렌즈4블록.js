function solution(m, n, board) {
    var answer = 0;
    board = board.map((e) => e.split(""));  // 보드 배열화

    while (true) {
        const block = [];
        
        for (let x = 0; x < m - 1; x ++) {
            for (let y = 0; y < n - 1; y ++) {
                // 2x2 블록을 체크하기 위해 처음 체크하는 블록
                const choice = board[x][y];
                
                // 2x2 블록이 같다면 block에 x, y 좌표 추가
                if (choice && choice === board[x][y + 1] && choice === board[x + 1][y] && choice === board[x + 1][y + 1]) {
                    block.push([x, y]);
                };
            };
        };
        
        // 블록 길이가 0이라면 2x2 블록이 존재 하지 않으므로 최상단 반복문 종료 및 0의 개수 반환
        if (block.length === 0) {
            answer = board.flat().filter((e) => e === 0).length;
            break;
        }
        
        // 2x2 블록 0으로 변경
        block.forEach(([x, y]) => {
            board[x][y] = 0;
            board[x][y + 1] = 0;
            board[x + 1][y] = 0;
            board[x + 1][y + 1] = 0;
        });
        
        
        // 블록 아래로 내리기
        for (let y = 0; y < n; y ++) {
            for (let x = m - 2; x >= 0; x --) {
                for (let k = m - 1; k > x; k --) {
                    if (board[k][y] === 0 && board[x][y] !== 0) {
                        board[k][y] = board[x][y];
                        board[x][y] = 0;
                        break;
                    };
                };
            };
        };
    };
    
    return answer;
}