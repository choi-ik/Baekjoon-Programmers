function solution(n, works) {
    var answer = 0;
    const heap = new MaxHeap();

    // 힙큐에 값 삽입
    works.forEach((e) => heap.heap_push(e));

    // n번 만큼 힙큐에서 가장 큰 값을 빼 -1 을 한뒤 다시 힙 큐에 넣어주기
    for (let i = 1; i <= n; i ++) {
        let temp = heap.heap_pop();
        
        heap.heap_push(temp - 1);
    };

    // 남은 작업량 제곱후 더하기
    heap.heap_return().forEach((e) => {
        if (e < 0) return 0;
        if (e !== null) answer += e ** 2;
    })
    
    return answer;
};

// 우선순위 큐(최대 힙)
class MaxHeap {
    constructor() {
        this.heap = [null];
    }
    
    heap_push(value) {
        // 아래서 위로
        this.heap.push(value);
        
        let currentIndex = this.heap.length - 1;
        let parentIndex = Math.floor(currentIndex / 2);
        
        while (parentIndex !== 0 && this.heap[parentIndex] < value) {
            const temp = this.heap[parentIndex];
            this.heap[parentIndex] = this.heap[currentIndex];
            this.heap[currentIndex] = temp;
            
            currentIndex = parentIndex;
            parentIndex = Math.floor(currentIndex / 2);
        };
    };
    
    heap_pop() {
        if (this.heap.length === 2) return this.heap.pop(); // 루트 정점만 남은 경우
        
        // 위에서 아래로
        let returnValue = this.heap[1];
        this.heap[1] = this.heap.pop();
        let currentIndex = 1;
        let leftIndex = 2;
        let rightIndex = 3;
        
        while (this.heap[currentIndex] < this.heap[leftIndex] || this.heap[currentIndex] < this.heap[rightIndex]) {
            const temp = this.heap[currentIndex];
            
            if (this.heap[leftIndex] < this.heap[rightIndex]) {
                this.heap[currentIndex] = this.heap[rightIndex];
                this.heap[rightIndex] = temp;
                currentIndex = rightIndex;
            }
            else {
                this.heap[currentIndex] = this.heap[leftIndex];
                this.heap[leftIndex] = temp;
                currentIndex= leftIndex;
            }
            
            leftIndex = currentIndex * 2;
            rightIndex = leftIndex + 1;
        }
        
        return returnValue;
    }
    
    heap_return() {
        return this.heap;
    }
}