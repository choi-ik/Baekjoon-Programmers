
def solution(clothes):
    answer = 1
    obj = {}
    
    for i in range(len(clothes)):
        if clothes[i][1] not in obj:
            obj[clothes[i][1]] = 2
        else:
            obj[clothes[i][1]] += 1
    
    for key in obj.keys():
        answer *= obj[key]
    
    return answer - 1