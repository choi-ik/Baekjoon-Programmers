/*
    한 번에 K 칸 앞으로 점프 OR (현재까지 온 거리) * 2에 해당하는 위치로 순간 이동
    순간 이동 시 건전지 사용 X, 점프하면 K 만큼의 건전지 사용. 즉, 순간 이동이 효율적
    점프로 이동하는 것 최소화.
    사용해야 하는 건전지 사용량 최솟값 리턴
*/
function solution(n)
{
    let ans = 0;
    let binary = n.toString(2);
    
    for(let i = 0; i < binary.length; i++) {
        if (binary[i] === "1") ans ++;
    };
    
    return ans;
}