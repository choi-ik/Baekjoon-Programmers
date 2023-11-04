const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const str = input[0].split('')
const stack = []
let count = 1
let result = 0

// 괄호 탐색
for(let i = 0; i < str.length; i ++) {
    const s = str[i]
    const len = stack.length - 1

    // 여는 괄호로 시작할 때 스택에 넣고, *2
    if (s === '(') {
        stack.push(s)
        count *= 2
    }
    // 여는 괄호로 시작할 때 스택에 넣고, *2
    if (s === '[') {
        stack.push(s)
        count *= 3
    }
    // 닫는 괄호 탐색
    if (s === ')') {
        // 괄호 쌍이 맞지 않으면 0 입력
        if (stack[len] !== '(') {
            result = 0
            break;
        }
        // 입력으로 들어온 괄호중 이전 괄호가 짝이 맞다면 결과값에 추가
        if (str[i - 1] === '(') result += count

        // 쌍이 맞지 않을 경우를 제외하고는 괄호 숫자에 맞게 곱해줬던 값을 나눠주고 stack pop()
        count /= 2
        stack.pop()
    }
    // 닫는 괄호 탐색
    if (s === ']') {
        // 괄호 쌍이 맞지 않으면 0 입력
        if (stack[len] !== '[') {
            result = 0
            break;
        }
        // 입력으로 들어온 괄호중 이전 괄호가 짝이 맞다면 결과값에 추가
        if (str[i - 1] === '[') result += count
        
        // 쌍이 맞지 않을 경우를 제외하고는 괄호 숫자에 맞게 곱해줬던 값을 나눠주고 stack pop()
        count /= 3
        stack.pop()
    }
}

stack.length === 0 ? console.log(result) : console.log(0)

