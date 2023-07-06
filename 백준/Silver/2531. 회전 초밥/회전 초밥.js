let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, d, k, c] = input.shift().split(" ").map(e => +e);
const sushi = input.slice(0, N).map(e => +e);
sushi.push(...sushi.slice(0, k - 1));    // 회전 초밥이기 때문에 초밥 길이 - k + 1 번째 인덱스부터 0 + k - 1 지점까지 탐색하기 위함

let check = Array.from({length: d + 1}, () => 0);
check[c] = 1;   // C 초밥은 하나 먹은 것으로 체크

let kind = 1;   // 하나 먹고 시작했으니 먹은 초밥 개수는 1개부터 시작

/* 최초 k개의 초밥을 먼저 확인. 처음 먹는 종류 -> check 배열의 값이 0인 경우에만 kind를 1 증가.
    그렇지 않은 경우 check 배열의 값만 증가
*/
for (let i = 0; i < k; i ++) {   
    if (check[sushi[i]] === 0) {
        check[sushi[i]] = 1;
        kind ++;
    } else check[sushi[i]] ++;
}

let max = kind; // 최초 k개 초밥 가지수를 대입

// 위에서 k-1 까지 한번 체크를 했으니 k부터 다시 탐색
for (let i = k; i < sushi.length; i ++) {
    check[sushi[i-k]] --;   // 가장 앞의 초밥의 체크 배열 1 감소

    if (check[sushi[i-k]] === 0) kind --;    // 해당 값이 0 이면 한 번만 먹은 초밥 종류 였다는 의미로 먹은 초밥 개수 1 감소
    check[sushi[i]] ++; // 새로운 초밥의 체크배열 1증가
    
    if (check[sushi[i]] === 1 && check[sushi[i]] !== c) kind ++;    //  해당 값이 1이고, 서비스 초밥이 아니라면 처음 먹는 초밥 종류라는 의미로 먹은 초밥 개수 1 증가 

    max = Math.max(max, kind);
}

console.log(max)