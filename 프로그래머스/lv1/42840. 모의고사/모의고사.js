function solution(answers) {
    let answer = [];
    let a = [1, 2, 3, 4, 5]; 
    let b = [2, 1, 2, 3, 2, 4, 2, 5];
    let c = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
    let result = [0, 0, 0];
    
    answers.map((item, index) => {
        if(item === a[index % a.length]) result[0] += 1;
        if(item === b[index % b.length]) result[1] += 1;
        if(item === c[index % c.length]) result[2] += 1;
    });
    
    let max = Math.max(...result);

    max === result[0] ? answer.push(1) : false;
    max === result[1] ? answer.push(2) : false;
    max === result[2] ? answer.push(3) : false;
    
    return answer;
}