function solution(n) {
    var answer = 0;
    var i = 1;
    while(n>=i){
        if(i*i==n){
            return answer = (i+1)*(i+1);
        }if(i==n){
            return -1;
        }
        i++;
    }
    //return answer;
}