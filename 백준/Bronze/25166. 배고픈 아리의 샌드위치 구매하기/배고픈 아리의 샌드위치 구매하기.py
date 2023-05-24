import sys

input = sys.stdin.readline

s, m = map(int, input().split())
money = s - 1023

if s <= 1023:
    print("No thanks")
else:
    if (m & money) == money:
        print("Thanks")
    else:
        print("Impossible")

