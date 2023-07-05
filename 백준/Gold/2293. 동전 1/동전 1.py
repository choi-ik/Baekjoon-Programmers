from collections import deque
import sys
input = sys.stdin.readline

N, K = map(int, input().split())
coin = [int(input()) for _ in range(N)]

dp = [0 for _ in range(0, K+1)]
dp[0] = 1   # 0이되는 경우의 수는 0으로 1개임

for i in range(0, N):
    for j in range(coin[i], K+1):
        dp[j] = dp[j] + dp[j - coin[i]]

print(dp[K])