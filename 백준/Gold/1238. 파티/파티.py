import sys
import copy

input = sys.stdin.readline
INF = int(1e9) # 무한을 의미하는 값으로 10억을 설정

n, m, x = map(int, input().split())
graph = [[] for _ in range(n+1)]    # 각 노드에 연결되어 있는 노드에 대한 정보를 담는 리스트
graph_reverse = [[] for _ in range(n+1)]    # 각 노드에 연결되어 있는 노드에 대한 정보를 담는 리스트
visit = [False] * (n+1)             # 방문한 적이 있는지 체크하는 목적의 리스트
distance = [INF] * (n+1)            # 최단거리 테이블을 모두 무한으로 초기화

# 모든 간선 정보 입력
for _ in range(m):
    temp = list(map(int, input().split()))
    # temp[0]번 노드에서 temp[1]번 노드로 가는 비용이 temp[2]라는 뜻
    graph[temp[0]].append([temp[1], temp[2]])
    graph_reverse[temp[1]].append([temp[0], temp[2]])

# 방문하지 않은 노드중에서, 가장 최단 거리가 짧은 노드의 번호를 반환
def get_smallest_node():
    min_value = INF
    index = 0 # 가장 최단 거리가 짧은 노드(인덱스)
    for i in range(1, n+1):
        if not visit[i] and distance[i] < min_value:
            min_value = distance[i]
            index = i

    return index

# 다익스트라 알고리즘
def dijkstra(start):
    # 시작노드에 대해 초기화
    distance[start] = 0
    visit[start] = True

    # 시작노드의 인접한 노드들에 대해 최단거리 계산
    for i in graph[start]:
        distance[i[0]] = i[1]

    # 시작노드 제외한 전체 n-1개의 노드에 대해 반복
    for _ in range(n-1):
        # 현재 최단 거리가 가장 짧은 노드를 꺼내서, 방문 처리
        now = get_smallest_node()
        visit[now] = True

        # 현재 노드와 연결된 다른 노드를 확인
        for next in graph[now]:
            cost = distance[now] + next[1]
            # 현재 노드를 거쳐서 다른 노드로 이동하는 거리가 더 짧은 경우
            if cost < distance[next[0]]:
                distance[next[0]] = cost

distance_nomal = []
distance_reverse = []
Max = 0
for idx in range(2):
    visit = [False] * (n + 1)  # 방문한 적이 있는지 체크하는 목적의 리스트
    distance = [INF] * (n + 1)  # 최단거리 테이블을 모두 무한으로 초기화
    if idx == 0:
        dijkstra(x)
        distance_nomal = copy.deepcopy(distance)
    else:
        graph = graph_reverse
        dijkstra(x)
        distance_reverse = distance

for i in range(1, n+1):
    if Max < distance_nomal[i] + distance_reverse[i]:
        Max = distance_nomal[i] + distance_reverse[i]

print(Max)