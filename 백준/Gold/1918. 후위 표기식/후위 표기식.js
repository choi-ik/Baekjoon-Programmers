let fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./BackJoon/Stack/1918.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

input = input[0].split("");
const answer = [];
const stack = [];

input.forEach((item) => {
  if (item >= "A" && item <= "Z") {
    answer.push(item);
  } else if (item === "+" || item === "-") {
    while (stack.length > 0 && stack.at(-1) !== "(") {
      answer.push(stack.pop());
    }
    stack.push(item);
  } else if (item === "*" || item === "/") {
    while ((stack.length > 0 && stack.at(-1) === "*") || stack.at(-1) === "/") {
      answer.push(stack.pop());
    }
    stack.push(item);
  } else if (item === "(") {
    stack.push(item);
  } else if (item === ")") {
    while (stack.length > 0 && stack.at(-1) !== "(") {
      answer.push(stack.pop());
    }
    stack.pop();
  }
});

while (stack.length) {
  answer.push(stack.pop());
}

console.log(answer.join(""));
