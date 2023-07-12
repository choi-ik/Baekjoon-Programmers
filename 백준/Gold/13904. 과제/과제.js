let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();
let work = input.slice(0, N).map(e => e.split(" ").map(e => +e));
let point = 0;


while (work.length) {
    // 과제 시간순, 시간이 같다면 점수순 오름차순 정렬(뒤에서부터 검사할 것임)
    work.sort((a, b) => {
        if (a[0] === b[0]) return a[1] - b[1];
        else return a[0] - b[0];
    });

    let [day, num] = work.pop(); // 가장 뒷 부분 배열 제거
    if (day === 0) continue; // 남은 날짜가 0일이면 과제를 할 수 없음

    point += num; // 정렬된 상태이므로 가장 큰 값일 것이기 때문에 바로 더해줌

    for (let i = work.length - 1; i >= 0; i --) {
        if (work[i][0] === day) work[i][0] -= 1;
    };
};


console.log(point)