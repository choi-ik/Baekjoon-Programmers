
def solution(nums):
    answer = set(nums)
    return min(len(answer), (len(nums)//2))