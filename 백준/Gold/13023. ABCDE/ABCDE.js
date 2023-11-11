let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(e => +e);
const list = Array.from({length: N}, () => []); // 인접리스트
let visit = Array.from({length: N}, () => true); // 방문 배열

let result = 0; // 결과 값

// 인접리스트 생성 
for (let i = 0; i < M; i ++) {
  const [a, b] = input[i + 1].split(' ').map(e => +e);
  list[a].push(b);
	list[b].push(a);
};

// 친구 관계 확인 함수
function checkRelationship(depth, startIndex, v) {
	// 종료 조건(뎁스: 5)
	if (depth === 5) {
		result = 1;
		return;
	};

	// 종료 조건(연결된 친구가 없거나 이미 방문한 경우)
	if (result === 1 || list[startIndex].length === 0 || v[startIndex] === false) return;

	v[startIndex] = false;

	// 방문 가능한 인덱스 탐색
	for (let i = 0; i < list[startIndex].length; i ++) {
		checkRelationship(depth + 1, list[startIndex][i], v);
	};

	v[startIndex] = true;
};

for (let i = 0; i < N; i ++) {
	if (result === 1) break;
  checkRelationship(0, i, visit)
}

console.log(result)
