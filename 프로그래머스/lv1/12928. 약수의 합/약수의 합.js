function solution(n) {
    var answer = 0;
    var i = 0;
    while(i<=n){
        if(n%i==0){
            answer += i;
        }
        i++;
    }
    
    return answer;
}