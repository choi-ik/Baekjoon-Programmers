function solution(targets) {
    let answer = 1;

    targets.sort((a, b) => a[1] - b[1]);
    let intercept = targets[0];
    
    let i = 1;
    while (i < targets.length) {
        if (targets[i][0] < intercept[1]) i++;
        else {
            answer ++;
            intercept = targets[i]
            i++;
        }
    };
    
    console.log(targets)
    
    return answer;
}