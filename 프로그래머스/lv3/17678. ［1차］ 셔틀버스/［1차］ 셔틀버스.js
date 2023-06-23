function solution(n, t, m, timetable) {
    let timeArr = [];
    let busTime = 540;

    timetable.forEach((time) => {
        let currentTIme = time.split(":").map(e => +e);
        let totalTime = currentTIme[0] * 60 + currentTIme[1];
        timeArr.push(totalTime);
    });

    timeArr.sort((a, b) => a - b);      //  대기열 오름차순 정렬
    
    for (let i = 0; i < n; i ++) {
        let ride = timeArr.filter((people) => people <= busTime).length;
        
        // 현재 도착한 버스가 막차일 경우
        if (i === n-1) {
            // 인원이 꽉찼을 경우 마지막 탄 사람 보다 1분 빨리 타야함. || 인원이 꽉차지 않았을 경우에는 버스 도착하는 시간에 맞춰 타면 됨.
            if (ride >= m) busTime = timeArr[m-1] - 1;
        }
        // 현재 도착한 버스가 막차가 아닐 경우 
        else {
            if (ride < m) timeArr.splice(0, ride);
            else timeArr.splice(0, m);

            // 버스 시간을 운행 간격만큼 늘려줌
            busTime += t;
        }
    };

    let hour = Math.floor(busTime / 60);
    let minute = busTime % 60;

    hour < 10 ? hour = "0" + hour : hour;
    minute < 10 ? minute = "0" + minute : minute;

    return hour+":"+minute;
}