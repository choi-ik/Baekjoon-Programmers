function solution(r1, r2) {
    var answer = 0;
    let tmp = 0;
    let r1x = 0;
    let r2x = 0;
    
    for (let x = 1; x <= r2; x ++) {
        let maxY = Math.floor(Math.sqrt((r2 ** 2) - (x ** 2)));
        let minY = 0;
        
        if (r1 >= x) minY = Math.ceil(Math.sqrt((r1 ** 2) - (x ** 2)));
        
        answer += maxY - minY + 1 
    }
    
    return answer * 4;
}