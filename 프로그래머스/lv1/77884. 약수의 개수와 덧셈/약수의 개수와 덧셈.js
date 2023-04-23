function solution(left, right) {
    var answer = 0;
    var a = 0;
    var b = 0;
    var num = 0;
    for(var i=left; i<=right; i++){
         num = 0;
        for(var j=1; j<=i; j++){
            if (i % j == 0) num++;
        }
        if(num%2==0) a+=i;
        if(num%2==1) b+=i;
    }
    console.log(num);
    return answer = a-b;
}