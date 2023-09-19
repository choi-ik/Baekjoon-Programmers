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
    
    heap_return() {
        return this.heap;
    };

    size() {
        return this.cnt;
    };
};

function solution(n, k, enemy) {
    let answer = 0;
    let maxHeap = new MaxHeap();
    
    for(let round of enemy) {
        // 우선순위 큐에 현재 라운드의 적의 수 넣어줌
        maxHeap.push(round);
        // 병사의 수를 적의 수 만큼 빼줌
        n -= round;
        
        // 병사의 수가 0명 이하일 때
        if (n < 0) {
            // 무적권 스킬이 남아있을 때
            if (k) {
                // 진행중인 라운드 중 병력 소모가 가장 많은 값
                let max = maxHeap.pop();
                
                // 병사 수 다시 늘리고 무적권 감소
                n += max;
                k --;
            }
            // 병사가 없고 무적권이 없으면 진행 끝
            else break;
        }
        // 방어해낸 라운드 증가
        answer ++;
    };
    
    
    return answer;
}