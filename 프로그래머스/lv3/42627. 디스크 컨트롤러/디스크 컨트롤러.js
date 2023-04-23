function solution(jobs) {
    let sum = 0; // 총 소요시간
    let now = 0; // 현재 시간
    let index = 0; // 반복문을 순회 할 변수
    const length = jobs.length; 
    const waiting = []; // 실행을 위해 대기할 배열
    jobs.sort((a, b) => a[0] - b[0]);
    
    while(index < jobs.length || waiting.length > 0) {
        if(index < jobs.length && now >= jobs[index][0]) {
            waiting.push(jobs[index]);
            waiting.sort((a, b) => a[1] - b[1]);
            index++;
            continue;
        }
        if(waiting.length === 0) {
            now = jobs[index][0]
        } else {
            let [requestTime, runningTime] = waiting.shift();
            now += runningTime;
            sum += now - requestTime; 
        }
    }
    return Math.floor(sum / length);
}