function solution(s) {
    let sArr = s.split("");
    let stack = [];
    
    for (let i = sArr.length - 1; i >= 0; i--) {
        if (sArr[i] === stack[stack.length - 1]) stack.pop(); 
        else stack.push(sArr[i])
    };

    return stack.length === 0 ? 1 : 0

}