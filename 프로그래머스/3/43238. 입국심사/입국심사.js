function solution(n, times) {
    let answer = 0;
    let start = 1;
    let end = times.sort((a, b) => a - b)[1] * n;
    
    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        let peoples = 0;
        
        for (const time of times) {
            peoples += Math.floor(mid / time);
        }
        
        if (peoples >= n) {
            answer = mid;
            end = mid - 1;  
        } 
        else start = mid + 1  
        
    }
    
    return answer;
}