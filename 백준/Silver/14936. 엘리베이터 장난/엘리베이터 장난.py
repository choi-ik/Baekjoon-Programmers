import sys

input = sys.stdin.readline

n, m = map(int, input().split())
m1 = n  # 전체버튼
m2 = n // 2  # 짝수버튼
m3 = (n+1) // 2  # 홀수버튼
m4 = (n - 1) // 3 + 1  # 1포함, 3k+1 버튼

# 아무 버튼도 누르지 않은 상태
count = 1

if m1 <= m: count += 1
if n > 1 and m2 <= m: count += 1 
if n > 1 and m3 <= m: count += 1
if n > 2 and m4 <= m: count += 1
if n > 2 and m2 + m4 <= m: count += 1
if n > 2 and m3 + m4 <= m: count += 1
if n > 2 and m1 + m4 <= m: count += 1
    
print(count)
