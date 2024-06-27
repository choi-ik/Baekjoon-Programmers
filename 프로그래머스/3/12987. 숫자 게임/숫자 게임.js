function solution(A, B) {
    let answer = 0;
    let b = 0; // B 팀의 포인트(포인터라고 보면됨 가리키는 위치)
    A.sort((a, b) => b - a)
    B.sort((a, b) => b - a)

    for (let i = 0; i < A.length; i ++) {
        if (A[i] < B[b]) {
            b ++;
            answer ++;
        }
    }
    
    return answer;
}