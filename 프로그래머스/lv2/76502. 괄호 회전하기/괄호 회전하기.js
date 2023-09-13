function solution(s) {
    let answer = 0;
    let x = 0;
    let set = new Set(['()', '[]', '{}'])
    
    while (x < s.length) {
        let stack = [];
        
        // s를 순회하며 스택에 넣고 올바른 괄호라면 스택에서 제거
        for (let i = 0; i < s.length; i ++) {
            stack.push(s[i]);
            
            if (stack.length > 1) {
                for (let j = stack.length - 1; j > 0; j --) {
                    if (set.has(stack[j - 1] + stack[j])) {
                        stack.pop();
                        stack.pop();
                    }
                }
            }
        }
        
        // 만약 괄호가 모두 합쳐서 스택이 비어있다면 answer 증가
        if (stack.length === 0) answer ++;
        
        // 괄호 회전
        let pre = s.slice(0, 1);
        let post = s.slice(1);
        s = post + pre;
        
        x ++;
    }
    
    return answer;
}