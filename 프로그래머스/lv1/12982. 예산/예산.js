function solution(d, budget) {
    var answer = 0;
    var sum = 0;
    d.sort((a,b) => {
        return a-b;
    });
    
    for (var i=0; i<d.length; i++) {
        answer++;
        sum += d[i]
        if(sum > budget) answer--;
    }
    return answer;
}