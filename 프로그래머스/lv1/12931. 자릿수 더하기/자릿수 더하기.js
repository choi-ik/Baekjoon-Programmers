function solution(n)
{
    var answer = 0;
    var arr = n.toString().split("").map(arr => arr*1);
    for(var i=0; i<arr.length; i++){
        answer += arr[i];
    }

    return answer;
}