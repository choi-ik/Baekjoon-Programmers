function solution(n, paths, gates, summits) {
    const answer = [n, Infinity];
    const routes = Array.from({length: n + 1}, () => []); // 산봉우리 인접리스트
    let dist = Array.from({length: n + 1}, () => Infinity); // Intensity가 최소가 될 배열
    let isRoot = Array.from({length: n + 1}, () => false); // 산봉우리 방문 배열
    
    // 산봉우리 인접리스트 생성
    paths.forEach(([s, e, cost]) => {
        routes[s].push([e, cost]);
        routes[e].push([s, cost]);
    });
    
    summits.sort((a, b) => a - b);
    
    // 산봉우리 true 표시
    summits.forEach(e => {
        isRoot[e] = true;
    });
    
    // 방문하지 않은 노드중에서 최단 거리가 가장 짧은 노드의 인덱스 반환
    function getSmallRoute(dist, visit) {
        let min = Infinity;
        let idx = 0;
        
        for (let i in dist) {
            if (!visit[i] && min > dist[i]) {
                min = dist[i];
                idx = i;
            }
        };
        
        return idx;
    };
    
    // 다익스트라 함수
    function dijkstra() {
        const minHeap = new MinHeap();
        const intensity = Array(n + 1).fill(Infinity);
        
        gates.forEach((e) => {
            minHeap.push([e ,0]);
            intensity[e] = 0;
        })
        
        while(!minHeap.empty()) {
            const [node, cost] = minHeap.pop();
            
            // 노드에 기록된 intensity보다 cost가 클 경우 최소 intensity가 아님
            if (intensity[node] < cost) continue;
            // 산봉우리에 도착할 경우
            if (isRoot[node]) continue;
            
            const addList = routes[node];
            const addListLength = addList.length;
            
            for (let i = 0; i < addListLength; i ++) {
                const [nextNode, nextCost] = addList[i];
                
                if (intensity[nextNode] > Math.max(intensity[node], nextCost)) {
                    intensity[nextNode] = Math.max(intensity[node], nextCost);
                    minHeap.push([nextNode, intensity[nextNode]]);
                }
            }
            
        }
        
        return intensity;
    };
    
    const intensity = dijkstra();
    console.log(intensity)
    
    summits.forEach((summit) => {
        if (intensity[summit] < answer[1]) {
            answer[0] = summit;
            answer[1] = intensity[summit];
        }
    })
    
    return answer;
};

// 최소 힙
class MinHeap {
    constructor() {
        this.heap = [null];
    }
    
    push(value) {
        this.heap.push(value);
        
        let currentIndex = this.heap.legnth - 1;
        let parentIndex = Math.floor(currentIndex / 2);
        
        while(parentIndex !== 0 && this.heap[parentIndex] > value) {
            const temp = this.heap[parentIndex];
            this.heap[parentIndex] = this.heap[currentIndex];
            this.heap[currentIndex] = temp;
            
            currentIndex = parentIndex;
            parentIndex = Math.floor(currentIndex / 2);
        };
    };
    
    pop() {
        if (this.heap.length === 2) return this.heap.pop();
        
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
            } else {
                this.heap[currentIndex] = this.heap[leftIndex];
                this.heap[leftIndex] = temp;
                currentIndex= leftIndex;
            }
            
            leftIndex = currentIndex * 2;
            rightIndex = leftIndex + 1;
        }
        
        return returnValue;
    }
    
    empty() {
        return this.heap.length === 1;
    }
}