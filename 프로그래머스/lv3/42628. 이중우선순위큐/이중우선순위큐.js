function solution(operations) {
    let arr = [];
    let answer = [];
    const insert = /\I\s(-?)\d/;
    const maxDelete = /[D]\s\d/;
    const minDelete = /[D]\s(-)\d/;
    
    for(let i=0; i<operations.length; i++) {
        if(insert.test(operations[i])) {
            arr.push(Number(operations[i].substring(2)));
            arr.sort((a, b) => a - b);
        }
        if(maxDelete.test(operations[i])) {
            arr.pop();
        }
        if(minDelete.test(operations[i])) {
            arr.shift();
        }
    }
    if(arr.length === 0) return [0,0];
    else{
        answer.push(arr[arr.length-1]);
        answer.push(arr[0]);
    }
    console.log(answer);
    return answer;
}