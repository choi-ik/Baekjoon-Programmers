function solution(a, b, n) {
    var answer = 0;
    var q = n;
    while(q >= a){
        answer += Math.floor(q/a)*b;
        q = Math.floor(q/a)*b + q%a;
    }
    return answer;
}