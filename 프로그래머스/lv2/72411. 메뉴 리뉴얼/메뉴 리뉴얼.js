function solution(orders, course) {
    let answer = [];
    let obj = {};
    
    // 코스요리 갯수를 딕셔너리의 키로 생성
    for (let i of course) {
        if (i in obj === false) obj[i] = {};
    };
    
    // 손님이 주문한 단품메뉴들을 코스요리로 만들어 딕셔너리에 저장
    for (let str of orders) {
        str = str.split("");
        str.sort();
        let menu = [];

        // 단품 메뉴 2개 이상으로 만들 수 있는 코스요리 경우의 수 구함 
        for (let i = 2; i <= str.length; i ++) {
            menu.push(...getComb(str, i));
        };
        
        menu.forEach((s) => {
            s = s.join("");
            // 문자열 길이(키)가 딕셔너리에 존재하고
            if (s.length in obj) {
                // 문자열이 키에 존재한다면
                if (s in obj[s.length]) obj[s.length][s] += 1;
                // 존재하지 않는다면 생성해주고 1 저장
                else obj[s.length][s] = 1;
            };
        });
    };
    
    course.forEach((e) => {
        let cook = Object.entries(obj[e]).sort((a, b) => b[1] - a[1]);
        
        let max = 0 // 가장 많이 주문된 코스요리의 주문 횟수
        for (let i = 0; i < cook.length; i ++) {
            // 메뉴 주문 횟수가 2회 이상인 경우에만 코스요리를 만들 수 있음
            if (cook[i][1] > 1) {
                // 내림차순 정렬된 상태이므로 맨 앞 요리가 가장 많이 주문된 요리
                if (i === 0) {
                    max = cook[i][1];
                    answer.push(cook[i][0]);
                }
                // 맨앞 요리와 같은 횟수로 주문된 요리가 있다면 정답 배열에 담기
                else {
                    if (cook[i][1] === max) answer.push(cook[i][0]);
                    else if (cook[i][1] < max) break;
                }
            };            
        };
    });
    
    console.log(answer.sort());
    
    // 조합 함수
    function getComb(arr, num) {
        const result = [];
        
        if (num === 1) return arr.map(e => [e]);
        
        arr.forEach((fix, idx, origin) => {
            // 해당하는 fix를 제외한 나머지 뒤 문자들
            const rest = origin.slice(idx + 1);
            // 나머지에 대해 조합 구함
            const comb = getComb(rest, num - 1);
            // 돌아온 조합에 뗴 놓은(fixed) 값 붙이기
            const str = comb.map(e => [fix, ... e]);
            
            result.push(...str);
        });
        
        return result;
    };
    
    return answer;
}