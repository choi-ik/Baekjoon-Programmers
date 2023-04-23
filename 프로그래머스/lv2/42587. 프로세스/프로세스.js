function solution(priorities, location) {
    let answer = 0;
    let index = 0;
    
    while(true){
        let num = priorities.shift();
        
        if(num < Math.max(...priorities)){
            priorities.push(num);
            if(location === 0) {
                location = priorities.length - 1;
            }
            else location--;
        }else{
            answer++;
            if(location === 0) break;
            else location --;
        }
    }
    return answer;
}