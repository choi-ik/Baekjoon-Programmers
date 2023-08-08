function solution(record) {
    let answer = [];
    let id = {}; // 아이디 객체
    
    // 아이디와 최근 닉네임 딕셔너리에 설정
    record.forEach((e) => {
        const [chat, userId, name] = e.split(" ");
        if (chat === 'Enter' || chat === 'Change') id[userId] = name;
        
    });
    
    // record에 주어진 순서대로 answer배열에 push
    record.forEach((e) => {
        const [chat, userId, name] = e.split(" ");
        if (chat === 'Enter') answer.push(id[userId] + "님이 들어왔습니다.");
        if (chat === 'Leave') answer.push(id[userId] + "님이 나갔습니다.")
    })
    
    return answer;
};