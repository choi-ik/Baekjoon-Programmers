function solution(numbers) {
    var answer = [];
    for(var i=0; i<numbers.length-1; i++){
        for(var j=i+1; j<numbers.length; j++){
           var a =  numbers[i] + numbers[j];
            answer.push(a);
            answer.sort((a,b)=>{
                return a - b;
            });
        }
    }
    var set = new Set(answer);
    var arr = [...set];
    console.log(arr);
    return arr;
}