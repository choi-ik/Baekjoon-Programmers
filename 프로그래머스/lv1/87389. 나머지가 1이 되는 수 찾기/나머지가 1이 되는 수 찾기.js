function solution(n) {
    var i = 0;
    for(i=0; i<n; i++){
        if(n % i == 1) return i;
    }
    
    return i;
}