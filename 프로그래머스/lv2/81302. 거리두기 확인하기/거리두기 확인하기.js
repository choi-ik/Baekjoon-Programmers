/*
    P = 응시자 앉아있는 자리
    O = 빈 테이블
    X = 파티션
    
    1. 배열 순회하며 P 탐색
    2. p에서 부터 BFS 탐색하여 거리 2안에 P가 들어오면 0 리턴하고 break;
        a. 단 파티션이 껴있으면 가능
        b. x가 1이고 그 다음이 p, 2인 경우 가능 이땐 continue;
        c. O가 1dlrh rm ekdmadl p, 2인 경우 불가능 이떈 break;
        d. P가 1이어도 불가능 이때도 break;
*/

function solution(places) {
    let answer = [];
    let dx = [-1, 1, 0, 0];
    let dy = [0, 0, -1, 1];
    
    for (let waiting of places) {
        let check = true;   // 거리두기 준수 여부
        let room = waiting.map(e => e.split(""));   // 대기실 2차원 배열화
        let v = Array.from({length: 5}, () => Array.from({length: 5}, () => false));
        let seat = [];
        
        for (let i = 0 ; i < room.length; i ++) {
            for (let j = 0; j < room[i].length; j ++) {
                if (room[i][j] === "P") {
                    v[i][j] = true
                    DFS(i, j, 0);
                }
            }       
        };
        
        function DFS(x, y, depth) {
            if (depth === 2) return;
            
            for (let i = 0; i < 4; i ++) {
                let nx = x + dx[i];
                let ny = y + dy[i];
                
                if (nx < 0 || nx >= room.length || ny < 0 || ny >= room.length) continue;
                if (v[nx][ny] === true) continue; 
                if (room[nx][ny] === "X") continue;
                if (room[nx][ny] === "P") check = false;
                DFS(nx, ny, depth + 1);
                v[nx][ny] = true;
            }
        }
        
        if (!check) answer.push(0);
        else answer.push(1);
    }
    return answer;
}