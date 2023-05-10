def solution(cap, n, deliveries, pickups):
    answer = 0
    deliveries = deliveries[::-1] # 배달 배열 역순 정렬.
    pickups = pickups[::-1] # 픽업 배열 역순 정렬.
    
    giveBox = 0
    receiveBox = 0
    
    for i in range(n): # 역순으로 정렬된 배열 순회.
        giveBox += deliveries[i] 
        receiveBox += pickups[i]
        # giveBox와 receiveBox가 음수라면 한번에 실어나를 수 있는 양보다 적은 것이므로 오가는 길에 추가로 배달 픽업 가능.
        # giveBox와 receiveBox가 양수라면 실어나를 수 있는 양보다 많은 것이므로 다시 들려야함.
        while giveBox > 0 or receiveBox > 0: 
            giveBox -= cap
            receiveBox -= cap
            answer += (n - i) * 2
            
    return answer