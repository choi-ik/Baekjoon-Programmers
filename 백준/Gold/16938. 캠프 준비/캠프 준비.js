/*
    캠프에 사용할 문제는 두 문제 이상.
    문제 난이도는 L 이상 R 이하
    가장 쉬운 문제의 난이도와 가장 어려운 문제의 난이도 차이는 X보다 크거나 같아야 함.
*/
let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [N, L, R, X] =  input[0].split(" ").map(e => +e);
let problem = input[1].split(" ").map(e => +e);
let problemArr = []
let answer = 0;

// 조합 코드
const getCombinations = function (arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((el) => [el]); 
    // n개중에서 1개 선택할 때(nC1), 바로 모든 배열의 원소 return

    arr.forEach((fixed, index, origin) => {
      const rest = origin.slice(index + 1); 
      // 해당하는 fixed를 제외한 나머지 뒤
      const combinations = getCombinations(rest, selectNumber - 1); 
      // 나머지에 대해서 조합을 구한다.
      const attached = combinations.map((el) => [fixed, ...el]); 
      //  돌아온 조합에 떼 놓은(fixed) 값 붙이기
      results.push(...attached); 
      // 배열 spread syntax 로 모두다 push
    });

    return results; // 결과 담긴 results return
};

for(let i = 0; i < N; i++) {
    problemArr.push(...getCombinations(problem, i+2))
};


for(let i = 0; i < problemArr.length; i++) {
    let sum = problemArr[i].reduce((a, b) => a + b)
    
    if (sum >= L && sum <= R) {
        if (Math.max(...problemArr[i]) - Math.min(...problemArr[i]) >= X) answer++;
    }
}

console.log(answer)
