import sys

input = sys.stdin.readline

N, M = map(int, input().split())

record = []  # 기차의 상태 기록
train = [0] * N  # 기차 갯수 만큼 기차마다 20좌석 생성

# 조건에 부합하는 기차의 자리 상태 만들기
for _ in range(M):
    temp = list(map(int, input().split()))

    # 1번 명령 (탑승)
    if temp[0] == 1:
        train[temp[1] - 1] = train[temp[1] - 1] | (1 << temp[2] - 1)

    # 2번 명령 (하차)
    elif temp[0] == 2:
        train[temp[1] - 1] = train[temp[1] - 1] & ~(1 << temp[2] - 1)

    # 3번 명령 (한 칸씩 뒤로)
    elif temp[0] == 3:
        train[temp[1] - 1] = (train[temp[1] - 1] << 1) & ((1 << 20) - 1)

    # 4번 명령 (한 칸씩 앞으로)
    elif temp[0] == 4:
        train[temp[1] - 1] = train[temp[1] - 1] >> 1


print(len(set(train)))