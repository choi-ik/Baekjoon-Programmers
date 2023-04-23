function solution(numbers, hand) {
    var answer = "";
    var left = "*";
    var right = "#";
    var myHand = "";
    
    hand === "right" ? myHand = "R" : myHand = "L"; 
    
    numbers.map((e) => {
        if(e === 1 || e === 4 || e === 7) {
            answer += "L";
            left = e;
        }else if(e === 3 || e === 6 || e === 9){
            answer += "R";
            right = e;
        }else if(e === 2 || e === 5 || e === 8 || e === 0){
            var leftPad = touchPad(left);
            var rightPad= touchPad(right);
            var center = touchPad(e);
            
            let l = Math.abs(leftPad[0] - center[0]) + Math.abs(leftPad[1] - center[1]);
            let r = Math.abs(rightPad[0] - center[0]) + Math.abs(rightPad[1] - center[1]);
            
            if(l === r){
                answer += myHand;
                myHand === "R" ? right = e : left = e
            }else if(l > r){
                answer += "R";
                right = e;
            }else if(l < r){
                answer += "L";
                left = e;
            }
        }
    })
    
    return answer;
}

function touchPad(pad) {
    var keyPad = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ["*", 0, "#"]];
    for(var i=0; i<4; i++){
        for(var j=0; j<3; j++){
            if(keyPad[i][j] === pad) return [i,j];
        }
    }
}