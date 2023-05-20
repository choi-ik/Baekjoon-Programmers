def solution(phone_book):
    answer = True
    phone_book.sort()
#     obj = {}

#     for i in range(len(phone_book)):
#         obj[i] = phone_book[i]
    
    for i in range(len(phone_book) - 1):
            if phone_book[i] in phone_book[i+1][:len(phone_book[i])]:
                return False
            
    return answer