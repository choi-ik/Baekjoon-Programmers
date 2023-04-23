function solution(numbers) {
    let answer = new Set();
    let nums = numbers.split("");
    let visited = new Array(nums.length).fill(false);
    let arr = [];
    
    function isPrime(num) {
        if(num < 2) return false;
        if(num >= 2) {
            for(let i=2; i<=Math.sqrt(num); i++) {
                if(num % i === 0) return false;
            }
        }
        return true;
    }; 

    function DFS(n, str, max) {
        if(n === max) {
            arr.push(Number(str));
        }
        else{
            for(let i=0; i<nums.length; i++) {
                if(visited[i] === false) {
                    let hap = str + nums[i];
                    visited[i] = true;
                    DFS(n+1, hap, max);
                    visited[i] = false;
                    
                }    
            }  
        }
    };
    
    for(let i=1; i<=nums.length; i++) {
        DFS(0, "", i);
    };
    
    for(let i=0; i<arr.length; i++) {
        if(isPrime(parseInt(arr[i]))) answer.add(arr[i]);
    };
    
    return answer.size;
}