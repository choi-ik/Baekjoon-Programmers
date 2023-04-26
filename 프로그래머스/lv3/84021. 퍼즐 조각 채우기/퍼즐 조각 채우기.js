function solution(game_board, table) {
    let answer = 0;
    
    /*  퍼즐 조각 모양 저장하기 
        game_board와 table모두 BFS 함수를 이용해 블록 찾아서 그 블록의 위치 return */
    function BFS(start, board, value) {
        let queue = [start]
        let puzzle = [];
        
        /* 상하 좌우 변수 */
        let dx = [-1, 1, 0, 0];
        let dy = [0, 0, -1, 1];
        
        while(queue.length > 0) {
            let [x, y] = queue.shift();
            puzzle.push([x, y]);
            // board[x][y] = value;

            for(let i=0; i<4; i++) {
                let nx = x + dx[i];
                let ny = y + dy[i];
                
                if(nx < 0 || nx >= game_board.length || ny < 0 || ny >= game_board[0].length) continue;
                if(board[nx][ny] === value) continue; 
                else {
                    queue.push([nx, ny]);
                    board[nx][ny] = value;
                }
            }
        }
        return movePuzzle(puzzle);
    };
    
    /* 블록 좌표 기준점 통일시키기 */
    function movePuzzle(puzzle) {
        /* minX와 minY에 가장 작은 x와 y를 집어넣고 x좌표에는 minX를 빼고, y좌표에는 minY를 빼서 리턴하면 (0,0) 기준으로 통일시킬 수 있음 */
        let minX = Math.min(...puzzle.map(v => v[0]));
        let minY = Math.min(...puzzle.map(v => v[1]));
        
        return puzzle.map((v) => [v[0] - minX, v[1] - minY]).sort();
    };
    
    /* 게임보드 퍼즐과 맞추기 위한 블록 회전 */
    function rotation(puzzle) {
        /* 가장 큰 수를 뽑아 각 배열의 1번 인덱스에 max를 빼준뒤 0번 인덱스로 바꿔주고, 0번 인덱스를 1번 인덱스에 넣어주면 왼쪽으로 회전 */
        let max = Math.max(...puzzle.map(v => Math.max(v[0], v[1])));
        let rotationPuzzle = puzzle.map(v => [max - v[1], v[0]]);
        
        return movePuzzle(rotationPuzzle);
    };
    
    /* 블록 비교하기  */
    let gameBlock = []; // 게임 보드 속 블록(0)
    let tableBlock = []; // 테이블 속 블록(1)
    
    for(let i=0; i<game_board.length; i++) {
        for(let j=0; j<game_board.length; j++) {
            if(game_board[i][j] === 0) {
                game_board[i][j] = 1;
                gameBlock.push(BFS([i,j], game_board, 1));
            }
            if(table[i][j] === 1) {
                table[i][j] = 0;
                tableBlock.push(BFS([i,j], table, 0));
            } 
        }
    };
    // console.log("GB : ", gameBlock)
    // console.log("TB : ", tableBlock)
    
    tableBlock.map((tb) => {
        for(let j=0; j<gameBlock.length; j++) {
            let match = false;
            for(let i=0; i<4; i++) {
                tb = rotation(tb)
                if(JSON.stringify(tb) === JSON.stringify(gameBlock[j])) {
                    gameBlock.splice(j, 1);
                    answer += tb.length;
                    match = true;
                    break;
                }
            }
            if(match) return false;
        };
    });
    
    return answer;
}