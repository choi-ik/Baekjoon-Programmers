function solution(orders, course) {
    let answer = [];
    let cookObj = {};
    let cookArr = Array.from({length: Math.max(...course) + 1}, () => []);
    
    // 코스요리 조합 함수
    function getCombinations(arr, len, menu) {
        if (menu.length === len) {
            // 키 : 값[길이, 개수]
            
            menu = menu.split('')
            menu.sort();
            menu = menu.join('');
            if (!cookObj[menu]) cookObj[menu] = [len, 1];
            else cookObj[menu][1]++;
        };
        
        for (let i = 0; i < arr.length; i ++) {
            let courseMenu = menu + arr[i];
            let rest = arr.slice(i + 1);
            
            getCombinations(rest, len, courseMenu);
        };
    };
    
    // 메뉴와 메뉴 조합 개수에 맞춰 조합 함수 호출
    orders.forEach((e) => {
        let cook = e.split('');
        
        course.forEach((num) => {
            if (num <= e.length) getCombinations(cook, num, "")
        });
    });
    
    // 코스요리 길이에 맞는 인덱스에 코스요리 넣기
    for (let name in cookObj) {
        if (cookObj[name][1] >= 2) {
            cookArr[cookObj[name][0]].push([name, cookObj[name][1]]);
        };
    };
    
    // 코스요리를 많이 주문된 순으로 정렬한 뒤 가장 많이 주문된 코스요리들 answer에 푸시
    cookArr.forEach((e) => {
        if (e.length !== 0) {
            e.sort((a, b) => b[1] - a[1]);
            
            let max = e[0][1];
            for (let i = 0; i < e.length; i ++) {
                if (max <= e[i][1]) answer.push(e[i][0]);
                else break;
            }
        }
    });

    return answer.sort();
}