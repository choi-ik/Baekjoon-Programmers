const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const [N, L] = input[0].split(' ').map(Number);
const map = [];
let result = 0;

// 행, 열 데이터 삽입
for (let i = 1; i <= N; i ++) {
    map.push(input[i].split(' ').map(Number));;
    const tempArr = [];

    for (let j = 0; j < N; j ++) {
        tempArr.push(Number(input[j + 1][(i - 1) * 2]));
    }

    map.push(tempArr);
}

map.forEach((block, i) => {
    // 다리 생성 여부
    let road = Array.from({length: N}, () => true);
    let isBridge = true;
    for (let idx = 0; idx < N - 1; idx ++) {
        // 칸의 높이 차이가 2 이상일 경우 지나갈 수 없음
        if (block[idx] - block[idx + 1] >= 2 || block[idx] - block[idx + 1] <= -2) {
          isBridge = false;
          break;  
        };
        // 다음 칸이 1칸 낮을 때
        if (block[idx] - block[idx + 1] === 1) {
            let temp = block.slice(idx + 1, idx + 1 + L);

            // 낮은 블록의 길이가 L보다 작으면 실패
            if (temp.length < L) {
                isBridge = false;
                break;
            }
            
            temp = new Set(temp);

            // 낮은 칸의 길이가 L보다 작을 경우 다리를 놓을 수 없음
            if (temp.size > 1) {
                isBridge = false;
                break;
            } else if (temp.size === 1) {
                // 도로 설치로 해당 인덱스 false로 변경
                for (let j = idx + 1; j < idx + 1 + L; j ++) {
                    road[j] = false;
                }
            }
        }
        // 다음 칸이 1칸 높을 때
        else if (block[idx] - block[idx + 1] === -1) {
            let temp = block.slice(idx - L + 1, idx + 1);

            if (temp.length < L) {
                isBridge = false;
                break;
            }

            temp = new Set(temp);
            
            // 낮은 칸의 길이가 L보다 작을 경우 다리를 놓을 수 없음
            if (temp.size > 1) {
                isBridge = false;
                break;
            } else if (temp.size === 1) {
                for (let j = idx - L + 1; j < idx + 1; j ++) {
                    if (road[j] === false) {
                        isBridge = false;
                    }
                }
            } else {
                isBridge = false;
                break;
            }

            
        }
    }

    isBridge && result ++;
})

console.log(result);