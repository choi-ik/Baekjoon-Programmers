def solution(n):
    global answer
    answer = 0
    
    # 체스를 놓을 수 있는지 확인
    def check(board, row):
        for i in range(1, row):
            # 같은 열에 존재할 경우
            if board[i] == board[row]:
                return False
            # 같은 대각선 라인에 존재할 경우
            if abs(board[i] - board[row]) == abs(i - row):
                return False
            
        return True
    
    
    # 체스 놓기
    def dfs(board, row):
        global answer
        
        if row == n:
            answer += 1
            return
        
        for i in range(1, n + 1):
            board[row + 1] = i
            
            if check(board, row + 1) == True:
                dfs(board, row + 1)
    
    
    # 첫번째 체스판의 행의 각기 다른 열에 체스를 놓아 경우의 수 구하기
    for i in range(1, n + 1):
        board = [0] * (n + 1) 
        board[1] = i
        dfs(board, 1);
        
    return answer