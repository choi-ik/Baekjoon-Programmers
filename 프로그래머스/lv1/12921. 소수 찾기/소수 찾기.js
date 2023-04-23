function fun(x){
    for(var i=2; i<=Math.sqrt(x); i++){
        if(x%i==0) return false;
    }
    return true;
}

function solution(n) {
    var answer = 0;
    
    for(var i=2; i<=n; i++){
        if(fun(i)) answer++;
    }
    return answer;
}