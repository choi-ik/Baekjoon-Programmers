let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, d, k, c] = input.shift().split(" ").map(e => +e);
const sushi = input.slice(0, N).map(e => +e);
sushi.push(...sushi.slice(0, k - 1));    // 회전 초밥이기 때문에 초밥 길이 - k + 1 번째 인덱스부터 0 + k - 1 지점까지 탐색하기 위함
let s = 0;
let e = 0;
let maxSushi = 0;


while (s <= sushi.length) {
    if (e - s < k) e ++; // 시작 지점과 종단 지점의 길이가 K보다 작을 때
    else if (e - s === k) { // 시작 지점과 종단 지점의 길이가 K일 때
        let tempSushi = [...sushi.slice(s, e), c];  // 서비스 초밥을 추가한 스시를
        let temp = new Set(tempSushi)   // set 함수에 넣어 중복을 제거함
        s ++;

        if (temp.size > maxSushi) maxSushi = temp.size; // 중복이 제거된 초밥 가지수 최대값으로 업데이트
    }
};

console.log(maxSushi)