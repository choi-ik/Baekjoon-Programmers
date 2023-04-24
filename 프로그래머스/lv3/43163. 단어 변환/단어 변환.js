function solution(begin, target, words) {
    let answer = 0;
    let wordSet = new Set(words);
    
    if(wordSet.has(target) === false) return 0;
    
    let visit = new Array(words.length).fill(false);
    
    function BFS(w, count) {
        let queue = [w]
        
        while(queue.length > 0) {
            let wArr = queue.shift()
            if(wArr === target) return ;
            answer++
            
            for(let i=0; i<words.length; i++) {
                if(visit[i] === true) continue;
                let cnt = 0;
                for(let j=0; j<wArr.length; j++) {
                    if(words[i][j] === wArr[j]) {
                        cnt++
                    }
                }
                if(cnt === begin.length-1) {
                    queue.push(words[i])
                    break;
                }
                visit[i] = true;
            }
        }
    }
    BFS(begin,answer);
    console.log(visit)
    console.log(answer-1)
    return answer;
}