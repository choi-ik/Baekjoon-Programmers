function solution(s, n) {
    var answer = s.split("").map(i=>{
        if(i==" ") return i;
        return i.toUpperCase().charCodeAt()+n>90? String.fromCharCode(i.charCodeAt()+n-26) : String.fromCharCode(i.charCodeAt()+n)
    }).join("");
    
    return answer;
}