function solution(numbers, hand) {
    let answer = '';
    let left = '*';
    let right = '#';
    const keypad = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ["*", 0, "#"]];
    
    numbers.forEach((number) => {
        // 1,4,7은 왼손
        if (number === 1 || number === 4 || number === 7) {
            answer += "L";
            left = number;
        }
        // 3,6,9는 오른손
        else if (number === 3 || number === 6 || number === 9) {
            answer += "R";
            right = number;
        }
        // 2,5,8,0은 가까운 손 또는 주로 쓰는 손
        else {
            const L = fingerPosition(left);
            const C = fingerPosition(number);
            const R = fingerPosition(right);
            
            const leftDistance = Math.abs(L[0] - C[0]) + Math.abs(L[1] - C[1])
            const rightDistance = Math.abs(R[0] - C[0]) + Math.abs(R[1] - C[1])
        
            if (leftDistance < rightDistance) {
                answer += "L";
                left = number;
            } else if (leftDistance > rightDistance) {
                answer += "R";
                right = number;
            } else {
                const finger = hand === "right" ? "R" : "L";
            
                if (finger === "R") right = number;
                else left = number
            
                answer += finger
            }
        }
    })
    
    // 키패드 위치값 구하는 함수
    function fingerPosition(number) {
        for (let i = 0; i < keypad.length; i ++) {
            for (let j = 0; j < keypad[i].length; j ++) {
                if (keypad[i][j] === number) return [i, j];
            }
        }
    };
    
    return answer;
}