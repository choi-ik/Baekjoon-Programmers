let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();
const tree = [];
let dp = Array.from({length: N} ,() => Array.from({length: N}, () => 0));


for(let i = 0; i < N; i ++) {
    tree.push(input[i].split(" ").map(e => +e));
}


dp[0][0] = tree[0][0];
for (let x = 1; x < N; x ++) {  // dp[0][0]에 7을 이미 넣었기 때문에 1행부터 탐색
    for (let y = 0; y < tree[x-1].length; y ++) {
        // 0번째 열 이후로 부터는 현재 탐색중인 y열이 겹치므로 겹치는 부분에서 더 큰 값 비교하여 넣어줌.
        dp[x][y] = Math.max(dp[x][y], dp[x-1][y] + tree[x][y]);
        dp[x][y+1] = dp[x-1][y] + tree[x][y+1];
    }
}


console.log(Math.max(...dp[N-1]))