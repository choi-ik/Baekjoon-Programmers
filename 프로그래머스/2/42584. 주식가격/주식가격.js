function solution(prices) {
    const answer = [];
    const stack = [];
    
    for (let i = 0; i < prices.length; i ++) {
        while (stack.length && prices[i] < prices[stack[stack.length - 1]]) {
            const j = stack.pop();
            answer[j] = i - j;
        }
        
        stack.push(i);
    }
    
    while (stack.length) {
        const j = stack.pop();
        answer[j] = prices.length - 1 - j;
    }
    
    return answer;
}