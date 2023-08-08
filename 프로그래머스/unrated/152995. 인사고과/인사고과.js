function solution(scores) {
    let wanho = scores[0];
    scores = scores.splice(1) // 완호 점수 제거

    let score = wanho[0] + wanho[1]; // 완호의 점수
    let rank = 1; // 석차
    
    
    scores.sort((a, b) => {
        // 근태가 같다면 동료평가 오름차순 정렬
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }
        // 근태가 같지 않으면 내림차순 정렬
        else return b[0] - a[0];
    });
    
    
    let point = 0; // 동료 평가 점수
    
    // 근태점수 기준으로 정렬된 동료 평가 점수중 가장 높은 점수보다 낮은 점수가 등장한다면 인센티브를 받을 수 없는 사원임
    for (let [a, b] of scores) {
        // 완호가 인센티브를 받을 수 없는 경우
        if (a > wanho[0] && b > wanho[1]) return -1
        // 동료 평가 점수 비교 후 동료 평가 점수 갱신
        if (point <= b) {
            // 완호의 점수보다 높다면 등수 밀려남
            if (score < a + b) rank ++;
            point = b;
        };
    };

    return rank;
}