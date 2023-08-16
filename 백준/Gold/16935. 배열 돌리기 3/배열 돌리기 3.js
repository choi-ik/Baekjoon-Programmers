let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, R] = input[0].split(" ").map(Number);
let map = input.slice(1, N + 1).map(e => e.split(' ').map(Number)); // 맵
let simulation = input[input.length - 1].split(' ').map(Number); // 시뮬레이션

simulation.forEach((num, i) => {
    let simulArr = []; // 시뮬레이션 돌릴 배열

    // 상 하 반전
    if (num === 1) {
        for (let i = map.length - 1; i >= 0; i --) {
            simulArr.push([]);
            for (let j = 0; j < map[i].length; j ++) {
                simulArr[(map.length - 1) - i].push(map[i][j]);
            };
        };
    }
    // 좌 우 반전
    else if (num === 2) {
        for (let i = 0; i < map.length; i ++) {
            simulArr.push([]);
            for (let j = map[i].length - 1; j >= 0; j --) {
                simulArr[i].push(map[i][j]);
            };
        };
    }
    // 오른쪽 90도 회전
    else if (num === 3) {
        let group = [];
        
        // 행 원소 수집
        for (let i = 0; i < map[0].length; i ++) {
            group.push([]);
            for (let j = map.length - 1; j >= 0; j --) {
                group[i].push(map[j][i]);
            };
        };

        simulArr = group;
    }
    // 왼쩍 90도 회전
    else if (num === 4) {
        let group = [];

        // 행 원소 수집
        for (let i = map[0].length - 1; i >= 0; i --) {
            group.push([]);
            for (let j = 0; j < map.length; j ++) {
                group[(map[0].length - 1) - i].push(map[j][i]);
            };
        };

        simulArr = group;
    }
    // 5번 연산 1 -> 2, 2 -> 3, 3 -> 4, 4 -> 1
    else if (num === 5) {
        let area = Array.from({length: 4}, () => []);

        for (let i = 0; i < Math.floor(map.length / 2); i ++) {
            for (let j = 0; j < Math.floor(map[i].length / 2); j ++) {
                area[0].push(map[i][j]);
                area[1].push(map[i][j + Math.floor(map[i].length / 2)])
                area[2].push(map[i + Math.floor(map.length / 2)][j + Math.floor(map[i].length / 2)]);
                area[3].push(map[i + Math.floor(map.length / 2)][j]);
            };
        };

        simulArr = Array.from({length: map.length}, () => Array.from({length: map[0].length}, () => 0));

        // 4 -> 1
        area[3].forEach((e, idx) => {
            // x, y
            let temp = [Math.floor(idx / Math.floor(map[0].length / 2)), idx % Math.floor(map[0].length / 2)];
            simulArr[temp[0]][temp[1]] = e;
        });
        // 1 -> 2
        area[0].forEach((e, idx) => {
            // x, y
            let temp = [Math.floor(idx / Math.floor(map[0].length / 2)), (idx % Math.floor(map[0].length / 2)) + Math.floor(map[0].length / 2)];
            simulArr[temp[0]][temp[1]] = e;
        });
        // 2 -> 3
        area[1].forEach((e, idx) => {
            // x, y
            let temp = [Math.floor(idx / Math.floor(map[0].length / 2)) + Math.floor(map.length / 2), (idx % Math.floor(map[0].length / 2)) + Math.floor(map[0].length / 2)];
            simulArr[temp[0]][temp[1]] = e;
        });
        // 3 -> 4
        area[2].forEach((e, idx) => {
            // x, y
            let temp = [Math.floor(idx / Math.floor(map[0].length / 2)) + Math.floor(map.length / 2), (idx % Math.floor(map[0].length / 2))];
            simulArr[temp[0]][temp[1]] = e;
        });
    }
    // 6번 연산 1 -> 4, 4 -> 3, 3 -> 2, 2 -> 1
    else {
        let area = Array.from({length: 4}, () => []);

        for (let i = 0; i < Math.floor(map.length / 2); i ++) {
            for (let j = 0; j < Math.floor(map[i].length / 2); j ++) {
                area[0].push(map[i][j]);
                area[1].push(map[i][j + Math.floor(map[i].length / 2)])
                area[2].push(map[i + Math.floor(map.length / 2)][j + Math.floor(map[i].length / 2)]);
                area[3].push(map[i + Math.floor(map.length / 2)][j]);
            };
        };

        simulArr = Array.from({length: map.length}, () => Array.from({length: map[0].length}, () => 0));

        // 2 -> 1
        area[1].forEach((e, idx) => {
            // x, y
            let temp = [Math.floor(idx / Math.floor(map[0].length / 2)), idx % Math.floor(map[0].length / 2)];
            simulArr[temp[0]][temp[1]] = e;
        });
        // 3 -> 2
        area[2].forEach((e, idx) => {
            // x, y
            let temp = [Math.floor(idx / Math.floor(map[0].length / 2)), (idx % Math.floor(map[0].length / 2)) + Math.floor(map[0].length / 2)];
            simulArr[temp[0]][temp[1]] = e;
        });
        // 4 -> 3
        area[3].forEach((e, idx) => {
            // x, y
            let temp = [Math.floor(idx / Math.floor(map[0].length / 2)) + Math.floor(map.length / 2), (idx % Math.floor(map[0].length / 2)) + Math.floor(map[0].length / 2)];
            simulArr[temp[0]][temp[1]] = e;
        });
        // 1 -> 4
        area[0].forEach((e, idx) => {
            // x, y
            let temp = [Math.floor(idx / Math.floor(map[0].length / 2)) + Math.floor(map.length / 2), (idx % Math.floor(map[0].length / 2))];
            simulArr[temp[0]][temp[1]] = e;
        });
    }

    map = simulArr;
});

map.forEach((e) => console.log(e.join(' ')));