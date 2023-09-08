function solution(relation) {
    let answer = 0;
    let num = [];
    let data = [];
    let key = [];
    
    // relation의 인덱스 배열생성
    for (let i = 0; i < relation[0].length; i ++) {
        num.push(i);
    };
    
    // relation의 인덱스로 조합 생성
    for (let i = 1; i <= relation[0].length; i ++) {
        data.push(...getCombinations(num, i));
    };
    
    // 생성된 조합으로 유일성 체크
    data.forEach((e) => {
        let set = new Set();
        
        for (let i = 0; i < relation.length; i ++) {
            let temp = '';
            
            e.forEach(k => {
                temp += relation[i][k];
            });
            
            set.add(temp);
        };
        
        // set 객체의 사이즈가 튜플의 개수와 같다면 유일성 보장
        if (set.size === relation.length) key.push(e);
    });
    
    // 유일성을 만족하는 속성들 길이 오름차순으로 정렬
    key.sort((a, b) => a.length - b.length);
    // 정답 출력
    return checkMinimality(key).length;
    
    // 최소성 체크
    function checkMinimality(arr){
        let results = []; // 최소성을 만족하는 조합들로만 이루어진 results 배열
        let i  = 0;
        
        while(i < arr.length){
            // 가장 작은 길이의 유일성 만족하는 속성들 push
            results.push(arr[0]);
            let arrCopy = [];
            let temp = arr[0];
            
            for (let idx = 0; idx < arr.length; idx ++) {
                let check = false;
                let cnt = 0;
                
                // 현재 후보키가 다른 후보키에 모두 포함이 되어 최소성을 만족하지 못할 때
                temp.map(e => {
                    if (arr[idx].includes(e)) cnt ++
                });
                
                if (cnt !== temp.length) arrCopy.push(arr[idx]);
            }
            
            arr = arrCopy;
        };
        
        i++;
        return results;
    };
    
    
    // 조합 생성 함수
    function getCombinations(arr, selectNumber) {
        const results = [];
        if (selectNumber === 1) return arr.map((el) => [el]); 

        arr.forEach((fixed, index, origin) => {
          const rest = origin.slice(index + 1); 
          const combinations = getCombinations(rest, selectNumber - 1);
          const attached = combinations.map((el) => [fixed, ...el]); 

          results.push(...attached); 

        });

        return results; // 결과 담긴 results return
    };
};