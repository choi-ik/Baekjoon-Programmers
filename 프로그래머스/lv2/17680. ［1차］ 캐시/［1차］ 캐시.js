function solution(cacheSize, cities) {
    let answer = 0;
    // 캐시 크기 만큼 배열 생성
    let cacheArr = [];

    
    cities.forEach((city, i) => {
        // 캐시 크기가 0일 경우
        if (cacheSize === 0) {
            answer += 5;
        } else {  // 캐시 크기가 0이 아닐 경우 
            
            // 캐시 배열 안에 찾는 도시가 존재 한다면 cache hit 이므로 +1, 가장 오래된 맨 앞부분을 뒤로 보냄.
            if (cacheArr.includes(city.toUpperCase())) {
                let idx = cacheArr.indexOf(city.toUpperCase()) + 1;
                let temp = cacheArr.splice(idx);

                cacheArr.pop();
                cacheArr.push(...temp);
                cacheArr.push(city.toUpperCase());
                answer += 1;

            }
            // 캐시 배열 안에 찾는 도시가 존재 하지 않을때
            else {
                if (cacheArr.length < cacheSize){
                    cacheArr.push(city.toUpperCase());
                    answer += 5;
                }
                else if (cacheArr.length === cacheSize) {
                    cacheArr.shift();
                    cacheArr.push(city.toUpperCase());
                    answer += 5;
                }
            }
        } 
    });
    
    return answer;
}