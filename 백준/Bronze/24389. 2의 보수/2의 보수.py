import sys

input = sys.stdin.readline

n = int(input())
nbit = list(map(int, bin(n)[2:].zfill(32)))
reverse_nbit = [abs(int(bi) -1) for bi in nbit]

def change(i):
    if i == len(reverse_nbit): return
    if reverse_nbit[len(reverse_nbit) - i] + 1 == 2:
        reverse_nbit[len(reverse_nbit) - i] = 0
        change(i+1)
    else:
        reverse_nbit[len(reverse_nbit) - i] = 1

change(1)
cnt = 0
for i in range(32):
    if nbit[i] != reverse_nbit[i]:
        cnt += 1
        
print(cnt)