function solution(participant, completion) {
    var answer = '';
    participant.sort();
    completion.sort();
    console.log(participant)
    console.log(completion)
    
    for(var i=0; i<participant.length; i++){
        if(participant[i] !== completion[i]) {
            answer = participant[i];
            break;
        }
    }
    
    return answer;
}