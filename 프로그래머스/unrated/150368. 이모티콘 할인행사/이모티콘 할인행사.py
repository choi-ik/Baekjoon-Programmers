import math
def solution(users, emoticons):
    answer = [0, 0]
    discount = [10, 20, 30, 40]
    data = []
    
    # 할인율을 이모티콘 갯수에 맞게 조합하기
    def DFS(arr, idx):
        arrCopy = arr.copy()
        if idx == len(arrCopy):
            data.append(arrCopy)
        else:
            for i in range(len(discount)):
                arrCopy[idx] += discount[i]
                DFS(arrCopy, idx+1)
                arrCopy[idx] -= discount[i]

    DFS([0] * len(emoticons), 0)
    
    # 조합된 할인율과 사용자가 정해놓은 할인율과 가격을 비교하여 이모티콘 플러스 가입자와 이모티콘 판매액의 최대값 구하기
    for i in range(len(data)):
        count = 0
        price = 0
        for j in range(len(users)):
            plus = 0
            for k in range(len(data[i])):
                if data[i][k] >= users[j][0]:
                    plus += emoticons[k] * (100 - data[i][k]) // 100
            if plus >= users[j][1]:
                count += 1
                plus = 0
            price += plus
            if answer[0] <= count:
                if answer[0] == count:
                    answer[1] = max(answer[1], price)
                else:
                    answer[1] = price
                answer[0] = count
    print(answer)
    return answer