function solution(routes) {
    let answer = 1;
    routes.sort((a, b) => b[0] - a[0]); // 가장 늦게 진입한 차량 순서대로 정렬
    let enter = [routes[0][0], routes[0][1]]; // 처음에 들어온 차량이 진출한 시점에 카메라 설치.
    
    for(let i=1; i<routes.length; i++) {
        let camera = false;
        for(let k=0; k<enter.length; k++) {
            if(routes[i][0] <= enter[k] && routes[i][1] >= enter[k]) {
                camera = true;
                break;
            };
            if(k === enter.length-1 && camera === false) {
                enter.push(routes[i][0]);
                enter.push(routes[i][1]);
                answer++;
            };
        };
    };
    return answer;
};