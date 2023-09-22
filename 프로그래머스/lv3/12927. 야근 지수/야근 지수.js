// 우선순위 큐(최대 힙)
class MaxHeap {
    constructor() {
        this.heap = [null];
        this.cnt = 0;
    }
    // 데이터 삽입
    push(value) {
        this.heap.push(value);
        this.cnt ++;
        
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
    // 데이터 추출
    pop() {
        if (this.cnt !== 0) this.cnt--;
        if (this.heap.length === 2) return this.heap.pop();
        
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
        };
        
        return returnValue;
    };
    // 가장 큰 수
    max() {
        return this.heap[1];
    };
    // 힙 출력
    display() {
        return this.heap;
    };
    // 힙 크기
    size() {
        return this.cnt;
    };
};

function solution(n, works) {
    let answer = 0;
    const maxHeap = new MaxHeap();
    
    // 힙에 데이터 넣기
    works.forEach(e => {
        maxHeap.push(e);
    });
    
    // 야근 피로도 최소화한 값 구하기
    while (n > 0) {
        let maxData = maxHeap.pop();
        maxHeap.push(maxData - 1);
        
        n --;
    };
    
    // 최소화 한 작업량 제곱하여 더하기
    maxHeap.display().forEach(e => {
        if (e < 0) answer += 0;
        else answer += e ** 2;
    });
    
    return answer;
}