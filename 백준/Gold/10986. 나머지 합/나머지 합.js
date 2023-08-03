let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N , M] = input.shift().split(" ").map(Number);
let prefix_sum = input.shift().split(" ").map(Number);
// 모듈러 연산 배열
let remain = Array.from({length: M}, () => 0);


// 누적합을 구하고, 모듈러 연산하기
// prefix_sum[i] - prefix_sum[j] % M = 0이 만족한다면
// prefix_sum[i] % M = prefix_sum[j] % M도 만족
for (let i = 0; i < N; i++) {
    if (i <= 0) remain[prefix_sum[i] % M] += 1
    else {
        prefix_sum[i] = prefix_sum[i] + prefix_sum[i - 1];
        remain[prefix_sum[i] % M] += 1
    }
};

// prefix_sum[idx] % M = 0이 되는 것들은 첫번째 원소부터 i번째 원소까지의 누적합이 M으로 나누어 떨어진다는 의미로 우선 나누어 떨어진 값들을 더해준다
let result = remain[0];   

// 나머지가 같은 순서쌍 구하기 공식 -> n * (n - 1) / (쌍 개수)
for (let v of remain)  {
    result += Math.floor((v * (v-1)) / 2);
}

console.log(result);