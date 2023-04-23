function solution(n, m) {
    var answer = [];
    
    
    var gcn = (a,b) => {
        if(b == 0){
            return a;
        }
        return gcn(b, a % b);
    }
    var lcm = (a,b) => (a*b) / gcn(a,b);
        return [gcn(n,m), lcm(n,m)];

        
}