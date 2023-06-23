/*
    숫자 카드 더미 총 100장 -> 1~100 숫자
    
    1. 상자 그룹을 만들 배열 생성
    2. 최상단에 무한 반복 루프 설정
    3. cards 방문 배열 설정
    4. cards 순회하며 방문한 카드는 방문 처리, 방문이 가능 할 때마다 상자그룹 +1
    5. 상자그룹 개수끼리 곱해줌.
*/

function solution(cards) {
    let answer = 1;
    let idx = 0;    // 상자그룹 인덱스
    let i = 0;      // 카드 인덱스
    let box = [0];   // 상자 그룹 배열
    let v = Array.from({length: cards.length}, () => true);     // cards 방문 배열

    while (1) {
        if (!v.includes(true)) break;
        
        while(true) {
            if (v[i]) {
                v[i] = false;
                i = cards[i] - 1;
                box[idx] += 1;
            } else {
                i = v.indexOf(true);
                break;
            }
        };

        idx ++;
        box.push(0);
    };
    
    box.sort((a, b) => b - a);
    
    if (box[1] === 0) return 0;
    return box[0] * box[1];
}