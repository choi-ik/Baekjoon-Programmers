function solution(id_list, report, k) {
    let answer = Array.from({length: id_list.length}, () => 0);
    let reportArr = Array.from({length: id_list.length}, () => []);
    report = new Set(report);
    
    report.forEach((e) => {
        let temp = e.split(" ");
        let idx = id_list.indexOf(temp[1]);

        if (reportArr[idx].length === 0) reportArr[idx] = [1, [temp[0]]];
        else {
            reportArr[idx][0] += 1;
            reportArr[idx][1].push(temp[0])
        }
    });
    
    reportArr.forEach((e) => {
        if (e[0] >= k) {
            e[1].forEach((k) => {
                let idx = id_list.indexOf(k);
                answer[idx] += 1;
            })
        }
    });
    
    return answer;
}