"""
    1. 누적합을 구한 배열 생성
    2. 탐색을 위해 왼쪽포인터 0, 오른쪽포인터 1로 설정
    3. 오른쪽포인터가 가리키는 누적합 - 왼쪽포인터가 가리키는 누적합 = 합
    4. 왼쪽포인터가 배열의 크기를 넘어가지 않을때까지 반복
    5. 사이의 합이 S를 넘기지 않았을때, 오른쪽 포인터가 배열의 크기를 넘어가지 않으면 오른쪽 포인터 한칸 증가
    6. 오른쪽 포인터가 배열의 크기를 넘기면 왼쪽 포인터를 한칸 증가
    7. 사이의 합이 S를 넘어간다면 result에 정보 저장 후 왼쪽포인터 한칸 증가
"""

import sys

input = sys.stdin.readline

N, S = map(int, input().split())

arr = list(map(int, input().split()))
num_arr = [0]

for i in range(N):
    num_arr.append(num_arr[i] + arr[i])

result = int(1e9)
l = 0
r = 1

while l < N:
    if num_arr[r] - num_arr[l] < S:
        if r < N:
            r += 1
        else:
            l += 1
    else:
        result = min(result, r - l)
        l += 1

if result == int(1e9):
    print(0)
else:
    print(result)