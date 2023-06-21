let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let S = input[0].trim();
let T = input[1].trim();

while (true) {
    if (T[T.length - 1] === "A") T = T.slice(0, T.length - 1);
    else if (T[T.length - 1] === "B")  {
        T = T.split("");
        T.pop();
        T.reverse();
        T = T.join("");
    };
    
    if (T.length === S.length) {
        if (T === S) {
            console.log(1);
            break;
        } else {
            console.log(0);
            break;
        } 
    };
};