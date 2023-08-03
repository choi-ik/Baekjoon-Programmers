let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const T = +input[0];
const str = input.slice(1, 1 + T);
// 0 -> 회문, 1 -> 유사 회문, 2 -> 일반 문자열
let answer = "";

function pallindrome(s, l, r, check) {
    // 투포인터
    while (l < r) {
        // 비교하는 문자가 서로 같다면 하나씩 범위 좁힙
        if (s[l] === s[r]) {
            l ++;
            r --;
        }

        // 비교하는 문자가 서로 다를 때
        else {
            // 문자 삭제를 한번도 안한 경우
            if (check === 0) {
                // left를 +1, right - 1 한 경우를 각각 구하기 (1번 삭제 했으므로 결과가 둘 중 하나라도 유사회문이 된다면 1 리턴)
                if (pallindrome(s, l + 1, r, check + 1) === 0 || pallindrome(s, l, r - 1, check + 1) === 0) return 1;
                // 둘다 유사회문조차 되지 않는 경우
                else return 2;
            } 
            // 문자 삭제를 이미 한번 했다면 일반 문자열(2) 리턴
            else {
                return 2;
            }
        }
    };

    // 회문이 되는 경우
    return 0;
};

str.forEach((s) => {
    // 공백 제거
    s = s.trim(); 
    answer += pallindrome(s, 0, s.length - 1, 0) + "\n";
});

console.log(answer.trim());

