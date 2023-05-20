import sys

input = sys.stdin.readline

n, e = map(int, input().split())
graph = [[] for _ in range(n+1)]
v1, v2 = 0, 0

INF = 100000000
distance = [INF] * (n+1)
visit = [False] * (n+1)

# 각 노드 연결
for _ in range(e+1):
    temp = list(map(int, input().split()))
    if len(temp) >= 3:
        graph[temp[0]].append((temp[1], temp[2]))
        graph[temp[1]].append((temp[0], temp[2]))
    else:
        v1, v2 = temp[0], temp[1]

# 방문하지 않은 노드 중, 가장 최단 거리가 짧은 노드의 번호를 반환
def get_short_node():
    min_value = INF
    index = 0 # 최단거리가 가장 짧은 노드
    for i in range(1, n+1):
        if not visit[i] and distance[i] < min_value:
            min_value = distance[i]
            index = i

    return index

# 다익스트라 알고리즘
def dijkstra(start, end):
    # 간선이 하나라도 존재하지 않는다면 0 리턴
    if e == 0:
        return 0

    # 노드가 그래프에 존재하지 않을때
    if not graph[start] or not graph[end]:
        return INF

    # 시작노드에 대해 거리와 방문 여부 초기화
    distance[start] = 0
    visit[start] = True

    # 시작노드와 v1 또는 v2가 같을경우
    if start == end:
        return distance[end]

    # 시작 노드와 연결된 노드에 거리 입력
    for node in graph[start]:
        distance[node[0]] = node[1]

    # 시작 노드를 제외한 전체 n-1개의 노드에 대해 반복
    for _ in range(n-1):
        # 현재 최단 거리가 가장 짧은 노드를 꺼내고, 방문 처리
        now = get_short_node()
        visit[now] = True

        # v1 또는 v2를 노드에서 꺼낼 경우
        if end == now:
            return distance[end]

        # 현재 노드와 연결된 다른 노드를 확인
        for next in graph[now]:
            cost = distance[now] + next[1]

            # 현재 노드를 거쳐서 다른 노드로 이동하는 거리가 더 짧은 경우
            if cost < distance[next[0]]:
                distance[next[0]] = cost

a1, b1, c1 = 0, 0, 0
a2, b2, c2 = 0, 0, 0

for i in range(3):
    distance = [INF] * (n + 1)
    visit = [False] * (n + 1)
    if i == 0:
        a1 = dijkstra(1, v1)
    elif i == 1:
        b1 = dijkstra(v1, v2)
    else:
        c1 = dijkstra(v2, n)

for i in range(3):
    distance = [INF] * (n + 1)
    visit = [False] * (n + 1)
    if i == 0:
        a2 = dijkstra(1, v2)
    elif i == 1:
        b2 = dijkstra(v2, v1)
    else:
        c2 = dijkstra(v1, n)
        
path1 = a1 + b1 + c1
path2 = a2 + b2 + c2

if (path1 >= INF and path2 >= INF) or path1 + path2 == 0:
    print(-1)
else:
    print(min(path1, path2))