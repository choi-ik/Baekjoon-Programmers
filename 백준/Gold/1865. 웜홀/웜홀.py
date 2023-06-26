import sys

input = sys.stdin.readline
INF = 10 ** 11  # ** float('inf')에서 10 ** 11로 변경 ** 


# 벨만 포드 알고리즘
# True: 음의 사이클 존재, False: 음의 사이클이 존재하지 않음
def bf(start):
    dist[start] = 0

    for i in range(N):
        for cur in range(1, N+1):
            for nextNode, cost in graph[cur]:
                # ** dist[cur] != INF 조건 삭제 **
                if dist[nextNode] > dist[cur] + cost:
                    dist[nextNode] = dist[cur] + cost

                    if i == N-1:  # N번째 수행에서 최단 거리가 갱신 됐다면 음의 사이클이 존재
                        return True

    return False


if __name__ == '__main__':
    TC = int(input())  # 테스트 케이스 개수

    for _ in range(TC):
        N, M, W = map(int, input().split())  # N개의 지점, M개의 도로, W개의 웜홀
        dist = [INF for _ in range(N+1)]
        graph = [[] for _ in range(N+1)]  # 도로와 웜홀의 정보

        # 도로 정보 입력
        for _ in range(M):
            S, E, T = map(int, input().split())
            graph[S].append((E, T))
            graph[E].append((S, T))

        # 웜홀 정보 입력
        for _ in range(W):
            S, E, T = map(int, input().split())
            graph[S].append((E, -T))  # 웜홀의 경우 시간이 줄어드므로 시간을 음수 값으로 설정

        if bf(1):
            print('YES')
        else:
            print('NO')