function solution(sizes) {
    let answer = 0;
    let max = 0;
    let min = 0;
    
    sizes.map((item, index) => {
        let temp = 0;
        
        if(item[0] < item[1]) {
            temp = item[0];
            item[0] = item[1];
            item[1] = temp;
        }
        max < item[0] ? max = item[0] : false
        min < item[1] ? min = item[1] : false
    });
    
    return answer = max * min;
}