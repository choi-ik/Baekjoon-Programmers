let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, K] = input.shift().split(" ").map(Number);
const gemstone = input.slice(0, N).map(e => e.split(" ").map(Number));
const backpack = input.slice(N, N + K).map(Number);

let result = 0;

// 우선순위 큐(최대 힙)
class MaxHeap {
    constructor() {
        this.heap = [null];
        this.cnt = 0;
    }
    
    push(value) {
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
    
    pop() {
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
    
    return() {
        return this.heap;
    };

    size() {
        return this.cnt;
    };
};

// 최대힙 생성
const maxheap = new MaxHeap();

// 가방 오름차순 정렬
backpack.sort((a, b) => a - b);
// 보석 무게 오름차순 정렬
gemstone.sort((a, b) => a[0] - b[0]);

let idx = 0;
for (let i = 0; i < K; i ++) {
    //  보석의 무게와 가방의 무게를 비교하며 최대힙에 보석 push
    while (idx < N && gemstone[idx][0] <= backpack[i]) {
        maxheap.push(gemstone[idx][1])
        idx ++;
    };

    // 최대힙에 보석이 하나 이상 들어갔다면 보석 중 가장 큰 값을 pop
    if (maxheap.size()) result += maxheap.pop();
};

console.log(result);  