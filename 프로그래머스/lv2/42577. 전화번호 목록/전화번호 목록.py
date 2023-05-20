def solution(phone_book):
    answer = True
    phone_book.sort()
    obj = {}

    for i in range(len(phone_book)):
        obj[i] = phone_book[i]
    
    for i in range(len(phone_book) - 1):
            if obj[i] in obj[i+1][:len(obj[i])]:
                return False
            
    return answer