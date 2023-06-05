/* 
    번호 1~N
    능력치 S[i][j] = i번 사람과 j번 사람이 같은 팀에 속했을 때 더해지는 능력치
    S[i][j] !== S[j][i]
    i번 사람과 j번 사람이 같은 팀에 속했을 때, 팀에 더해지는 능력치 S[i][j] + S[j][i]
    N <= 20
    S[i][i] == 0
*/
let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let N = Number(input[0]); // 인원 수
let arr = []; // S[i][j] 2차원 배열
let visited = Array(N).fill(false); // 인원 수 만큼의 길이로 배열 생성
let teamArr = Array(N).fill(""); // Star와 Link 팀을 구분할 배열
let answer = 1000000000; // 가장 작은 값 비교하기 위해 가장 큰 값인 무한대 입력

// 문제에 나와있는 s[i][j] 2차원 배열 만들어줌
for (let i=1; i<input.length; i++) {
    arr.push(input[i].split(' ').map((e) => Number(e)));
};

// DFS 함수
const dfs = (depth) => {
    if (depth === N) {
        let s = 0
        let l = 0
        
        for (let i = 0; i < N-1; i++) {
            for (let j = i + 1; j < N; j++) {
                // S[i][j] + S[j][i] 해주는 부분
                if (teamArr[i] === "S" && teamArr[j] === "S") s += arr[i][j] + arr[j][i];
                if (teamArr[i] === "L" && teamArr[j] === "L") l += arr[i][j] + arr[j][i];
            }
        }

        answer = Math.min(answer, Math.abs(s - l))
        return;
    }

    // 사람들이 S팀일때와 L팀일때를 나눠서 비교하기 위해 각각 S와 L을 넣어 재귀
    if (!visited[depth]) {
        teamArr[depth] = "S";
        visited[depth] = true;
        dfs(depth + 1);
    
        teamArr[depth] = "L";
        dfs(depth + 1);
        visited[depth] = false;
    }

}

dfs(0);
console.log(answer)