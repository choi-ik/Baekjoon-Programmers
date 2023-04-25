function solution(rectangle, characterX, characterY, itemX, itemY) {
    let answer = 0;
    let rectMax = 0;
    
    /* 1. 좌표를 2배씩 늘린다 */
    characterX = characterX*2;
    characterY = characterY*2;
    itemX = itemX*2;
    itemY = itemY*2
    let rectCopy = rectangle.map(data => data.map(item => item*2));
    
    /* 2. 위,아래,좌,우 방향 설정 */
    let dx = [-1, 1, 0, 0]; 
    let dy = [0, 0, -1, 1];
    
     /* 3. 시작 위치를 최초의 큐에 담는다. */
    const start = [characterX, characterY, 0] // 마지막 0은 BFS 탐색할 때 카운트
    let queue = [start];
    
    /* 4. 움직일 수 있는 좌표를 2차원 배열로 정의하여 모두 0으로 채운다.
            크기는 rectangle에 있는 수중 가장 큰 수 N을 뽑아 (N+2)*(N+2) 크기로 만들어준다. 
            N+2 한 이유는 배열에 조금 더 여유가 남으라고 */
    for(let i=0; i<rectCopy.length; i++) {
        if(rectMax < Math.max(...rectCopy[i])) rectMax = Math.max(...rectCopy[i]);
    };
    let rectObj = Array.from({length: (rectMax*2)+2}, () => Array((rectMax*2)+2).fill(0));
    
    /* 5. 테두리는 1, 테두리 내부는 2로 변경 */
    rectCopy.forEach(([x1, y1, x2, y2]) => {
        for(let i=x1; i<=x2; i++) {
            for(let j=y1; j<=y2; j++) {
                if(i === x1 || i === x2 || j === y1|| j === y2) {
                    if(rectObj[i][j] === 0) rectObj[i][j] = 1;
                } else rectObj[i][j] = 2;
            }
        }
    });
    
     /* 6. 시작 위치를 0으로 변경하여 다시 돌아가지 못하게한다. */
    rectObj[characterX][characterY] = 0;
    
    /* 7. 큐에 담긴 값이 없을때까지 반복 */
    while(queue.length > 0) {
        /* 8. 처음 담긴 값을 가져와 BFS 탐색 */ 
        const [x, y, cnt] = queue.shift();
        /* 9. 현재 위치가 도착 위치에 도달하면 return */
        if(x === itemX && y === itemY) return cnt/2;
        
        for(let i=0; i<4; i++) {
            let nx = x + dx[i];
            let ny = y + dy[i];
            
            if(nx < 0 || nx >= rectObj.length || ny < 0 || ny >= rectObj[0].length) continue;
            if(rectObj[nx][ny] === 0 || rectObj[nx][ny] === 2) continue;
            if(rectObj[nx][ny] === 1) {
                queue.push([nx, ny, cnt+1]);
                rectObj[nx][ny] = 0;
            }

        }
    }
    console.log(answer)
    return answer;
}