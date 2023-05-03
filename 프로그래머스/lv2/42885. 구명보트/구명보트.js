function solution(people, limit) {
    var answer = 0;
    const sortedPeople = people.sort((a, b) => a - b); // people 정렬
    let front = 0; // 왼쪽 끝
    let back = people.length - 1; // 오른쪽 끝
    
    while ( front <= back ) {
        /* 양쪽 끝에서부터 서로 더하여 검사하면서 limit 보다 작다면 front를 한 칸 뒤로 당겨주고
            비교할 때마다 back은 계속 한 칸 앞으로 당겨준다 */
        if ( sortedPeople[front] + sortedPeople[back] <= limit ) {
            front++;
        }
        back--;
        answer += 1;
    }
    return answer;
}