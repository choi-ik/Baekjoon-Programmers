function solution(N, stages) {
    var answer = [];
    for(var i=1; i<=N; i++){
        var stage = stages.filter((x) => x >= i); //stages의 원소가 i보다 크거나 같은것 들은 stage에 대입
        var fault = stages.filter((x) => x == i); //stages의 원소가 i랑 같은것 들은 fault에 대입
        answer.push([i, fault.length/stage.length]); //answer에 fault의 길이를 stage의 길이만큼 나누고 2차월 배열로 push
    }
    answer.sort((a,b) => b[1] - a[1]); // sort를 이용해 a,b원소의 두번째 index인 b[1]-a[1]를 비교해 내림차순 정렬
    return answer.map((a) => a[0]); // map함수를 이용해 이차원 배열의 원소중 첫번째 인덱스만 return

}