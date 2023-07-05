let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const S = [];
let len = [];   // 두 문자열 길이
for (let i = 0; i < 2; i ++) {
    S.push(" "+input[i].trim());    // 0번째 인덱스에 공백을 추가한 이유는 DP 배열의 0번쨰 인덱스를 모두 0으로 초기화하기 위함
    len.push(S[i].length);
};

let dp = Array.from({length: len[0]}, () => Array.from({length: len[1]}, () => 0));

// LCS 알고리즘
for (let i = 0; i < S[0].length; i ++) {
    for (let j = 0; j < S[1].length; j ++) {
        if (i === 0 || j === 0) dp[i][j] = 0; // [0][0] 마진 처리
        else if (S[0][i] === S[1][j]) dp[i][j] = dp[i-1][j-1] + 1;  // 문자가 같다면 대각선 왼쪽 위 값 + 1
        else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);   // 문자가 다르면 위 왼쪽 값 중 큰 값 대입
    };
};

console.log(dp[len[0] - 1][len[1] - 1]);