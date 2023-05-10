def solution(queue1, queue2):
    answer = 0
    que1 = sum(queue1)
    que2 = sum(queue2)
    average = (que1 + que2) // 2
    i = 0
    j = 0
    if (que1 + que2) % 2 == 1: 
        return -1
    else:
        while que1 != que2:
            if answer == 600000:
                return -1
            
            if que1 < que2:
                value = queue2[i]
                que2 -= value
                que1 += value
                queue1.append(value)
                i+=1
                answer+=1
            elif que1 > que2:
                value = queue1[j]
                que1 -= value
                que2 += value
                queue2.append(value)
                j+=1
                answer+=1
        
    return answer