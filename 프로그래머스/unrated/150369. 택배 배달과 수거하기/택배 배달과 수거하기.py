def solution(cap, n, deliveries, pickups):
    answer = 0
    deliveries = deliveries[::-1] # 배달 배열 역순 정렬
    pickups = pickups[::-1] # 픽업 배열 역순 정렬
    
    giveBox = 0
    receiveBox = 0
    
    for i in range(n):
        giveBox += deliveries[i]
        receiveBox += pickups[i]
        while giveBox > 0 or receiveBox > 0:
            giveBox -= cap
            receiveBox -= cap
            answer += (n - i) * 2
    return answer