/*
    공격을 받으면, 내구도가 감소하고, 내구도가 0 이하가 되면 파괴.
    아군은 회복 스킬 사용해 선물 내구도 올림.
    
    행 열의 최개 길이 1000 * 1000
    skill 의 길이 250,000
    type = 1, 공격
    type = 2, 회복
    degree =  공,수 숫자
    
    내구도 1 이상 건물 존재, 0 이하 파괴.

    1. 밑과 옆으로 board보다 1을 증가시킨 배열을 생성한다.
    2. skill에 맞게 해당 좌표에 만족하는 값 중 arr (x1, y1)과 (x2+1,y2+1)에 해당 값을 조건에 만족하는 값을 더한다.
    3. arr의 (x2+1,y1), (x1,y2+1)에 만족하는 부분을 attack * -1 만큼 더한다.
    4. 모든 skill을 탐색한 후, 해당 값을 누적하여 위에서 아래로 더한다.
    5. 위에서 아래로 더한 후, 해당 값을 누적하여 왼쪽에서 오른쪽으로 더한다.
    6. board에 해당 배열인 arr을 더해 최종 배열을 구한다.
    7. 해당 값 중 0보다 큰 위치의 수를 더해 answer을 반환한다.
*/

function solution(board, skill) {
    let answer = 0;
    // board 누적합 배열
    let prefixSum = Array.from({length: board.length + 1}, () =>  Array.from({length: board[0].length + 1}, () => 0));
    

    skill.forEach(([type, x1, y1, x2, y2, degree]) => {
        let attack = type === 1 ? -1 : 1;
        
        prefixSum[x1][y1] += degree * attack;
        prefixSum[x2+1][y2+1] += degree * attack;
        prefixSum[x1][y2+1] += degree * attack * -1;
        prefixSum[x2+1][y1] += degree * attack * -1;
    });

    // 왼쪽에서 오른쪽으로 합치기
    for (let i = 0; i < prefixSum.length; i ++) {
        for (let j = 0; j < prefixSum[i].length - 1; j ++) {
            prefixSum[i][j + 1] += prefixSum[i][j];
        };
    };
    
       // 위에서 아래로 합치기
    for (let i = 0; i < prefixSum.length - 1; i ++) {
        for (let j = 0; j < prefixSum[i].length; j ++) {
            prefixSum[i + 1][j] += prefixSum[i][j];
        };
    };

    for(let i = 0; i < board.length; i ++) {
        for (let j = 0; j < board[i].length; j ++) {
            board[i][j] += prefixSum[i][j];
            if (board[i][j] > 0) answer ++;
        };
    };

    return answer;
};