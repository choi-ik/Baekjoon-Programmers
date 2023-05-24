import sys

input = sys.stdin.readline

x = list(map(int, (bin(int(input()))[2:])))
cnt = 0

for num in x:
    if num == 1:
        cnt += 1

print(cnt)
