function solution(X, Y) {
    var answer = '';
    var objX = {
        0: [null, null],
        1: [null, null],
        2: [null, null],
        3: [null, null],
        4: [null, null],
        5: [null, null],
        6: [null, null],
        7: [null, null],
        8: [null, null],
        9: [null, null],
    }
    var x = [...X];
    var y = [...Y];
    
    for(value in objX){
        objX[value][0] = x.filter(n => n == value).length;
        objX[value][1] = y.filter(n => n == value).length;
    }
    
    for(value in objX){
        if(objX[value][0] > 0 && objX[value][1] > 0){
            if(objX[value][0] - objX[value][1] >= 0) answer += value.repeat(objX[value][1]);
            if(objX[value][0] - objX[value][1] < 0) answer += value.repeat(objX[value][0]);
        }
    }
    if(answer === '') return "-1";
    if(Number(answer) === 0) return "0";
    return answer.split("").sort((a, b) => b - a).join("");
}