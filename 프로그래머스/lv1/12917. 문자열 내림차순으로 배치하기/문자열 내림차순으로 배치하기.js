function solution(s) {
    var answer = '';
    var arr = s.split("");
    for(var i=0; i<arr.length; i++){
        arr[i] = arr[i].charCodeAt();
    }
    arr.sort(function(a,b){
        return b-a;
    });
    for(var i=0; i<arr.length; i++){
        arr[i] =  String.fromCharCode(arr[i]);
    }
    answer = arr.join("");
    return answer;
}