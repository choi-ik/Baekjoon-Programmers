let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const T = +input.shift();
const river = input.slice(0, T).map(e => e.split(" ").map(e => +e));

function factorial(n) {
    let num = 1;

    for (let i = 1; i <= n; i ++) {
        num *= i;
    };

    return num;
}

// M 개의 지역에 n개의 다리를 놓을 수 있는 경우의 수를 구해야 함
// mCn으로 표현, 답 = M! / (M-N)! * N! 
river.forEach(([N, M]) => {
    console.log(Math.round(factorial(M) / (factorial(M-N) * factorial(N)))); 
});