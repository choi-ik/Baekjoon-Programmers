function solution(progresses, speeds) {
    var answer = [];
    let releaseArr = [];
    let queue = progresses;
    
    for(let i = 0; i < queue.length; i++){
        let count = 0;
        for(let j = queue[i]; j <= 100;){
            j+= speeds[i];
            count++;
            if(j >= 100) {
                releaseArr.push(count);
                break;
            };
        }
    }
    for(let i = 0; i < releaseArr.length;){
        let count = 1;
        if(i === releaseArr.length-1){
            answer.push(count);
            break;
        }
        for(let j = i+1; j <= releaseArr.length; j++){
            if(releaseArr[i] >= releaseArr[j]){
                count++;
            }else{
                releaseArr.splice(i, j);
                console.log(releaseArr)
                answer.push(count);
                break;
            }
        }
    }
    return answer;
}