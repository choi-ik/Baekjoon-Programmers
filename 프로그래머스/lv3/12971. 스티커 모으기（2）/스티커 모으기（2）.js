function solution(sticker) {
    // 첫번째 스티커를 뜯은 경우
    let dp1 = Array.from({length: sticker.length}, () => 0);
    // 첫번째 스티커를 뜯지 않은 경우
    let dp2 = Array.from({length: sticker.length}, () => 0);
    
    if (sticker.length === 1) return sticker[0];
    // if (sticker.length === 2) return Math.max()
    
    dp1[0] = sticker[0]; // 첫번째 스티커를 뜯었으니 첫번쨰 스티커 숫자를 넣어주고
    dp1[1] = dp1[0]; // 두번째 스티커는 뜯지 못하니 첫번째 스티커의 값을 넣어준다
    
    // 첫번째 스티커를 뜯은 경우 -> 3번 스티커부터 다시 뜯을 수 있음
    for (let i = 2; i < sticker.length - 1; i ++) {
        dp1[i] = Math.max(sticker[i] + dp1[i - 2], dp1[i - 1]);
    };
    
    
    dp2[1] = sticker[1]; // 두번째 스티커를 뜯었으니 1번 인덱스에 두번째 스티커 숫자 넣어줌
    
    // 두번째 스티커를 뜯은 경우 -> 4번 스티커부터 다시 뜯을수 있음
    for (let i = 2; i < sticker.length; i ++) {
        dp2[i] = Math.max(sticker[i] + dp2[i - 2], dp2[i - 1]);
    }
    
    
    return Math.max(dp1[sticker.length - 2], dp2[sticker.length - 1]);
}