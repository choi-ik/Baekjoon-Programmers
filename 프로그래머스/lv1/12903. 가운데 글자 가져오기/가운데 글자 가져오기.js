function solution(s) {
    var answer = s.length % 2;
    if(answer == 1) {
     s = s[parseInt(s.length/2)];
    } else {
      s = s[parseInt(s.length/2)-1] + s[parseInt(s.length/2)];
    }
    return s;
}