let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();


for (let i = 0; i < N; i ++) {
    const n = +input.shift();
    const stock = input.shift().split(" ").map(e => +e);
    let value = stock[stock.length - 1]; // 주식 가치
    let answer = 0; // 총 이득

    // 뒤에서부터 주식을 탐색하므로, 현재 가장 높은 주식보다 이전 주식이 낮다면 주식을 팔아서 이득을 볼 수 있고, 
    // 이전 주식이 현재 가장 높은 주식보다 높다면 현재 가장 높은 주식을 새로 업데이트
    for (let i = stock.length - 2; i >= 0; i --) {
        if (value >= stock[i]) answer += value - stock[i];
        else value = stock[i];
    };

    console.log(answer)
};