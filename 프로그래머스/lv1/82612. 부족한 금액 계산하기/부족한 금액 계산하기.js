function solution(price, money, count) {
    var answer = 0;
    for(var i=0; i<count; i++){
        answer = answer + price * (i+1);
    }
    answer = answer - money
    if(answer <= 0){
        answer = 0;
    }

    return answer;
}