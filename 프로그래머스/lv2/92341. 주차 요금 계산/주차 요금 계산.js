function solution(fees, records) {
    let answer = {};
    let car = {};
    
    records.forEach((e) => {
        let [time, num, type] = e.split(" ");
        let [hour, minute] = time.split(":");
        
        // 시간을 분으로
        time = ((+hour) * 60) + (+minute);
        
        // 처음 조회되는 차량
        if (!car[num]) car[num] = {time: 0, num};
        
        car[num].type = type;
        
        if (type === "OUT") {
            car[num].time += time - car[num].lastTime;
            return;
        }
        
        car[num].lastTime = time;
    });

    return Object.values(car)
        .sort((a, b) => a.num - b.num)
        .map(e => {
            
            // 차량이 마지막까지 나가지 않았을 때
            if (e.type === "IN") {
                e.time += 1439 - e.lastTime;
            }    
            console.log(e, "객체")
            // 누적 시간이 기본 시간을 넘기지 않았을 때
            if (fees[0] > e.time) return fees[1];
        
            return fees[1] + Math.ceil((e.time - fees[0]) / fees[2]) * fees[3];
        });
}