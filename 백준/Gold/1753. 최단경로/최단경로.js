let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 우선순위 큐(최소 힙)
class MinHeap {
    constructor() {
        this.heap = [null];
    }

    push(value) {
        // 아래서 위로
        this.heap.push(value);
        
        let currentIndex = this.heap.length - 1;
        let parentIndex = Math.floor(currentIndex / 2);
        
        while (parentIndex !== 0 && this.heap[parentIndex] > value) {
            const temp = this.heap[parentIndex];
            this.heap[parentIndex] = this.heap[currentIndex];
            this.heap[currentIndex] = temp;
            
            currentIndex = parentIndex;
            parentIndex = Math.floor(currentIndex / 2);
        };
    }
    
    pop() {
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
    }

    top() {
        return this.heap[1];
    }

    return() {
        return this.heap;
    }
    
    empty() {
        return this.heap.length === 1;
    }
};

const [V, E] = input[0].split(" ").map(Number);
const K = +input[1];

let graph = Array.from({length: V + 1}, () => []);
let dist = Array.from({length: V + 1}, () => Infinity); // 거리 테이블
let minHeap = new MinHeap(); // 최소힙 생성(거리 기준)

for (let i = 2; i < input.length; i ++) {
    const [s, e, cost] = input[i].split(' ').map(Number);
    graph[s].push([e, cost]);
};


// 다익스트라 함수
function dijkstra(start) {
    // 시작 노드 초기화
    minHeap.push([0, start]); // [거리, 노드]
    dist[start] = 0;

    while (!minHeap.empty()) {
        const [d, cur] = minHeap.pop(); // 현재 최단 거리가 가장 짧은 노드

        // 최단 거리가 아닌 경우(방문한 적이 있는 경우) 스킵
        if (dist[cur] < d) continue;

        // 인접 노드 탐색
        for (const i of graph[cur]) {
            const [node, cost] = [i[0], d + i[1]];

            if (cost < dist[node]) {
                minHeap.push([cost, node]);
                dist[node] = cost;
            }
        }
    }
};

dijkstra(K);

dist = dist.slice(1);
dist.map((e, i) => {
    if (e === Infinity) dist[i] = 'INF';
});

console.log(dist.join('\n').trim());