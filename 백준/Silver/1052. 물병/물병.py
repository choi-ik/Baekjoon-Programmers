import sys

input = sys.stdin.readline

N, K = map(int, input().split())

binary = list(map(int, bin(N)[2:]))
cnt = 0
temp = 0
answer = 0
for i in range(len(binary)):
    if binary[i] == 1:
        cnt += 1

# 1의 개수가 K와 같을 때
if cnt <= K:
    print(0)

# 1의 개수가 K보다 많을 때
elif cnt > K:
    for i in range(len(binary)):
        if binary[i] == 1:
            temp += 1
            if temp == K:
                answer = 2 ** (len(binary) - i - 1)
                for j in range(i+1, len(binary)):
                    if binary[j] == 1:
                        answer -= 2 ** (len(binary) - j - 1)
                if answer > 0:
                    break
    print(answer)