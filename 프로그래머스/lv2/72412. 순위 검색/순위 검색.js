function solution(info, query) {
    let answer = [];
    let obj = {};
    
    // 조합 만드는 함수 (info에 들어있는 값에 대해 "-"가 들어갈 수 있는 모든 조합을 구해주고 값으로 점수를 넣음)
    function combination(infos, score, map, start){
        let key = infos.join("");   // 키 값으로 쓸거 합쳐주기
         
        if (map[key]) {   // 키가 이미 있으면 점수를 push
            map[key].push(score);
        } else {  // 키가 없으면 생성
            map[key] = [score];
        }
        
        // "-"가 들어갈 수 있는 모든 조합 구하기
        for (let i = start; i < infos.length; i ++){
            let combiArr = [...infos];
            combiArr[i] = '-';
            
            combination(combiArr, score, map, i+1);
        }
    };
    
    // 이분 탐색
    function binarySearch(key, score) {
        let left = 0;
        let right = obj[key].length;
        let mid = 0;
        
        while (left < right) {
            mid = Math.floor((left + right) / 2);
            
            if (obj[key][mid] >= score) {    // 쿼리 점수보다 크면 
                right = mid;
            } else {    // 쿼리 점수보다 작으면
                left = mid + 1
            }
        };
        
        return obj[key].length - left;
    };
    
    // info 값으로 다양한 종류의 조합 생성
    info.forEach((e) => {
        let temp = e.split(" ");
        let score = temp.pop();
        
        combination(temp, score, obj, 0);
    });
    
    // obj 객체의 값 정렬
    for (let key in obj) obj[key].sort((a, b) => a - b);
    
    // 쿼리문에 해당하는 키가 객체에 존재하면 이분탐색 시작
    query.forEach((e) => {
        let q = e.split(" ");
        let score = +q.pop();
        q = [q[0], q[2], q[4], q[6]].join("");

        if (obj[q]) answer.push(binarySearch(q, score));
        // 질문에 대한 키가 존재 하지 않으면 0 push
        else answer.push(0);
    });
    
    return answer;
}