import sys
input = sys.stdin.readline

n, m = map(int, input().split())
truth = list(map(int, input().split()))[1:]

know_truth = 0

# union find 용 부모 리스트. 여기서 0번은 사람으로 이용하지 않고, 진실을 아는 사람으로 친다.
parent = [i for i in range(n + 1)]
# 진실을 아는 사람은 0을 가리킴
for person in truth:
    parent[person] = know_truth

# union find를 하는 이유는 서로 겹치지 않는 그룹(거짓말을 모르는 그룹과 아는 그룹)으로 나누기 위함.
def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])

    return parent[x]

def union(a, b):
    a = find(a)
    b = find(b)

    if a < b:
        parent[b] = a
    else:
        parent[a] = b

parties = []

for _ in range(m):
    party = list(map(int, input().split()))[1:]

    # 파티의 참석한 사람들에 대해 2명씩 union 해본다.
    for i in range(len(party) - 1):
        union(party[i], party[i+1])
    parties.append(party)

answer = 0

for party in parties:
    know = False
    for i in range(len(party)):
        # 진실을 알고 있던 그룹게 속했었을 경우
        if find(party[i]) == know_truth:
            know = True
            break
    if know == False:
        answer += 1

print(answer)