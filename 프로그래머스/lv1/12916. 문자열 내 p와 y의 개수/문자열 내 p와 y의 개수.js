function solution(s){
    var answer = true;
    var arr = s.match(/[py]/gi);
    var p = 0;
    var y = 0;
    if(arr==null) return answer;
    for(var i=0; i<arr.length; i++){
        if(arr[i]=='p' || arr[i]=='P'){
            p++;
        }else{
          y++;  
        } 
    }
    return answer = p==y ? true : false;
}