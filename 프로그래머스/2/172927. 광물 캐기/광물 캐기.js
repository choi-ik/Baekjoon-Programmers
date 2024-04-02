function solution(picks, minerals) {
    let answer = 0
    let diaCnt = 0
    let ironCnt = 0
    let stoneCnt = 0
    let mineralSort = []
    let maxSize = Math.min(minerals.length, picks.reduce((acc, cur) => acc + cur, 0) * 5)
    
    for (let i = 0; i < minerals.length; i ++) {
        if (i >= maxSize) break;
        
        if (minerals[i] === 'diamond') diaCnt++
        if (minerals[i] === 'iron') ironCnt++
        if (minerals[i] === 'stone') stoneCnt++
        
        if ((i + 1) % 5 === 0 || i === maxSize - 1) {
            mineralSort.push([diaCnt, ironCnt, stoneCnt]);
            diaCnt = 0
            ironCnt = 0
            stoneCnt = 0
        }
    }
    
    mineralSort.sort((a, b) => b[0] - a[0] || b[1] - a[1])
    
    let i = 0;
    for (const [diaCnt, ironCnt, stoneCnt] of mineralSort) {
        while (picks[i] === 0) i ++
        
        if (i === 0) answer += (diaCnt + ironCnt + stoneCnt)
        else if (i === 1) answer += (diaCnt * 5 + ironCnt + stoneCnt)
        else if (i === 2) answer += (diaCnt * 25 + ironCnt * 5 + stoneCnt)
        
        picks[i]--
    }
    
    return answer;
}