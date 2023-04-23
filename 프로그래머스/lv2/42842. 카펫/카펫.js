function solution(brown, yellow) {
    var answer = [];
    let capetSize = brown + yellow;

    for(let i = capetSize; i > 0; i--) {
        if(Math.floor(capetSize % i) === 0) {
            let yellowSize = Math.floor(capetSize / i);
            if(i >= yellowSize) {
                if((i - 2) * (yellowSize - 2) == yellow) {
                    answer = [i, yellowSize];
                    break;
                }
            }
        }
    }
    
    return answer;
}