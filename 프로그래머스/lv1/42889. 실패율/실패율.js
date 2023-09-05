function solution(N, stages) {
    var answer = [];
    
    for (let i = 1; i <= N; i ++) {
        let size = stages.filter(e => e >= i).length;
        let fail = stages.filter(e => e === i).length;
        
        answer.push([i, fail / size]);
    };
    
    answer.sort((a, b) => b[1] - a[1]);
    answer = answer.map(e => e[0]);
    return answer;
}