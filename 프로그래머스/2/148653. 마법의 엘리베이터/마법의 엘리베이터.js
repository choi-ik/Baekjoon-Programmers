function solution(storey) {
    let answer = 0;
    
    while(storey !== 0) {
        const remainder = storey % 10;
        
        if (remainder < 5) answer += remainder;
        else if (remainder > 5)  {
            answer += 10 - remainder;
            storey += 10 - remainder;
        } else {
            let tempRemainder = Math.floor(storey / 10);
            tempRemainder = tempRemainder % 10;
            
            if (tempRemainder < 5) answer += remainder;
            else if (tempRemainder >= 5) {
                answer += 10 - remainder;
                storey += 10 - remainder;
            }
        } 
        
        storey = Math.floor(storey / 10);
    }
    
    return answer;
}