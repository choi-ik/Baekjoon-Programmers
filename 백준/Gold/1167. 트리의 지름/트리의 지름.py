import sys
from collections import deque

input = sys.stdin.readline

n = int(input())
tree = [[] for _ in range(n+1)]

# 각 노드에 연결된 노드와 간선을 tree의 각각의 노드 번호 인덱스 삽입
for _ in range(n):
    arr = list(map(int, input().split()))
    for i in range(1, len(arr) - 2, 2):
        tree[arr[0]].append([arr[i], arr[i + 1]])

def BFS(start):
    queue = deque()
    queue.append(start)
    # 방문 배열
    visit = [-1] * (n + 1)
    visit[start[0]] = 0
    Max = [0, 0]

    while len(queue):
        node, cnt = queue.popleft()

        # i는 노드 j는 가중치
        for i, j in tree[node]:
            if visit[i] == -1:
                visit[i] = visit[node] + j
                queue.append([i, cnt+j])
                if Max[1] < visit[i]:
                    Max = [i, visit[i]]

    return Max

node, distance = BFS([1, 0])
node, distance = BFS([node, 0])


print(distance)
