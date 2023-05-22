"""
    1. i 번재 수까지의 누적합을 계산하는 함수
    2. i 번째 수 업데이트
    3. b ~ c까지 구간합 구하는 함수
    4. arr, tree 배열 값 삽입
    5. a의 값 1 또는 2 인지 확인 후 업데이트 및 구간합 계산
"""
import sys

input = sys.stdin.readline

n, m, k = map(int, input().split())

# 전체 데이터의 개수는 최대 1,000,000
arr = [0] * (n + 1)
tree = [0] * (n + 1)

# i번째 수까지 누적합 구하는 함수
def prefix_num(idx):
    result = 0

    while idx > 0:
        result += tree[idx]
        # 0이 아닌 비트만큼 빼가면서 이동
        idx -= (idx & -idx)

    return result

# i번째 수를 dif 만큼 더하는 함수
def update(idx, dif):
    while idx <= n:
        tree[idx] += dif
        idx += (idx & -idx)

# start부터 end까지 구간합 구하는 함수
def interval_sum(start, end):
    return prefix_num(end) - prefix_num(start - 1)


for i in range(1, n+1):
    x = int(input())
    arr[i] = x
    update(i, x)


for i in range(m + k):
    a, b, c = map(int, input().split())
    # update 하는 경우
    if a == 1:
        update(b, c - arr[b])
        arr[b] = c
    # 구간합 구하는 경우
    else:
        print(interval_sum(b, c))
