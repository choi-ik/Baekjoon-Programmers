function solution(N, road, K) {
    const arr = Array(N + 1).fill(Infinity);
    const lines = Array.from({length: N + 1}, () => []);
    
    road.forEach(info => {
        const [a, b, c] = info;
        lines[a].push({to: b, cost: c})
        lines[b].push({to: a, cost: c})
    });
    
    const queue = [{to: 1, cost: 0}];
    arr[1] = 0;
    
    while(queue.length) {
        const { to } = queue.pop();
        
        lines[to].forEach(next => {
            if (arr[next.to] > arr[to] + next.cost) {
                arr[next.to] = arr[to] + next.cost;
                queue.push(next);
            }
        })
    }
    
    
    return arr.filter(value => value <= K).length
}