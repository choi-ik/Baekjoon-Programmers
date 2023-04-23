function solution(board, moves) {
    var result = 0;
    
    var basket = [];
    
    for (var i=0; i<moves.length; i++) {
        var crane = moves[i]-1;
        for (var j=0; j<board.length; j++) {
            if (board[j][crane] !== 0) {
                if (basket[basket.length -1] === board[j][crane]) {
                    basket.pop();
                    result += 2;
                } else {
                    basket.push(board[j][crane]);
                }
                board[j][crane] = 0;
                break;
            }
        }
    }
    return result;
}