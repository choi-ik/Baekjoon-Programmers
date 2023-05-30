import sys

input = sys.stdin.readline

T = input().rstrip()
N = int(input())

result = []
book_arr = []
price_arr = []

# book[]와 price[]에 각각 책제목, 책가격 append
for i in range(N):
    temp = list(input().split())
    price_arr.append(int(temp[0]))
    book_arr.append(temp[1])


# 조합하여 만든 문자열로 해당 단어를 만들 수 있는지 검사
# 가능한 경우의 금액을 모두 구하고 그중 가장 적은 금액 출력
def DFS(word, book, price):
    cnt = 0

    for w in word:
        if w in book:
            cnt += 1
            book = book.replace(w, ' ', 1)  # 오려낸 글자 없애주기

            if cnt == len(word):
                return price

    return sys.maxsize


# 책 제목으로 만들 수 있는 모든 문자열과 해당하는 금액을 합한 집합을 만듬.
for i in range(1, 1 << len(book_arr)):
    temp = ""
    sum_price = 0

    for j in range(len(book_arr)):
        if (i & 1 << j) != 0:
            temp += book_arr[j]
            sum_price += price_arr[j]

    result.append(DFS(T, temp, sum_price))


answer = min(result)
if answer == sys.maxsize:
    print(-1)
else:
    print(answer)