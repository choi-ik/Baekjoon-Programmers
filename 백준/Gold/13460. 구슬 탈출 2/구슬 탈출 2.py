from collections import deque
import sys

N, M = map(int, input().split())

graph = []
R = [0, 0]
B = [0, 0]
O = [0, 0]
fail = False

for i in range(N):
    graph.append(list(input()))
    for j in range(M):
        if graph[i][j] == "R":
            R = [i, j]
        elif graph[i][j] == "B":
            B = [i, j]
        elif graph[i][j] == "O":
            O = [i, j]

q = deque()
# R, B의 좌표
q.append((R[0], R[1], B[0], B[1], 0))

# 상 - 하 - 좌 - 우
dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

visited = []
visited.append((R[0], R[1], B[0], B[1]))

while len(q) > 0:
    rx, ry, bx, by, cnt = q.popleft()
    
    if graph[rx][ry] == "O":
        print(cnt)
        fail = True
        break

    if cnt >= 10:
        continue

    # R, B 움직이기
    for i in range(4):
        r_move = 0
        b_move = 0

        # R 움직이기
        nRx = rx + dx[i]
        nRy = ry + dy[i]

        while 1:
            if graph[nRx][nRy] == "#":
                nRx -= dx[i]
                nRy -= dy[i]
                break
            elif graph[nRx][nRy] == "O":
                break

            nRx += dx[i]
            nRy += dy[i]
            r_move += 1

        # B 움직이기
        nBx = bx + dx[i]
        nBy = by + dy[i]

        while 1:
            if graph[nBx][nBy] == "#":
                nBx -= dx[i]
                nBy -= dy[i]
                break
            elif graph[nBx][nBy] == "O":
                break

            nBx += dx[i]
            nBy += dy[i]
            b_move += 1

        # B 빠지면 안됨
        if graph[nBx][nBy] == "O":
            continue

        # R, B가 같을 경우 / 0일 때와 아닐 때
        if nRx == nBx and nRy == nBy:
            # R 공이 B 공보다 이동한 거리가 길 때
            if r_move > b_move:
                nRx -= dx[i]
                nRy -= dy[i]
            else:
                nBx -= dx[i]
                nBy -= dy[i]
                
        if not (nRx, nRy, nBx, nBy) in visited:
            visited.append((nRx, nRy, nBx, nBy))
            q.append((nRx, nRy, nBx, nBy, cnt+1))

if fail == False:
    print(-1)

