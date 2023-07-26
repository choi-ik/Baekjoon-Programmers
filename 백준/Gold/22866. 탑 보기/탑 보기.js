let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();
const building = input.shift().split(" ").map(Number); // 건물의 높이
let cnt = Array.from({length: N + 1}, () => 0); // 볼 수 있는 건물의 개수
let min = Array.from({length: N + 1}, () => [Infinity, 0]); // [가장 가까운 건물의 거리와, 가장 가까운 건물의 번호 중 더 작은 번호]

// 현재 건물에서 왼쪽으로 보이는 건물
function leftBuild() {
    let stack = [];

    for (let i = 0; i < N; i ++) {
        // 건물의 번호와 건물의 높이를 스택에 저장
        if (stack.length === 0) stack.push([i + 1, building[i]]);
        else {
            // 스택의 뒤에서부터 탐색하며 현재 건물의 높이보다 같거나 작으면 제거
            for (let j = stack.length - 1; j >= 0; j --) {
                if (stack[j][1] <= building[i]) stack.pop();
                else {
                    stack.push([i + 1, building[i]]);
                    break;
                };

                if (stack.length === 0) stack.push([i + 1, building[i]]);
            };
        };

        // 각 건물에서 왼쪽으로 볼 수 있는 건물의 개수 저장
        cnt[stack[stack.length - 1][0]] += stack.length - 1;
        
        // 각 건물에서 가장 가까이 있는 건물의 번호중 작은 번호 저장
        if (stack.length <= 1) continue;
        else {
            // 건물의 거리 구하기
            let near = Math.abs(stack[stack.length - 1][0] - stack[stack.length - 2][0]);

            // 건물의 거리가 더 작다면 업데이트 해주고, 거리가 같다면 건물의 번호크기 비교하여 업데이트하기
            if (min[stack[stack.length - 1][0]][0] > near) {
                min[stack[stack.length - 1][0]] = [near, stack[stack.length - 2][0]];
            }
            else if (min[stack[stack.length - 1][0]][0] === near) {
                if (min[stack[stack.length - 1][0]][1] > stack[stack.length - 2][0]) {
                    min[stack[stack.length - 1][0]] = [near, stack[stack.length - 2][0]];
                }
            }
        };
    };
};

// 현재 건물에서 오른쪽으로 보이는 건물
function rightBuild() {
    let stack = [];

    for (let i = N - 1; i >= 0; i --) {
        // 건물의 번호와 건물의 높이를 스택에 저장
        if (stack.length === 0) stack.push([i + 1, building[i]]);
        else {
            // 스택의 뒤에서부터 탐색하며 현재 건물의 높이보다 같거나 작으면 제거
            for (let j = stack.length - 1; j >= 0; j --) {
                if (stack[j][1] <= building[i]) stack.pop();
                else {
                    stack.push([i + 1, building[i]]);
                    break;
                };

                if (stack.length === 0) stack.push([i + 1, building[i]]);
            };
        };

        // 각 건물에서 오른쪽으로 볼 수 있는 건물의 개수 저장
        cnt[stack[stack.length - 1][0]] += stack.length - 1;
        
        // 각 건물에서 가장 가까이 있는 건물의 번호중 작은 번호 저장
        if (stack.length <= 1) continue;
        else {
            // 건물의 거리 구하기
            let near = Math.abs(stack[stack.length - 1][0] - stack[stack.length - 2][0]);

            // 건물의 거리가 더 작다면 업데이트 해주고, 거리가 같다면 건물의 번호크기 비교하여 업데이트하기
            if (min[stack[stack.length - 1][0]][0] > near) {
                min[stack[stack.length - 1][0]] = [near, stack[stack.length - 2][0]];
            }
            else if (min[stack[stack.length - 1][0]][0] === near) {
                if (min[stack[stack.length - 1][0]][1] > stack[stack.length - 2][0]) {
                    min[stack[stack.length - 1][0]] = [near, stack[stack.length - 2][0]];
                }
            }
        };
    };
};

leftBuild();
rightBuild();

let answer = "";

// 출력으로 인한 타임아웃 최적화
for (let i = 1; i < N + 1; i ++) {
    if (cnt[i] <= 0) answer += cnt[i] + "\n";
    else answer += cnt[i] + " " + min[i][1] + "\n";
};

console.log(answer.trim());

