import sys
input = sys.stdin.readline
from collections import deque

# 경사가 최대한 없어야하고, -> 이 경우 창영이 따릉이가 지날 수 있는 경사의 최댓값
# 이분탐색 + 그래프
n = int(input())
graph = [list(map(int,input().split())) for _ in range(n)]
dx = [1,-1,0,0]
dy = [0,0,1,-1]

# 기본적인 bfs함수 구현
def bfs(slope):
    visited =[[0] *n for _ in range(n)]
    q = deque()
    q.append((0,0))
    visited[0][0] = 1
    while q:
        x,y = q.popleft()
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            # 여기서 현재 좌표의 경사와 다음 비교하고 있는 좌표의 경사 값 차이의 절대값이 slope (기준점) 보다 작거나 같으면 ok. 
            # slope보다 작으면 다 이동 가능하니까.
            if 0<= nx < n and 0<= ny <n and visited[nx][ny] == 0 and abs(graph[nx][ny]-graph[x][y]) <= slope:
                # 만약에 n,n에 도착할 수 있을 경우 return 1을 해준다.
                if nx == n-1 and ny == n-1:
                    return 1
                visited[nx][ny] = 1
                q.append((nx,ny))
                
start = 0
# 10000000000 로 해도되고, graph에서 가장 큰 값과 작은값의 차이만큼 하면 메모리를 좀 덜 쓴다.
end =  max(map(max,graph)) - min(map(min,graph))
answer = 0 
while start<=end:
    mid = (start+end) // 2
    # 만약에 bfs가 1이면 -> 도착했으면
    if bfs(mid) == 1:
        # 일단 answer 에 mid, 즉 slope가 될 값을 넣어두고
        answer = mid
        # 더작을 수 있는지? 한번 확인해보고
        end = mid - 1
        # 만약에 도착못했으면 기준점이 너무 작은거니까 mid값을 키워주기 위해 mid = start+1을 해준다.
    else:
        start = mid + 1

print(answer)
