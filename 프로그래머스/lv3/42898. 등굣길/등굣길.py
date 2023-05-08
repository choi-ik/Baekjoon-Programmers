def solution(m, n, puddles):
    dp = [[-1] * m for _ in range(n)] # n * m 크기의 배열 생성
    
    # n * m 크기의 배열에 물웅덩이 삽입
    for i in range(len(puddles)): 
        dp[puddles[i][1]-1][puddles[i][0]-1] = 0

    # [0열에 존재하는 웅덩이 확인]
    # check = false 로 초기화, i번째 열에 물 웅덩이가 있을 시 이전 열 까지는 1, 이후 열은 모두 0으로 초기화 
    check = False
    for i in range(0, n):
        if dp[i][0] == 0: check = True
        if check == True: dp[i][0] = 0
        else: dp[i][0] = 1

    # [0행에 존재하는 웅덩이 확인]
    # check = false로 초기화, i번째 행에 물 웅덩이가 있을시 이전 행 까지는 1, 이후 행은 모두 0으로 초기화
    check = False
    for i in range(0, m):
        if dp[0][i] == 0: check = True
        if check == True : dp[0][i] = 0
        else: dp[0][i] = 1

    # (1,1)번째 배열부터 검사하며 해당 배열의 왼쪽 밑 위쪽 배열의 값 합산
    for i in range(1, n):
        for j in range(1, m):
            if dp[i][j] == 0: continue
            else : dp[i][j] = dp[i][j-1] + dp[i-1][j]
                
    return dp[-1][-1] % 1000000007;

