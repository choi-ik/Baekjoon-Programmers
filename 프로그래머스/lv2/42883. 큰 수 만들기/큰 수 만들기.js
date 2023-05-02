function solution(number, k) {
    let answer = "";
    let idx = 0;
    let i = 0;
    let max = 0;
    let kCopy = number.length - k;
 
    while(kCopy > 0) { // 만들어야 할 가장 큰 수의 길이가 채워 질 때가지
        if(idx <= number.length - kCopy) { // k를 뺀 길이 만큼의 숫자를 만들기 위해 최대한 탐색할 수 있는 범위
            if(max < Number(number[idx]) && number[idx] === "9") { // 탐색한 숫자가 max보다 크고 그 숫자가 9라면 바로 answer에 더해준 뒤, 남은 길이 체크
                answer += String(number[idx]);
                max = 0;
                i = idx;
                idx++;
                kCopy--;
            } else if(max < Number(number[idx])) { // 탐색한 숫자가 9가 아니고 max보다 큰 것에 대해서만 해당 할 경우
                max = Number(number[idx]);
                i = idx;
                idx++;
            } else { // 9도 아니고, max보다 작을 경우
                idx++;
            }
            /* idx가 탐색할 수 있는 범위까지 도달항 경우, answer에 max를 더해준 뒤, max 초기화 밑 가장 큰 수의 다음 수 부터 다시 탐색하기 위해 가장 큰 수의 index+1을 idx에 대입, 만들어야 할 가장 큰 숫자중 한자리 채웠으니 kCopy-- */
        } else {
            answer += String(max);
            max = 0;
            idx = i+1;
            kCopy--;
        }
    };
    
    return answer;
}