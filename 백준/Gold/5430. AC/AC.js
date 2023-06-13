let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const T = +input.shift();

for (let i = 0; i < input.length; i += 3) {
    let P = input[i].split("");
    let arr = JSON.parse(input[i+2]);
    let isError = false; // 에러 확인
    let isReverse = false; // 배열 뒤집기

    for (let value of P) {
        if (value === "R") isReverse = !isReverse;
        else if (value === "D") {
            if (arr.length > 0) {
                // isReverse가 true이면 뒤에서 제거
                if (isReverse) arr.pop();
                else arr.shift();
            } else {
                isError = !isError;
                break;
            }
        }
    }

    if (isError) console.log("error");
    else {
        if (isReverse) console.log(JSON.stringify(arr.reverse()));
        else console.log(JSON.stringify(arr));
    }
};