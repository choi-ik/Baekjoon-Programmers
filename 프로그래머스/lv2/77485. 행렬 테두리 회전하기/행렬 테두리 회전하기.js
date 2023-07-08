function solution(rows, columns, queries) {
    var answer = [];
    let arr = [];
    
    // 배열의 크기를 0부터 시작하였음 (queries의 행, 열 번호가 1부터 시작하기 때문)
    for (let i = 0; i <= rows; i ++) {
        arr.push([]);
        for (let j = 0; j <= columns; j ++) {
            if (i === 0) {
                arr[i].push(0);
                continue;
            };
            
            if (j === 0) arr[i].push(0);
            else arr[i].push(j + columns * (i-1));
        };
    };
    
    queries.forEach(([x1, y1, x2, y2]) => {
        let stack = [];
        
        // 윗변 stack에 넣기
        for (let i = y1; i < y2; i ++) stack.push(arr[x1][i]);
        // 오른쪽 변 stack에 넣기
        for (let i = x1; i < x2; i ++) stack.push(arr[i][y2]);
        // 아랫 변 stack에 넣기
        for (let i = y2; i > y1; i --) stack.push(arr[x2][i]);
        // 왼쪽 변 stack에 넣기
        for (let i = x2; i > x1; i --) stack.push(arr[i][y1]);
        
        // 스택에는 이동할 값들이 들어있기 때문에 가장 작은 값 넣어주면 됌.
        answer.push(Math.min(...stack));
        // 스택 한칸씩 옆으로 밀기
        let temp = stack.pop();
        stack.unshift(temp);
        
        // 스택 뒤에서부터 값 넣을 것임 (shift 보다 pop이 더 실행시간이 빠르기 때문)
        for (let i = x1 + 1; i <= x2; i ++) arr[i][y1] = stack.pop();
        for (let i = y1 + 1; i <= y2; i ++) arr[x2][i] = stack.pop();
        for (let i = x2 - 1; i >= x1; i --) arr[i][y2] = stack.pop();
        for (let i = y2 - 1; i >= y1; i --) arr[x1][i] = stack.pop();
    });
    
    return answer;
}