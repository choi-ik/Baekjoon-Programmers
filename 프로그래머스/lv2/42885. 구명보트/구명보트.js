function solution(people, limit) {
    var answer = 0;
    const sortedPeople = people.sort((a, b) => a - b );
    let lInd = 0;
    let rInd = people.length - 1;
    while ( lInd <= rInd ) {
        
        if ( sortedPeople[lInd] + sortedPeople[rInd] <= limit ) {
            lInd++;
        }
        rInd--;
        answer += 1;
    }
    return answer;
}