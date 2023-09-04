let answer = [0, 0]; // 0과 1개수

function solution(arr) {
    
    dfs(arr, 0, 0, arr.length); // 쿼드 배열과 시작 좌표, 배열의 길이(N)
    return answer;
};

function dfs(arr, x, y, len) {
    let quad = arr[x][y]; // 압축하기 위해 비교할 숫자
    
    for (let i = 0; i < len; i ++) {
        for (let j = 0; j < len; j ++) {
            
            // 서로 다른 숫자라면 4개의 정사각형 영역을 나눠 재귀 호출
            if (arr[x + i][y + j] !== quad) {
                let half = Math.floor(len / 2);
                dfs(arr, x, y, half);
                dfs(arr, x + half, y, half);
                dfs(arr, x + half, y + half, half);
                dfs(arr, x, y + half, half);
                
                return;
            }
        };
    };

    answer[quad] ++
};