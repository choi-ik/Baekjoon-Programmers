import sys

input = sys.stdin.readline
s = set()
m = int(input())

for i in range(m):
    value = list(input().split())

    if value[0] == 'add':
        s.add(int(value[1]))

    elif value[0] == 'remove':
        s.discard(int(value[1]))

    elif value[0] == 'check':
        if int(value[1]) in s:
            print(1)
        else:
            print(0)
    elif value[0] == 'toggle':
        if int(value[1]) in s:
            s.discard(int(value[1]))
        else:
            s.add(int(value[1]))

    elif value[0] == 'all':
        s.update({1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20})

    elif value[0] == 'empty':
        s.clear()