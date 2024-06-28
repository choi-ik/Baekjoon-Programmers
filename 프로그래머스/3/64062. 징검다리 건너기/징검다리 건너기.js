function solution(stones, k) {
    let answer = 0;
    let start = 1;
    let end = 200000000;
    
    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        let count = 0;
        
        for (const stone of stones) {
            if (stone - mid <= 0) count += 1;
            else count = 0;
            
            if (count >= k) break;
        }
        
        if (count >= k) end = mid - 1;
        else {
            start = mid + 1;
            answer = start;
        }
    }
    
    return answer;
}