function solution(n, lost, reserve) {
    var answer = n - lost.length; // n을 도둑맞은 학생수만큼 마이너스

    var Rlost = lost.filter((e) => !reserve.includes(e)); //lost배열과 reserve배열의 요소가 서로 같지 않으면 그 값을 Rlost에 대입 
    var Rreserve = reserve.filter((e) => !lost.includes(e)); //reserve배열과 lost배열의 요소가 서로 같지 않으면 그 값을 Rreserve에 대입
    answer += lost.length - Rlost.length; //중복된 값이 있다면 lost배열의 길이에서 빼줌

    Rlost.sort((a,b) => a-b); // Rlost배열 오름차순 정렬

    Rlost.forEach((e) => {
        if(Rreserve.length == 0){
            return;
        }
        if(Rreserve.includes(e-1)){
            Rreserve = Rreserve.filter((r) => r !== e-1);
            answer++;
        }
        else if(Rreserve.includes(e+1)){
            Rreserve = Rreserve.filter((r) => r !== e+1);
            answer++;
        }
    })

    return answer;
}
