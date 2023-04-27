function solution(n, lost, reserve) {
    let answer = 0;
    lost.sort();
    reserve.sort();
    // 중복 확인
    for(let i=0; i<lost.length; i++) {
        for(let j=0; j<reserve.length; j++) {
            if(lost[i] === reserve[j]) {
                lost.splice(i, 1);
                reserve.splice(j, 1);
                console.log("로스트", lost, "리버스", reserve)
                i--;
            }
        }
    }
  
     for(let i=0; i<lost.length; i++) {
        for(let j=0; j<reserve.length; j++) {
            if(lost[i]-1 === reserve[j] || lost[i]+1 === reserve[j]) {
                lost.splice(i,1);
                reserve.splice(j,1);
                i--;
                continue;
            }
        }
     }
    
    return n - lost.length;
}