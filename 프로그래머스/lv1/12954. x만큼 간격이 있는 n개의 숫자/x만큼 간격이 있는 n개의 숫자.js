function solution(x, n) {
    var answer = [];
    
    var sum = 0;
    for(var i=0; i<n; i++){
        sum = sum+x;
        answer[i] = sum; 
    }
    
    return answer;
    
}