function solution(numbers, target) {
    let answer = [];
    
    function DFS(n, index) {
        if(index === numbers.length) {
            if(n === target){
                answer.push(n);
            }
            return;
        }
        
            DFS(n + numbers[index], index+1);
            DFS(n + numbers[index] * (-1), index+1);

    }
    DFS(0, 0);
    console.log(answer);
    return answer.length;
}