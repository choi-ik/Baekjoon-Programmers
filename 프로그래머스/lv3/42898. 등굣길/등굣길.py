def solution(m, n, puddles):
    dp = [[-1] * m for _ in range(n)]

    for i in range(len(puddles)):
        dp[puddles[i][1]-1][puddles[i][0]-1] = 0
    print(dp)
    check = False
    for i in range(0, n):
        if dp[i][0] == 0: check = True
        if check == True: dp[i][0] = 0
        else: dp[i][0] = 1
        
    check = False
    for i in range(0, m):
        if dp[0][i] == 0: check = True
        if check == True : dp[0][i] = 0
        else: dp[0][i] = 1
    print(dp)
    for i in range(1, n):
        for j in range(1, m):
            if dp[i][j] == 0: continue
            else : dp[i][j] = dp[i][j-1] + dp[i-1][j]
                
                
    print(dp)
    return dp[-1][-1] % 1000000007;

