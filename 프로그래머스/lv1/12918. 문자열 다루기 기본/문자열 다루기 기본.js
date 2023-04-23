function solution(s) {
    var answer = true;
    const regexp = /[a-zA-Z]/g;
    if(s.length==4 || s.length==6) {
        answer = !(regexp.test(s));
    }else{
        return false;
    }
    return answer;
}