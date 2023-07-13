let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const str = input.shift().trim().split(""); // 일반 문자열
const bomb= input.shift().trim(); // 폭탄 문자열

let stack = []; // 문자열 비교를 위한 스택

// 스택에 문자를 넣으며 폭탄 문자열의 마지막 문자와 비교해 마지막 문자와 같다면 뒤에서부터 검사
str.forEach((s) => {
    stack.push(s); // 우선 들어온 문자를 stack에 넣기
    if(s === bomb[bomb.length - 1]) { // 들어온 문자가 폭탄문자열의 마지막 문자열과 같으면
        if (stack.slice(stack.length - bomb.length, stack.length).join("") == bomb) { // 스택을 뒤에서부터 탐색하여 폭탄 문자열과 같다면 슬라이싱
            stack.splice(-bomb.length, bomb.length);
        }
    }
});

// 스택이 비어있다면 FRULA 출력, 비어있지 않다면 이어붙혀서 출력
if (stack.length === 0) console.log("FRULA");
else console.log(stack.join(""));