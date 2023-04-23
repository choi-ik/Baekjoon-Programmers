function solution(n) {
    var answer = [];
    var arr = n.toString().split('').reverse();
    answer = arr.map(arr => arr*1);
    return answer;
    
}