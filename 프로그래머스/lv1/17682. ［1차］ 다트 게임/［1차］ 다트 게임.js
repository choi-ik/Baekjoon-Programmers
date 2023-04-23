function solution(dartResult) {
    var answer = 0;
    var stack = [];
    var sum = [];
    var dartarr = dartResult.split(""); //dartarr에 dartResult를 쪼개서 배열로 넣어줌

    for(var i=0; i<dartarr.length; i++){
        if(!isNaN(dartarr[i])){ //dartarr[i]의 값이 number라면 ↓
            if(dartarr[i] === "0" && dartarr[i-1] === "1"){ //dartarr[i]가 0, [i-1]이 1이면 ↓
                stack.pop(); //기존에 있던 1 꺼내고
                stack.push(10); //10을 대입
                } else { //10을 넣어줘야 하는 경우가 아니면 ↓
                   if(stack.length > 0) sum.push(stack.pop()); //stack에 대이터가 들어있다면 꺼내고
                    stack.push(+dartarr[i]); //dartarr[i]값을 push 
                }
        }
        if(dartarr[i] == "D") stack[0] = Math.pow(stack[0],2); //stack[0] 을 제곱
        if(dartarr[i] == "T") stack[0] = Math.pow(stack[0],3); //stack[0] 을 세제곱
        if(dartarr[i] == "*") {
            stack[0] = stack[0]*2;
            if(sum.length>0) {
                var s = sum.pop();
                sum.push(s*2);
            }
        }
        if(dartarr[i] == "#") stack[0] = stack[0]*(-1);
    }
    return sum.reduce((acc, cur) => acc + cur, stack[0]);
};