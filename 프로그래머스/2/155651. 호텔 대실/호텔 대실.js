function solution(book_time) {
    let answer = [];
    
    book_time = book_time.map((times) => {
        return times = times.map((time, idx) => {
            let [hour, minute] = time.split(':').map(Number);
            let t = 0;
            
            if (idx === 1) t = hour * 60 + minute + 10;
            else t = hour * 60 + minute;
            
            return t;
        })
    })
      
    book_time.sort((a, b) => a[0] - b[0]);
    
    for (let i = 0; i < book_time.length; i ++) {
        let isCheck = false;
        
        if (!answer.length) {
            answer.push(book_time[i]);
            continue;
        }
        
        for (let j = 0; j < answer.length; j ++) {
            if (answer[j][1] <= book_time[i][0]) {
                answer[j] = book_time[i];
                isCheck = true;
                break;
            }
        }
        
        if (!isCheck) answer.push(book_time[i]);
    }
 
    return answer.length;
}