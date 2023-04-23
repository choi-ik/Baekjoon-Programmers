function solution(n) {
    var answer = 0;
    var sum = 0;
    var str = '';
    answer = n.toString(3)
    for (var i = answer.length-1; i >= 0; i--) {
        str += answer[i]
    }
    
    for (var j = 0; j < str.length; j++) {
        sum += str[j] * Math.pow(3, str.length-(j+1));
    }
    console.log(sum);
    return sum;
}