function solution(s){
    let answer = false;
    let count = 0;
    
    for(let i=0; i<s.length; i++){
        if(count === -1) return false;
        if(s[i] === '(') count++;
        if(s[i] === ')') count--;
        
    }
    
    count === 0 ? answer = true : answer = false;
    console.log(count);
    return answer;
}