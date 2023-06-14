function solution(sequence, k) {
    let answer = [];
    let prefix = [0];
    let min = Infinity
    
    // 투포인터 사용하기 위한 변수
    let left = 0;
    let right = 0;
    
    // prefix에는 sequence[0] ~ sequence[i-1]까지의 합이 들어있음.
    sequence.forEach((val, i) => {
        prefix.push(val + prefix[i]);
    });
    
    while (left <= right) {
        let sum = prefix[right] - prefix[left];
        
        if (sum === k) {
            let len = (right - 1) - left;
            if (min > len) {
                min = len;
                answer = [left, right-1];
            }
        };
        
        if (sum < k) {
            right ++;
        } else left ++;
    };
    
    return answer;
}