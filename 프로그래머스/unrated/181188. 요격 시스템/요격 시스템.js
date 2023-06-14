/*
    미사일을 최소로 사용해 요격해야 함.
    2차원 배열.
    A 나라 미사일 -> X 축에 평행한 직선 형태의 모양.
    B 나라 -> 특정 x 좌표에서 y 축에 수형이 되도록 미사일 발사.
    발사된 미사일 해당 x 좌표에 걸쳐있는 모든 폭격미사일 요격.
    s와 e에서 발사되는 요격 미사일로는 요격 할 수 없음.
    
    
*/

function solution(targets) {
    let answer = 1;
    targets.sort((a, b) => a[0] - b[0]);
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