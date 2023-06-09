let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const N = +input[0];
let numArr = [];
let frequency = new Object();
let freArr = [];

for(let i = 1; i <= N; i++) {
    numArr.push(+input[i]);
};

let average = numArr.reduce((a, b) => a + b, 0);  // 평균 값
let center = numArr.sort((a, b) => a - b);  // 중간 값

// 빈도 수
numArr.map((e) => {
    if (!frequency[e]) frequency[e] = 1;
    else frequency[e] += 1;
});

// 빈도 수
for (let key in frequency) freArr.push([key, frequency[key]]);
freArr.sort((a, b) => a[0] - b[0]); // 입력받은 숫자 크기순 오름차순 정렬 후
freArr.sort((a, b) => b[1] - a[1]); // 빈도수 크기순 내림차순 정렬

if (average / N < 0) {
    let a = -(average / N)
    a = Math.round(a)
    if (a === 0) console.log(0)
    else console.log(-a)
    
}
else console.log(Math.round(average / N));

console.log(center[Math.floor(center.length / 2)]);
if (freArr.length > 1) {
    if (freArr[0][1] === freArr[1][1]) console.log(freArr[1][0]);
    else console.log(freArr[0][0]);
} else console.log(freArr[0][0]);

console.log(center[center.length-1] - center[0]);