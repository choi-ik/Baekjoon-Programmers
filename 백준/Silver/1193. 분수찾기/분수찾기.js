let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString();

const N = +input;
let arr = [1, 1];

for(let i = 1; i < N;) {
    // 0번 인덱스 1, 1번 인덱스 홀수
    if (arr[0] === 1 && (arr[1] % 2 === 1)){
        arr[1] += 1;
        i++;
    }

    // 0번 인덱스 1, 1번 인덱스 짝수
    else if (arr[0] === 1 && arr[1] % 2 === 0) {
        for (let j = arr[1]; j > 1; j--) {
            if (i === N) break;

            arr[0] += 1;
            arr[1] -= 1;
            i++;
        }
    }

    // 0번 인덱스 짝수, 1번 인덱스 1
    else if (arr[0] % 2 === 0 && arr[1] === 1) {
        arr[0] += 1;
        i++;
    }

    // 0번 인덱스 홀수, 1번 인덱스 1
    else if (arr[0] % 2 === 1 && arr[1] === 1) {
        for (let k = arr[0]; k > 1; k--) {
            if (i === N) break;

            arr[0] -= 1;
            arr[1] += 1;
            i++;
        }
    }
}

console.log(String(arr[0])+"/"+String(arr[1]));