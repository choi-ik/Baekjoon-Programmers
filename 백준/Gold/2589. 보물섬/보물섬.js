// 전형적인 BFS 문제

let fs = require("fs");
const { start } = require("repl");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./BackJoon/BruteForce/2589.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [H, W] = input.shift().split(" ").map((e) => +e);
const map = [];
const startPoint = [];
let maxDistance = 0;

// 육지 바다 배열화
input.forEach((e, i) => {
  const temp = e.split('');
    
  map.push(temp);
  temp.forEach((v, j) => v === 'L' && startPoint.push([i, j]))
});

// 각 스타팅 포인트를 기점으로 BFS 실행
startPoint.forEach(([x, y], i) => {
	const numberMap = Array.from({length: H}, () => Array(W).fill(0))
	const visit = Array.from({length: H}, () => Array(W).fill(true))

	BFS(x, y, numberMap, visit)
})

// BFS 함수
function BFS(x, y, arr, visit) {
	// 상 하 좌 우
	const dx = [0, 0, -1, 1];
	const dy = [1, -1, 0, 0];
	const q = [[x, y]]
  let idx = 0;
	
	visit[x][y] = false;
	
	while (idx < q.length) {
		const [nx, ny] = q[idx];
	
		for (let i = 0; i < 4; i ++) {
			const ax = nx + dx[i];
			const ay = ny + dy[i];

			// 배열의 범위를 벗어나는 경우 예외처리
			if (ax < 0 || ax >= H || ay < 0 || ay >= W) continue;
			// 도착한 곳이 바다이거나 이미 방문한 땅인 경우 예외처리
			if (map[ax][ay] === 'W' || visit[ax][ay] === false) continue;

			visit[ax][ay] = false; // 방문 처리
			arr[ax][ay] = arr[nx][ny] + 1; // 이동한 거리 + 1
			q.push([ax, ay]); // 큐에 넣음

			// 최단 거리중 가장 긴 거리 갱신
			if (arr[ax][ay] > maxDistance) maxDistance = arr[ax][ay];
		}

		idx++;
	}
}

console.log(maxDistance)