def solution(n, m, x, y, r, c, k):
    answer = ''
    miro = [[0] * m for _ in range(n)] # 미로 배열
    distance = abs(x-r) + abs(y-c) # 탈출구까지의 최단 거리
    
    # impossible이 되는 경우의 수 두 가지
    if (distance + k) % 2 != 0: return "impossible"
    if k < distance: return "impossible"
    
    # d -> l -> r -> u 순서
    down = max(r - x, 0)
    left = max(y - c, 0)
    right = max(c - y, 0)
    up = max(x - r, 0)
    
    # 최소 거리 도착 후 남은 k 를 2로 나눔
    divide = (k - distance) // 2
    
    for i in range(k):
        if (down or divide) and x < n: # Down
            answer += 'd'
            if down:
                down -= 1
            else:
                divide -= 1 
                up += 1 # 최단거리 - k 를 2로나눈 수만큼 내려갔으니, 내려간 만큼 위쪽으로 돌아가야해서 up ++
            x += 1
        elif (left or divide) and 1 < y:
            answer += 'l'
            if left:
                left -= 1
            else:
                divide -= 1
                right += 1 # 최단거리 - k 를 2로나눈 수만큼 왼쪽으로 갔으니, 왼쪽으로간 만큼 오른쪽으로 돌아가야해서 right ++
            y -= 1
        elif (right or divide) and y < m:
            answer += 'r'
            if right:
                right -= 1
            else:
                divide -= 1
                left += 1 # 최단거리 - k 를 2로나눈 수만큼 오른쪽으로 갔으니, 오른쪽으로간 만큼 왼쪽으로 돌아가야해서 left ++
            y += 1
        elif (up or divide) and x > 1:
            answer += 'u'
            if up:
                up -= 1
            else:
                divide -= 1
                down += 1 # 최단거리 - k 를 2로나눈 수만큼 올라갔으니, 올라간 만큼 아래쪽으로 돌아가야해서 left ++
            x -= 1
                
    return answer 