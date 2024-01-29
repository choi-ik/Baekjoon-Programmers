/**
 * 2차원 배열을 모두 돌면서,
 * 세로, 가로, 대ㄱ선 모두 세면서 5개를 찾아 5개가 충족이 되면 게임 Over
 * 최대 O의 3제곱 19 * 19 * 19
 */

let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/2615.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

// 바둑판
let map = input.map((item) => item.split(" ").map(Number));
// 0,0 부터 탐색 할 것이기에 하, 우, 하우, 상우 네 방향만 가보면 됨.
let dx = [0, 1, 1, -1];
let dy = [1, 0, 1, 1];
const maxLength = 19;

function bfs(x, y, value) {
    for (let i = 0; i < 4; i ++) {
        let nx = x + dx[i];
        let ny = y + dy[i];
        let count = 1;

        while (nx >= 0 && nx < maxLength && ny >= 0 && ny < maxLength && map[nx][ny] === value) {
            count ++;

            if (count === 5) {
                if (x - dx[i] >= 0 && x - dx[i] < maxLength && y - dy[i] >= 0 && y - dy[i] < maxLength && map[x - dx[i]][y - dy[i]] === value) break;
                if (nx + dx[i] < maxLength && nx + dx[i] >= 0 && ny + dy[i] < maxLength && ny + dy[i] >= 0 && map[nx + dx[i]][ny + dy[i]] === value) break;
                
                return value;
            }

            nx += dx[i];
            ny += dy[i];
        }
    }
}

let result = 0;
let coordinate = ''

outer: for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] !== 0) {
      let target = bfs(i, j, map[i][j]);
      
      if (target) {
        result = target
        coordinate = [i + 1, j + 1];
  
        break outer;
      }
    }
  }
}

if (!result) console.log(result)
else {
  console.log(result)
  console.log(coordinate.join(' '))
}
