function solution(array, commands) {
    let answer = [];
    
    for(let i=0; i<commands.length; i++) {
        let number = array.slice(commands[i][0]-1, commands[i][1])
        number.sort((a, b) => a - b);
        answer.push(number[commands[i][2]-1]);
    }
    
    return answer;
}