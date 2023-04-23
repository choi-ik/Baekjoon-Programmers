function solution(n) {
    var answer = [];
    for(var i=1; i<=n; i++){
        answer[i] = i%2==0 ? "박" : "수";
    }
    
    return answer.join("");
}