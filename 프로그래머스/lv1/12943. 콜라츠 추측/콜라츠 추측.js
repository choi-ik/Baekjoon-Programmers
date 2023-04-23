function solution(num) {
    var answer = 0;
    
    while(num!=1){
        if(num==1) {
            answer = 0;
        }   
        num = num%2==0? num/2 : num*3+1;
        answer++;
    } if(answer>=500) {
        answer = -1;
    }
    
    return answer;
}