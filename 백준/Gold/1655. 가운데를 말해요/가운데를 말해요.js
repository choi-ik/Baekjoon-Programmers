let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 우선순위 큐(최소 힙)
class MinHeap {
    constructor() {
        this.heap = [null];
        this.cnt = 0;
    };

    heap_push(value) {
        // 아래서 위로
        this.heap.push(value);
        this.cnt ++;
        
        let currentIndex = this.heap.length - 1;
        let parentIndex = Math.floor(currentIndex / 2);
        
        while (parentIndex !== 0 && this.heap[parentIndex] > value) {
            const temp = this.heap[parentIndex];
            this.heap[parentIndex] = this.heap[currentIndex];
            this.heap[currentIndex] = temp;
            
            currentIndex = parentIndex;
            parentIndex = Math.floor(currentIndex / 2);
        };
    };
    
    heap_pop() {
        if (this.cnt !== 0) this.cnt --;
        if (this.heap.length === 2) return this.heap.pop(); // 루트 정점만 남은 경우
        
        // 위에서 아래로
        let returnValue = this.heap[1];
        this.heap[1] = this.heap.pop();
        let currentIndex = 1;
        let leftIndex = 2;
        let rightIndex = 3;
        
        while (this.heap[currentIndex] > this.heap[leftIndex] || this.heap[currentIndex] > this.heap[rightIndex]) {
            const temp = this.heap[currentIndex];
            
            if (this.heap[leftIndex] > this.heap[rightIndex]) {
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

    top() {
        return this.heap[1];
    };

    heap_return() {
        return this.heap;
    };

    size() {
        return this.cnt;
    };
};

// 우선순위 큐(최대 힙)
class MaxHeap {
    constructor() {
        this.heap = [null];
        this.cnt = 0;
    }
    
    heap_push(value) {
        // 아래서 위로
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
    
    heap_pop() {
        if (this.cnt !== 0) this.cnt--;
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
        };
        
        return returnValue;
    };

    top() {
        return this.heap[1];
    };
    
    heap_return() {
        return this.heap;
    };

    size() {
        return this.cnt;
    };
};

const N = +input.shift();
const num = input.slice(0, N).map(e => +e);
const Minheap = new MinHeap(); // 큰 값들 중 최솟값이 Top
const Maxheap = new MaxHeap(); // 작은 값들 중 최댓값이 Top
Maxheap.heap_push(num[0]);

let answer = num[0] + "\n";
/* 
    중간 값 찾기 알고리즘
    1. 최대 힙의 크기는 최소힙의 크기와 같거나 1더 크다.
    2. 최대 힙의 최대 원소는 최소힙의 최소 원소보다 작거나 같다.
        만약 최대 힙의 최대 원소가 최소 힙의 최소 원소보다 크다면 두 원소 Swap
    
    위 규칙을 유지하면 항상 최대힙의 Top 값이 중간값이 됨.
*/
for (let i = 1; i < N; i ++) {
    if (Minheap.size() === Maxheap.size()) Maxheap.heap_push(num[i]);
    else if (Minheap.size() < Maxheap.size()) Minheap.heap_push(num[i]);

    // 두 힙의 Top 값 Swap
    if (Minheap.top() < Maxheap.top()) {
        let min = Minheap.heap_pop();
        let max = Maxheap.heap_pop()
        Maxheap.heap_push(min);
        Minheap.heap_push(max);

        answer += Maxheap.top() + "\n";
    } else {
        answer += Maxheap.top() + "\n";
    };
};

console.log(answer.trim())