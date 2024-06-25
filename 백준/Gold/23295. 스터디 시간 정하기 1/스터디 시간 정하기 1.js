let fs = require("fs");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./BackJoon/Sliding-Window/23295.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, T] = input.shift().split(" ").map(Number);
const times = Array.from({ length: 100000 }, () => 0);

input.forEach((e) => {
  const time = e.split(" ").map(Number);

  if (time.length > 1) {
    times[time[0]] += 1;
    times[time[1]] -= 1;
  }
});

for (let i = 1; i < times.length; i++) {
  times[i] += times[i - 1];
}

let windows = 0;
let maxTimes = -Infinity;
let startPoint = 0;
let endPoint = 0;

for (let i = 0; i < times.length; i++) {
  windows += times[i];

  if (i >= T - 1) {
    if (windows > maxTimes) {
      maxTimes = windows;
      startPoint = i - (T - 1);
      endPoint = i + 1;
    }

    windows -= times[i - (T - 1)];
  }
}

console.log(startPoint, endPoint);
