function solution(n, m, section) {
    var answer = 0;
    var i=0;
    
    section.forEach((e) => {
        if(e > i){
            answer++;
            i = e + m - 1;
        }
    })
    
    return answer;
}