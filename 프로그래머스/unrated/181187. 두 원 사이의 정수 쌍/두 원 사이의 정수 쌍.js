function solution(r1, r2) {
    var answer = 0;
    let tmp = 0;
    let r1x = 0;
    let r2x = 0;
    
    // 큰 원 기준으로 x축 1부터 시작하여 끝점까지 (0부터 시작하면 각기 다른 사분면이 겹침)
    for (let x = 1; x <= r2; x ++) {
        
        let maxY = Math.floor(Math.sqrt((r2 ** 2) - (x ** 2)));
        let minY = 0;
        
        // x가 r1의 범위를 넘어가면 minY값은 0
        if (r1 >= x) minY = Math.ceil(Math.sqrt((r1 ** 2) - (x ** 2)));
        
        // 두 원 사이의 좌표를 찾아야 하므로 큰원은 반내림으로 남은 부분 버리고
        // 작은원은 반올림으로 채운 뒤 작은원과 큰원의 길이를 빼고 1을 더해주면 두 원사이의 좌표 개수를 구할 수 있음.
        answer += maxY - minY + 1 
    }
    
    return answer * 4;
}