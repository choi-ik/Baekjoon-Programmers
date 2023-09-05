function solution(babbling) {
    let answer = 0;
    let say = ['aya', 'ye', 'woo', 'ma'];
    
    for (let word of babbling) {
        for (let can of say) {
            // 같은 단어가 두번 반복되면 발음 할 수 없음
            if (word.includes(can.repeat(2))) break;
            
            // 조카가 말 할 수 있는 단어로 분리
            word = word.split(can).join(' ')
        };
        // 다시 재조합 하였을 때 길이가 0 이라면 
        if (word.split(' ').join('').length === 0) answer ++;
    }
    
    return answer;
}