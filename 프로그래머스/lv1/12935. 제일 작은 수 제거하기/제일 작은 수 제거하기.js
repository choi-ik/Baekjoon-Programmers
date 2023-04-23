function solution(arr) {
    var answer = [];
    if(arr.length==1) return[-1];
    var minvalue = Math.min.apply(null, arr);
    arr.splice(arr.indexOf(minvalue),1);
    answer = arr;
    return answer;
}