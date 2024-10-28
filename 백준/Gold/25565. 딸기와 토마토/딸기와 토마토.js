let fs = require("fs");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./BackJoon/Implementation/25565.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, m, k] = input.shift().split(" ").map(Number);
const garden = input.map((e) => e.split(" ").map(Number));
let seed = 0;

function coordinateCheck(n, m) {
  const dx = [1, -1];
  const dy = [1, -1];

  for (let x = 0; x < n; x++) {
    for (let y = 0; y < m; y++) {
      if (garden[x][y] === 0) continue;
      let check_x = false;
      let check_y = false;

      for (let i = 0; i < 2; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];
        if (nx >= 0 && nx < n && garden[nx][y] === 1) check_x = true;
        if (ny >= 0 && ny < m && garden[x][ny] === 1) check_y = true;
      }
      if (check_x && check_y) return `${x + 1} ${y + 1}`;
    }
  }
}

garden.forEach((itmes) => {
  itmes.forEach((item) => {
    if (item === 1) seed += 1;
  });
});

if (2 * k === seed) {
  console.log(0);
  return;
}

console.log(2 * k - seed);

if (k === 1) {
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < m; y++) {
      if (garden[x][y] === 1) {
        console.log(`${x + 1} ${y + 1}`);
        return;
      }
    }
  }
}

if (2 * k - 1 === seed) {
  let check = coordinateCheck(n, m);

  if (check) {
    console.log(check);
    return;
  }
}

let start_x = 2001;
let start_y = 2001;
let end_x = -1;
let end_y = -1;

for (let x = 0; x < n; x++) {
  for (let y = 0; y < m; y++) {
    if (garden[x][y] === 1) {
      start_x = Math.min(x, start_x);
      start_y = Math.min(y, start_y);
      end_x = Math.max(x, end_x);
      end_y = Math.max(y, end_y);
    }
  }
}

if (start_y === end_y) {
  for (let i = 0; i < 2 * k - seed; i++) {
    console.log(`${start_x + seed - k + i + 1} ${start_y + 1}`);
  }
  return;
}

if (start_x === end_x) {
  for (let i = 0; i < 2 * k - seed; i++) {
    console.log(`${start_x + 1} ${start_y + +seed - k + i + 1}`);
  }
}
