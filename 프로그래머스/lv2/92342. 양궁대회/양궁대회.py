from itertools import product

def solution(n, info):
    answer = [0] * 11
    result = [1] * 11
    maxScore = 0
    
    data = list(product([True, False], repeat = 10))
    for i in range(len(data)):
        num = 0
        Apich = 0
        Rion = 0
        
        for j in range(len(data[i])):
            if data[i][j] == True:
                num += info[j]+1
                result[j] = info[j] + 1
                Rion += 10 - j
            else: 
                result[j] = 0
                if info[j] > 0:
                    Apich += 10 - j
        # if Rion > Apich and num == 5:
        #     print("어피치:", Apich, "라이언:", Rion, "화살쏜 개수:", num)
        if n < num : 
            num = 0
            Rion = 0
            Apich = 0
            result = [0] * 11
            continue
        elif n == num:
            if Rion > Apich:
                if maxScore < Rion - Apich:
                    maxScore = Rion - Apich
                    answer = result[:]
                elif maxScore == Rion - Apich:
                    for idx in range(10, -1, -1):
                        if answer[idx] > result[idx]:
                            break
                        elif answer[idx] < result[idx]:
                            answer = result[:]
        else:
            result[10] = n - num
            if maxScore < Rion - Apich:
                maxScore = Rion - Apich
                answer = result[:]
    print(answer)
    
    if maxScore == 0: return [-1]
    
    return answer