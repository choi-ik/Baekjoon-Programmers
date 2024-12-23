function solution(n, times) {
    let answer = Infinity;
    const min = 1;
    const max = Math.max(...times) * n;
    
    function binarySearch(start, end) {
        while (start <= end) {
            let mid = Math.floor((start + end) / 2);     
            let count = 0;
            
            times.forEach(time => {
                count += Math.floor(mid / time);
                
                 if (count >= n) {
                    answer = Math.min(answer, mid);
                    return;
                }
            })
            
            if (count >= n) end = mid - 1;
            else start = mid + 1;
        }
        
        return answer;
    }
    
    return binarySearch(min, max);;
}