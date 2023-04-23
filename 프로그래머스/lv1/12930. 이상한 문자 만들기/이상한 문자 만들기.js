function solution(s) {
    var answer = [];
    var strarr = s.split(" ");
    
    for(var i=0; i<strarr.length; i++){
        answer.push(strarr[i].split("").map((cur, j) => j%2==0 ? cur.toUpperCase() : cur.toLowerCase()).join(''));
    }
    
    return answer.join(" ");
}