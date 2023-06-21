/*
    - 모든 인덱스 돌면서 상하좌우 검색
    1. 인접한 칸에 좋아하는 학생 있는지 검사하고, 인접한 칸에 존재하는 좋아하는 학생 수와 좌표를 임시 배열에 저장
    2. 1번 조건 만족하는 칸이 여러 개이면, 같은 값을 가진 좌표들만 따로 다시 임시 배열에 저장
    3. 임시 배열에서 비어있는 칸이 가장 많은 칸 구함
    4. 3번 조건을 만족하는 칸이 여러개면 같은 값을 가진 좌표를 다시 임시 배열에 저장
    5. 처음부터 상, 좌, 우, 하 순으로 탐색해서 배열에 값을 집어넣었기에 가장 맨 앞에 있는 배열이 행, 열 모두 가장 작은 칸임.
    6. 각각의 학생의 번호 주변에 좋아하는 학생이 몇명인지 세고 출력 
*/
let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n'); 

const N = input.shift().split(" ").map(e => +e);
let seat = Array.from({length: N}, () => Array.from({length: N}, () => 0));
let num = [];
let like = [];

// 답
let answer = 0;     

// 학생 번호, 좋아하는 학생의 번호 입력
for (let i = 0; i < input.length; i ++) {
    let temp = input[i].split(" ").map(e => +e);
    num.push(temp[0]);
    like.push(temp.slice(1));
};

// 상 좌 우 하 -> 행이 낮은 순 그리고 열이 낮은 순 탐색
const dx = [-1, 0, 0, 1];
const dy = [0, -1, 1, 0];

// 자리에 앉은 학생
let seatArr = [];
let idx = 0;

while (idx < N*N) {
    let around = [];    // 좋아하는 학생 인접한 자리
    let emptyArr = [];     // 빈 자리

    // 처음 들어오는 학생 -> 조건 1, 2, 3 모두 고려하여 [1, 1]에 배치
    if (idx === 0) {
        seat[1][1] = num[idx];
        seatArr.push([1, 1, num[idx]]);     // x, y, 학생 번호
        idx ++;
        continue;
    }

    // 마지막에 들어올 학생의 경우
    else if (idx === (N*N) - 1) {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (seat[i][j] === 0) seat[i][j] = num[idx];
            }
        }
        break;
    }

    // 두번째 ~ N-2번째 학생
    else {
        // 모든 배열 인덱스 순환
        for (let x = 0; x < N; x ++) {
            for (let y = 0; y < N; y ++) {
                let childNum = 0;
                
                if (seat[x][y] !== 0) continue;

                for (let i = 0; i < 4; i ++) {
                    let nx = x + dx[i];
                    let ny = y + dy[i];

                    if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;   // 배열 범위를 넘어가면 패스

                    for (let j = 0; j < 4; j ++) {
                        if (seat[nx][ny] === like[idx][j]) childNum += 1;
                    };
                };

                around.push([x, y, childNum]);
            };
        };
    }
    // 인접한 칸에 좋아하는 학생수가 많은 순 정렬
    around.sort((a, b) => b[2] - a[2]);
    // 인접한 칸에 좋아하는 학생수가 가장 많은 좌표만 넣을 배열
    let aroundCopy = [];    

    // 인접한 칸에 좋아하는 학생수가 가장 많은 좌표만 aroundCopy에 넣어주기
    for (let i = 0; i < around.length; i ++) {
        // around 배열의 끝까지 탐색가능 하다면 인접한 칸의 좋아하는 학생수가 모두 같은 것이므로 마지막 인덱스도 push해준다
        if (i === around.length - 1) aroundCopy.push(around[i]);
        else {
            if (around[i][2] === around[i+1][2]) {
                aroundCopy.push(around[i]);
            } else {
                aroundCopy.push(around[i]);
                break;
            }
        }
    };

    // 1번 조건을 만족하는 칸이 여러개이면 비어있는 칸이 가장 많은 칸으로 자리 정하기
    for (let x = 0; x < aroundCopy.length; x ++) {
        let empty = 0;
        let ax = aroundCopy[x][0];
        let ay = aroundCopy[x][1];

        for (let i = 0; i < 4; i ++) {
            let nx = ax + dx[i];
            let ny = ay + dy[i];

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

            // 인접한 칸이 빈칸이면
            if (seat[nx][ny] === 0) empty += 1;
        };

        emptyArr.push([ax, ay, empty]);
    };

    emptyArr.sort((a, b) => b[2] - a[2]);
    let emptyCopy = [];

    // 2번 조건을 만족하고 같은 빈 칸을 가지고 있는 좌표만 emptyCopy에 저장
    for (let i = 0; i < emptyArr.length; i ++) {
        // around 배열의 끝까지 탐색가능 하다면 인접한 칸의 좋아하는 학생수가 모두 같은 것이므로 마지막 인덱스도 push해준다
        if (i === emptyArr.length - 1) emptyCopy.push(emptyArr[i]);
        else {
            if (emptyArr[i][2] === emptyArr[i+1][2]) {
                emptyCopy.push(emptyArr[i]);
            } else {
                emptyCopy.push(emptyArr[i]);
                break;
            }
        }
    };

    seat[emptyCopy[0][0]][emptyCopy[0][1]] = num[idx];
    idx ++;
};

seat.forEach((x, i) => {
    x.forEach((y, j) => {
        let index = num.indexOf(y)
        let count = 0;
        for (let k = 0; k < 4; k ++) {
            let nx = i + dx[k];
            let ny = j + dy[k];

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

            like[index].forEach((val) => {
                if ((seat[nx][ny] === val)) count += 1;
            });
        };

        if (count === 0) answer += 0;
        if (count === 1) answer += 1;
        if (count === 2) answer += 10;
        if (count === 3) answer += 100;
        if (count === 4) answer += 1000;
    })
});

console.log(answer)
