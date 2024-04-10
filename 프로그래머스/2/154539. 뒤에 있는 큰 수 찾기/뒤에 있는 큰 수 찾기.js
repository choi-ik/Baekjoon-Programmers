function solution(numbers) {
    const answer = Array.from({length: numbers.length}, () => -1);
    const stack = [];

    // 뒤에서부터 탐색
    for (let i = numbers.length - 1; i >= 0; i--) {
        while (stack.length !== 0 && numbers[i] >= stack.at(-1)) stack.pop();
        
        if (stack.length !== 0) answer[i] = stack.at(-1);
        stack.push(numbers[i]);
    };
    
    return answer;
}