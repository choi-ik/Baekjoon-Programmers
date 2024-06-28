function solution(n, edge) {
    const node = Array.from({length: n + 1}, () => []);
    const visit = [0, 1];
    edge.forEach(([a, b]) => {
        node[a].push(b);
        node[b].push(a);
    });
    
    const queue = [1];
        
    while (queue.length) {
        const num = queue.shift();
            
        for (const n of node[num]) {
            if (!visit[n]) {
                queue.push(n);
                visit[n] = visit[num] + 1;
            }
        }
    }
    
    const max = Math.max(...visit)
    return visit.filter(e => e === max).length
};