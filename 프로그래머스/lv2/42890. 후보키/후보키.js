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
                
        if (set.size === relation.length) key.push(e);
    });
    
    // 최소성 체크
    function checkMinimality(combinations){
        let results=[]; // 최소성을 만족하는 조합들로만 이루어진 results 배열

        while(combinations.length){
            results.push(combinations[0]);
            // 유일성을 만족하는 조합중 첫번째 원소를 최소성을 만족하는 원소로 넣는다. 
            combinations=combinations.reduce((acc,cur)=>{
                let notMinimal=combinations[0].every(combination=>cur.includes(combination));
                // 현재 조회중인 cur배열 안에 combinations[0]의 모든 원소가 포함된다면 최소성을 만족하지 않는것임
                if(!notMinimal) acc.push(cur); 
                // 최소성을 만족하는 cur 조합을 acc에 추가해줌
                return acc;
            },[])
            // combinations들은 combinations[0]과 비교해서 최소성을 만족하는애들로 갱신됨
        }

        return results;
    
    }
    
    
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
    
    return checkMinimality(key).length;
};