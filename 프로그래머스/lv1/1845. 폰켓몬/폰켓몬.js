function solution(nums) {
    var answer = 0;
    const set = new Set([...nums]);
    
    if(set.size >= Math.floor(nums.length/2)) answer = Math.floor(nums.length/2);
    else answer = set.size;
    
    return answer;
}