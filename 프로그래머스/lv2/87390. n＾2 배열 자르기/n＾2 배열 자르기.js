function solution(n, left, right) {
    var answer = [];
    let str = "";
    
    /*  ex) 123 . 233 . 333
        i가 n보다 작다면 123 -> 1씩 증가 하는 부분을 참조해 +1 한 값을 넣어주고,
        i가 n보다 크거나 같다면 i를 n으로 나눈 뒤, 나눈 값과 i를 n으로 나눈 나머지를 비교하고,
        나머지가 temp(i를 n으로 나눈 값)보다 작다면 temp + 1
        그렇지 않다면 i를 n으로 나눈 값에 + 1 해준다.
    */
    for (let i = left; i <= right; i ++) {
        if (i >= n) {    // left가 n보다 크거나 같다면 규칙 적용
            let temp = Math.floor(i / n);   // i를 n으로 나눈 값
            if (temp >= i % n) answer.push(temp + 1)    // 나머지가 temp 보다 작거나 같다면 temp + 1
            else answer.push((i % n) + 1)   // 나머지가 temp 보다 크다면 나머지에 + 1 한 값
        }
        else answer.push(i + 1)     // left가 n보다 작으면 i + 1 push
    };

    return answer;
}