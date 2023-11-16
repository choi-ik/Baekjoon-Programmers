let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./BackJoon/BruteForce/18428.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const map = []; // 복도 배열
const teachers = []; // 선생님 위치
let result = 'NO';

input.forEach((e, i) => {
	const tempArr = e.split(' ');
	
	map.push(tempArr);
	tempArr.forEach((v, j) => {
		if (v === 'T') teachers.push([i, j]);
	});
});

checkHurdle(0);

console.log(result);
	
// 장애물을 설치할 백트래킹 함수
function checkHurdle(count) {
	// 장애물을 3개 설치 했을 경우
	if (count === 3) {
		
		const isCheck = moveTeacher();
		
		// 학생을 찾을 수 없는 경우
		if (isCheck) result = 'YES';

		return;
	};

	// 백트래킹
	for (let i = 0; i < map.length; i ++) {
		for (let j = 0; j < map[i].length; j ++) {
			
			if (map[i][j] === 'X') {
				map[i][j] = 'O';
				checkHurdle(count + 1);
				map[i][j] = 'X';
			}
		}
	}
}

// 선생님이 학생을 찾는 함수
function moveTeacher() {
	let success = true;

	for(const [x, y] of teachers){
		const isCheck = findStudent(x, y);
		
		if (!isCheck) {
			success = false;
			break;
		}
	};
	
	return success;
}

// 선생이 학생을 찾을 수 있는지 확인하는 함수
function findStudent(x, y) {
	const dx = [0, 0, -1, 1];
	const dy = [1, -1, 0, 0];

	for (let i = 0; i < 4; i ++) {
		let nx = x + dx[i];
		let ny = y + dy[i];

		while(nx >= 0 && nx < N && ny >= 0 && ny < N) {
			// 장애물을 학생보다 먼저 만났다면 순회 종료
			if (map[nx][ny] === 'O') break;
			// 장애물 보다 학생을 먼저 만났다면 선생님께 들킨 것
			if (map[nx][ny] === 'S') {
				return false;
			}

			nx += dx[i];
			ny += dy[i];
		}
	}

	// 선생이 학생을 찾지 못한 경우
	return true;
};