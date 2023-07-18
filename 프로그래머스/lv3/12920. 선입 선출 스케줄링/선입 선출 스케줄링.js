function solution(n, cores) {
    // n이 코어의 수보다 적다면 n을 리턴
    if (n <= cores.length) return n;
    else {
        n -= cores.length;
        // left(최소 시간) right(최대 시간), mid()
        let left = 1;
        let right = Math.max(...cores) * n;

        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            // mid 값이 주어졌을 때 처리할 수 있는 총 작업의 수
            let capacity = 0;
            
            // mid / core로 계산한 몫의 누적합
            cores.forEach((e) => capacity += Math.floor(mid / e));
            
            // 현재 작업의 총량이 실제 작업량 보다 크거나 같으면 right 범위 감소 
            if (capacity >= n) right = mid;
            else left = mid + 1;
        };
        
        // right - 1 시간대에서 처리한 작업량을 기존 작업량에서 제외 -> 따라서 right 시간대에 처리할 작업만 남게 됨
        cores.forEach((e) => n -= Math.floor((right - 1) / e));

        // 현재 시간인 right를 코어의 처리 시간으로 나누어 떨어지는 순간이 바로 해당 코어가 새로운 작업을 할당 받는 시점이 됨(현재 시간의 약수가 되는 코어)
        for (let i = 0; i < cores.length; i ++) {
            if (right % cores[i] === 0) {
                // 새 작업을 할당하기 때문에 남아있는 작업의 수를 1개 줄임
                n -= 1;
                // 남아있는 작업이 0이 되는 지점이라면 문제에서 코어의 인덱스를 1부터 시작하도록 설정했으므로 현재 인덱스에 +1한 값을 반환
                if (n === 0) return i + 1;
            }
        }
    };
};