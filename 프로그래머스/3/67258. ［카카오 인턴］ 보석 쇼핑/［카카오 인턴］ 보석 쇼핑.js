function solution(gems) {
    let answer = [1, gems.length];
    let l = 0, r = 0;
    const count = new Set(gems).size;
    const map = new Map();
    
    map.set(gems[0], 1);
    
    while (r < gems.length) {
        if (map.size === count) {
            if (answer[1] - answer[0] > r - l) answer = [l + 1, r + 1];
            
            map.set(gems[l], map.get(gems[l]) - 1);
            
            if (map.get(gems[l]) === 0) map.delete(gems[l]);
            
            l += 1;
        } else {
            r += 1;
            const right = map.get(gems[r]);
            map.set(gems[r], right ? right + 1 : 1);
        }
    }
    
    return answer;
}