let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const N = +input[0];
let seq = input[1].split(" ").map(value => +value);
let lis = [];

// 이분 탐색 함수
const binarySearch = (left, right, target) => {
    let mid = 0;

    while (left < right) {
        mid = Math.floor((left + right) / 2);

        if (lis[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return right;
}

let i = 1;
let j = 0;
lis[0] = seq[0];

while (i < N) {
    if (lis[j] < seq[i]) {
        lis[j + 1] = seq[i];
        j++;
    } else {
        let idx = binarySearch(0, j, seq[i]);
        lis[idx] = seq[i];
    }
    
    i++;
}

console.log(lis.length);