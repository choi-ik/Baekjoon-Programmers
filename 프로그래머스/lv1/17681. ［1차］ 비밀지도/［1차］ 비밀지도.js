function solution(n, arr1, arr2) {
    var answer = [];
    for (var i=0; i<n; i++) {
        answer.push(arr1[i] | arr2[i]);
        answer[i] = answer[i].toString(2);
        
        if (answer[i].length == n) {
        answer[i] = answer[i].replace(/1/g, "#");
        answer[i] = answer[i].replace(/0/g, " ");
        } else if(answer[i].length != n) {
            answer[i] = answer[i].padStart(n, "0");
            answer[i] = answer[i].replace(/1/g, "#");
            answer[i] = answer[i].replace(/0/g, " ");                   
        }
        
    }
    
    
    return answer;
}