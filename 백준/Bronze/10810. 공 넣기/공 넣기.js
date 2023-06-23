let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input.shift().split(" ").map(e => +e);
let ball = input.slice(0, M).map(e => e.split(" ").map(e => +e));
let basket = Array.from({length: N}, () => 0);

ball.forEach(([i, j, k]) => {
    for(let idx = i-1; idx < j; idx ++) {
        basket[idx] = k;
    }
});

console.log(basket.join(" "))