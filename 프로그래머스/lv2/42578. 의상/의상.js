function solution(clothes) {
    var answer = 1;
    const obj = {}
    
    for(var i=0; i<clothes.length; i++){
        if(clothes[i][1] in obj){
            obj[clothes[i][1]] += 1;
        }else{
            obj[clothes[i][1]] = 2;
        }
    }
    for(var i in obj){
        answer *= obj[i];
    }

    return answer - 1;
}