/*
    코스 요리 형태로 조합.
    가장 많이 주문한 단품 메뉴들을 코스로 구성(최소 2가지 이상)
    
    1. 각 메뉴를 조합하여 2자리 이상부터 메뉴의 길이만큼의 조합을 만들어 객체의 키로 설정
    2. 키가 이미 존재한다면 키에 대한 값을 +1
    3. 존재하는 키에 대해 값이 2 이상이면 2번 이상 주문된 요리이므로, 문자열의 길이가 course와 같은지 확인한다
    4. 문자열의 길이가 course와 같다면, answer에 원소를 오름차순 정렬하여 추가해주고, 마지막에 answer를 사전 순으로 오름차순 정렬해준다.
*/

function solution(orders, course) {
    let answer = [];
    let cook = {};
    
    orders.forEach((e, i) => {
        let temp = e.split("");
        temp.sort();
        orders[i] = temp.join("");
    });
    
    // 조합 코드
    function comb(arr, len, menu) {
        if (menu.length === len) {
            if (!cook[menu]) cook[menu] = {name : menu, num : 1};
            else cook[menu].num += 1;
            
            return;
        };
        
        for (let i = 0; i < arr.length; i++) {
            let menuCopy = menu + arr[i];
            let rest = arr.slice(i+1)
            
            comb(rest, len, menuCopy);            
        };
    };
    
    for (let i = 0; i < orders.length; i ++) {
        for (let j = 2; j <= orders.length; j++) {
            comb(orders[i], j, "", 0);
        }
    };
    
    cook = Object.values(cook)
        .sort((a, b) => b.num - a.num);

    course.forEach((nums) => {
        let cnt = 0;
        cook.forEach((menu) => {
            if (menu.name.length === nums && menu.num >= 2) {
                if (menu.num > cnt) { 
                    cnt = menu.num;
                    answer.push(menu.name);
                }
                else if (menu.num === cnt) answer.push(menu.name);
            }
        })
    })
    
    answer.sort();
    
    return answer;
}