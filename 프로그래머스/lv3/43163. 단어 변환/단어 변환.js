function solution(begin, target, words) {
    let answer = 0;
    
    /* wordSet이라는 Set 객체에 words 넣어주고 target 값이 없으면 0 return */
    let wordSet = new Set(words);
    if(wordSet.has(target) === false) return 0;
    
    /* 방문 배열 생성*/
    let visit = new Array(words.length).fill(false);
    
    /* words를 탐색할 BFS 함수(최소 몇 단계의 과정을 찾는지 물음 즉, 최단거리와 같은 질문) */
    function BFS(w) {
        let queue = [w];
        
        while(queue.length > 0) {
            let wArr = queue.shift();
            answer++;
            if(wArr === target) return;
            
            for(let i=0; i<words.length; i++) {
                if(visit[i] === true) continue;
                let cnt = 0; // 큐에서 추출한 wArr와 words의 같은 알파벳 개수
                let targetCnt = 0; // 큐에서 추출한 wArr와 target의 같은 알파벳 개수
                visit[i] = true; // 방문 처리
                
                for(let j=0; j<wArr.length; j++) {
                    if(wArr[j] === words[i][j]) cnt++;
                    if(wArr[j] === target[j]) targetCnt++;
                };
                
                if(targetCnt === begin.length-1) {
                    queue.push(target); 
                } else if(cnt === begin.length-1) {
                    queue.push(words[i]);
                    break;
                };
            };
        };
    };
    
    BFS(begin);
    return answer-1;
}