let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N  = +input.shift();

if (N % 2 === 1) console.log("SK");
else console.log("CY");