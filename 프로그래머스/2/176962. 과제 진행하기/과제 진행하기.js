/** 과제 끝난 시각 -> 우선순위: 새로 시작한 과제 > 멈춰둔 과제(여러개 있을 시 가장 최근거 부터) 
    1. 시간 순 정렬 -> : 기준으로 숫자를 더한 뒤 정렬
    2. 반복 돌면서 과제 진행
    3. 과제를 멈출 땐 스택에 남은 시간과 함께 넣음
    4. 과제를 끝내고 시간이 남으면, 스택에서 멈춘 과제를 꺼내어 이어서 진행
*/
function solution(plans) {
    let answer = []
    let stack = []
    
    plans = plans.map((plan) => {
        const [hour, minute] = plan[1].split(':').map(Number)
        const time = hour * 60 + minute
        return [plan[0], time, Number(plan[2])]
    })
    
    plans.sort((a, b) => a[1] - b[1])
    
    for (let i = 0; i < plans.length; i++) {
        if (i === plans.length - 1) {
            stack.push(plans[i])
            break
        }
        
        const [name, startTime, time] = plans[i]
        const [nName, nStartTime, nTime] = plans[i + 1]
        
        if (startTime + time <= nStartTime) {
            answer.push(name)
            let tempTime = nStartTime - (startTime + time)
            
            while (tempTime > 0 && stack.length) {
                const [sName, sStartTime, sTime] = stack.pop();
                if (tempTime < sTime) {
                    stack.push([sName, sStartTime, sTime - tempTime])
                    tempTime = 0
                } else {
                    tempTime -= sTime
                    answer.push(sName)
                }
                
            }
        } else {
            plans[i][2] = (startTime + time) - nStartTime
            stack.push(plans[i]) 
        }
    }
    console.log(stack)
    while (stack.length) {
        answer.push(stack.pop()[0])
    }
    
    return answer;
}