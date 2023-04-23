function solution(absolutes, signs) {
    var answer = 0;
    
    for (var i=0; i<absolutes.length; i++) {
        if (signs[i] == true) {
            absolutes[i] = absolutes[i] * 1;
        } else {
           absolutes[i] = absolutes[i] * (-1); 
        }
        answer += absolutes[i];
    }
    return answer;
}