function solution(new_id) {
    var answer = '';
    
    for(var i=0; i<7; i++){
        if(i === 0) answer = new_id.toLowerCase();
        if(i === 1) answer = answer.replace(/[^a-zA-Z0-9\-\_\.]/g, "");
        if(i === 2) answer = answer.replace(/\.{2,}/g, ".");
        if(i === 3) answer = answer.replace(/^\.|\.$/g, "");
        if(i === 4) answer = answer.replace(/^$/g, "a");
        if(i === 5){
            if(answer.length > 15){
                answer = answer.slice(0, 15).replace(/\.$/g, "");
            }
        }
        if(i === 6){
            if(answer.length <= 2){
                answer += answer.charAt(answer.length-1).repeat(3-answer.length);
            }
        }
    }
    
    return answer;
}