function solution(msg) {
    let alpha = [""];
    let answer = [];
    
    // 사전 초기화
    for (let i = 65; i <= 90; i ++) {
        alpha.push( String.fromCharCode([i]));
    }
    
    let idx = 1;
    let str = msg[0]; // 현재 입력
    
    // msg 전체를 순회하며 사전에 찾는 문자가 있는지 없는지 검사
    while (idx <= msg.length) {
        let w = str + msg[idx]; // 현재 입력과 다음 글자 합친 문자
        
        // 현재 입력과 다음 글자를 합친 글자가 사전에 존재하지 않을 때
        if (!alpha.includes(w)) {
            answer.push(alpha.indexOf(str)); // 현재 입력의 사전 번호
            alpha.push(w) // 사전에 새로운 문자열 추가
            str = msg[idx]; // 현재 입력 다음 문자로 초기화
            idx ++
        }
         // 현재 입력과 다음 글자를 합친 글자가 사전에 존재할 때
        else {
            str += msg[idx];
            idx ++;
        };
    };
   
    return answer;
}