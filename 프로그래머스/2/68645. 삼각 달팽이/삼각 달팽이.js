function solution(n) {
    const arr = Array.from({ length: n }, () => new Array(n).fill(0));
    const directions = [[1, 0], [0, 1], [-1, -1]];
  
    let row = -1;
    let col = 0;
    let nowValue = 1;
    let nowDirectionIndex = 0;

    for (let i = n; i > 0; i -= 1) {
        const [dRow, dCol] = directions[nowDirectionIndex];

        for (let j = 0; j < i; j += 1) {
          row += dRow;
          col += dCol;

          arr[row][col] = nowValue;
          nowValue += 1;
        }

        nowDirectionIndex = (nowDirectionIndex + 1) % 3;
    }

    return arr.map(e => e.filter(k => k > 0)).flat();
};