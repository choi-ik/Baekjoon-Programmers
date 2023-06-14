function solution(cap, n, deliveries, pickups) {
    var answer = 0;
    // 배달 배열, 수거 배열 역순 정렬
    deliveries.reverse();
    pickups.reverse();
    
    let deli = 0;
    let pick = 0;
    
    // 배열을 돌면서 deli 와 pick이 양수일때 answer에 곱해줌
    for (let i = 0; i < n; i ++) {
        deli += deliveries[i];
        pick += pickups[i];
        
        while (deli > 0 || pick > 0) {
            deli -= cap;
            pick -= cap;
            answer += (n - i) * 2
        };
    };
    
    return answer;
}