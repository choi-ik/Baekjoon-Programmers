function solution(nums) {
    var answer = 0;
    
    for(var i=0; i<nums.length-2; i++){
        for(var j=i+1; j<nums.length-1; j++){
            for(var k=j+1; k<nums.length; k++){
                if(root(nums[i]+nums[j]+nums[k])) answer++;
            }
        }
    }
    console.log(Math.sqrt(16));
    return answer;
}

function root(n) {
    for(var i=2; i<=Math.sqrt(n); i++){
        if(n%i === 0){
            return false;
        }
    }
    return true;
}