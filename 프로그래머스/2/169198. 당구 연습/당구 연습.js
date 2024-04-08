function solution(m, n, startX, startY, balls) {
    let answer = [];
    
    balls.forEach((ball) => {
        const [targetX, targetY] = ball;
        let min = Infinity;
        
        // 동일한 X 좌표에 있는 경우
        if (targetX === startX) {
            min = Math.min(min, (targetX + startX) ** 2 + Math.abs(targetY - startY) ** 2); // 좌 쿠션
            min = Math.min(min, (m + m - targetX - startX) ** 2 + Math.abs(targetY - startY) ** 2) // 우 쿠션
            
            // 시작공이 목표공 보다 위에 있다면 위 쿠션 가능
            if (startY > targetY) min = Math.min(min, Math.abs(targetX - startX) ** 2 + (n + n - targetY - startY) ** 2);
            else min = Math.min(min, Math.abs(targetX - startX) ** 2 + (targetY + startY) ** 2);
        }
        // 동일한 Y좌표에 있는 경우
        else if (targetY === startY) {
            min = Math.min(min, Math.abs(targetX - startX) ** 2 + (n + n - targetY - startY) ** 2); // 위 쿠션
            min = Math.min(min, Math.abs(targetX - startX) ** 2 + (targetY + startY) ** 2); // 아래 쿠션
            
            // 시작공이 목표공보다 우측에 있으면 우측 쿠션 가능
            if (startX > targetX) min = Math.min(min, (m + m - targetX - startX) ** 2 + Math.abs(targetY - startY) ** 2);
            else min = Math.min(min, (targetX + startX) ** 2 + Math.abs(targetY - startY) ** 2);
        }
        // X, Y 둘다 동일한 좌표가 없는 경우
        else {
            min = Math.min(min, (targetX + startX) ** 2 + Math.abs(targetY - startY) ** 2); // 좌 쿠션
            min = Math.min(min, (m + m - targetX - startX) ** 2 + Math.abs(targetY - startY) ** 2); // 우 쿠션
            min = Math.min(min, Math.abs(targetX - startX) ** 2 + (n + n - targetY - startY) ** 2); // 위 쿠션
            min = Math.min(min, Math.abs(targetX - startX) ** 2 + (targetY + startY) ** 2); // 아래 쿠션
        }
        
        answer.push(min)
    })
    return answer;
}