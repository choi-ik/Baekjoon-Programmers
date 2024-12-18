function solution(dirs) {
    const move = {
        U: [-1, 0],
        D: [1, 0],
        L: [0, -1],
        R: [0, 1],
    };
    let current = [0, 0];
    const set = new Set();
    
    for (let dir of dirs) {
        const [x, y] = move[dir];
        const newX = current[0] + x;
        const newY = current[1] + y;
        
        if (newX < -5 || newX > 5 || newY < -5 || newY > 5) continue;
        
        set.add([current[0], current[1], newX, newY].join(''));
        set.add([newX, newY, current[0], current[1]].join(''));
        current = [newX, newY];
    };
    
    return Math.floor(set.size / 2);
}