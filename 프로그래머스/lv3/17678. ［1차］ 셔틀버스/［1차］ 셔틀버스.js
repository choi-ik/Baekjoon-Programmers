function solution(n, t, m, timetable) {
    let timeArr = [];
    let BusTime = 540;     // 60 * 9 -> 첫 셔틀 운행 시각 
    
    timetable.forEach((time) => {
        let curTime = time.split(":").map(e => +e);
        let totalTime = curTime[0] * 60 + curTime[1];
        // 분 단위 시간 계산
        timeArr.push(totalTime);
    });
    
    // 시간 오름차순 정렬
    timeArr.sort((a, b) => a- b);
    
    for (let i = 0; i < n; i ++) {
        let currentPeople = timeArr.filter((t) => t <= BusTime).length;
        
        // 마지막 운행 버스라면
        if (i === n - 1) {
            // 타야하는 승객 수가 m명 이상인 경우, 무조건 m-1보다 1분 앞에 나와 버스 타야함
            if (currentPeople >= m) BusTime = timeArr[m-1] - 1;
        }
        // 마지막 운행 버스가 아니라면
        else {
            if (currentPeople > m) timeArr.splice(0, m);
            if (currentPeople <= m) timeArr.splice(0, currentPeople);
            
            BusTime += t;   // 셔틀 간격만큼 시각 증가
        }
    }
    
    let hour = Math.floor(BusTime/60);
    let minute = BusTime % 60;
    
    hour < 10 ? hour = "0" + String(hour) : String(hour)
    minute < 10 ? minute = "0" + String(minute) : String(minute)
    
    return (hour+":"+minute)
}