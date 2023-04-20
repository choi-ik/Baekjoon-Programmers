function solution(s) {
    var answer = [];
    var sArr = [...s];
    
    for(var i=0; i<sArr.length; i++){
        if(i === 0){
            answer.push(-1);
        }else{
            for(var j=i-1; j>=0; j--){
                if(sArr[j] === sArr[i]){
                    answer.push(i-j);
                    break;
                }else if(j === 0){
                    if(sArr[j] !== sArr[i]) answer.push(-1);
                }
            }
        }
    }
    return answer;
}