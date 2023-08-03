let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let str = input[0];

let idx = 0;
let check = true;

// 1번 조합 100~|1~, 2번 조합 01
while (idx < str.length && check) {
    // 0으로 시작할 때
    if (str[idx] === '0') {
        // 2번 조합에 해당하지 않으므로 종료
        if (idx + 1 < str.length && str[idx + 1] === '1') idx += 2;
        // 2번 조합에 해당한다면 인덱스를 +2 함
        else check = false;
    }

    // 1로 시작할 때
    else {
        let zeroCnt = 0;
        idx ++;
        
        // 1번 조건 100~1 부분 검사
        while (idx < str.length && str[idx] === '0') {
            zeroCnt ++;
            idx ++;
        };


        // 0의 개수가 2보다 적거나, 1을 찾지 못한채 문자열 끝에 도달하게 될 때 
        if (zeroCnt < 2 || idx === str.length) check = false;
        else {
            idx ++;
            while (1) {
                if (idx >= str.length || str[idx] === '0') break;
                if (idx + 2 < str.length && str.slice(idx, idx + 3) === '100') break;

                idx ++;
            };
        };
    };
};

console.log(check === true ? 'SUBMARINE' : 'NOISE');