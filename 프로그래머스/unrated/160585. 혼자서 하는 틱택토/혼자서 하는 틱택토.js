function solution(board) {
    var answer = -1;
    var bingoO = 0;
    var bingoX = 0;
    var O = 0;
    var X = 0;
  
    for(var i=0; i<board.length; i++){
        // 가로 빙고
        if(board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "."){
            if(board[i][0] === "O") bingoO++; // O 빙고
            else bingoX++; // X 빙고
        }
        // 세로 빙고
        if(board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "."){
            if(board[0][i] === "O") bingoO++; // O 빙고
            else bingoX++; // X 빙고
        }
        for(var j=0; j<board[i].length; j++){
            if(board[i][j] === "O") O++; // O 개수
            if(board[i][j] === "X") X++; // X 개수
        }
    }
    
    // 대각 빙고
    if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "."){
        if(board[0][0] === "O") bingoO++;
        else bingoX++;
    }
    // 대각 빙고
    if(board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "."){
        if(board[0][2] === "O") bingoO++;
        else bingoX++;
    }
    console.log(bingoO, bingoX, O, X);
    
    if(bingoO !== 0 && bingoX !== 0) return 0;
    if(bingoO + bingoX > 2) return 0;
    if(O < X || O >= X + 2) return 0;
    if(bingoO !== 0 && O === X) return 0;
    if(bingoX !== 0 && O > X) return 0;
    
    return 1;
}