function solution(x) {
    var answer = true;
    
    var a = String(x).split("");
    var c = 0;
    for(var i=0; i<a.length; i++){
        c += (Number(a[i]));
    }
    return answer = ((x%c)==0) ? true : false
    //return answer;
}