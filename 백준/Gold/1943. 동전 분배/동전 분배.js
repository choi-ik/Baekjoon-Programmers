let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let idx = 0;
while (idx < input.length) {
    const N = +input[idx];
    let coin = []; // [금액, 동전 갯수]
    let total = 0; // 총 금액의 반절
    
    for (let i = idx + 1; i < idx + 1 + N; i ++) {
        let temp = input[i].split(" ").map(Number);
        coin.push(temp);
        total += temp[0] * temp[1];
    };
    
    // 총액의 반절이 홀수라면 애초에 동등하게 나눌 수 없다.
    if (total % 2 !== 0) console.log(0)
    else {
        total = Math.floor(total / 2);
        let dp = Array(total + 1).fill(0);
        dp[0] = 1; // 0원은 무조건 만들 수 있기에 1을 대입

        coin.forEach(([money, cnt]) => {
            // Top-Down 방식으로 탐색
            for (let i = total; i >= money; i --) {
                if (dp[i - money]) { // 인덱스 - 동전이 true라면 주어진 동전들로 만들어 낼 수 있다는 의미
                    dp[i] = 1; // 나에겐 동전이 있으니 현재 인덱스 true 설정

                    // 현재 동전의 갯수만큼 현재 동전으로 만들 수 있는 경우의 수들을 true 설정
                    for (let j = 1; j < cnt; j ++) {
                        if ((i + (money * j)) <= total) dp[i + money * j] = 1;
                        else break;
                    };
                };
            };
        });

        console.log(dp[total]);
    };

    idx += N + 1;
};