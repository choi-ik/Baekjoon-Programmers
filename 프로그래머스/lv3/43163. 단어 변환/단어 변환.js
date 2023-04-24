function solution(begin, target, words) {
    let answer = 0;
    let wordSet = new Set(words);
    
    if(wordSet.has(target) === false) return 0;
    
    let visit = new Array(words.length).fill(false);
    
    function BFS(w) {
        let queue = [w];
        
        while(queue.length > 0) {
            let wArr = queue.shift();
            answer++;
            if(wArr === target) return;
            
            for(let i=0; i<words.length; i++) {
                if(visit[i] === true) continue;
                let cnt = 0;
                let targetCnt = 0;
                visit[i] = true;
                
                for(let j=0; j<wArr.length; j++) {
                    if(wArr[j] === words[i][j]) cnt++;
                    if(wArr[j] === target[j]) targetCnt++;
                }
                if(targetCnt === begin.length-1) {
                    queue.push(target);
                } else if(cnt === begin.length-1) {
                    queue.push(words[i]);
                    break;
                } else {
                    continue;
                }
            }
        }
    }
    BFS(begin);
    return answer-1;
}