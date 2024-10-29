class PriorityQueue {
  constructor(comparator) {
    this.heap = [];
    this.compare = comparator || ((a, b) => b - a);
  }
  size() {
    return this.heap.length;
  }
  enqueue(item) {
    this.heap.push(item);
    this.heapifyUp();
  }
  dequeue() {
    const priority = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length) {
      this.heap[0] = end;
      this.heapifyDown();
    }

    return priority;
  }
  heapifyUp() {
    let index = this.heap.length - 1;

    while (index) {
      const cur = this.heap[index];
      const pIdx = Math.floor((index - 1) / 2);
      const p = this.heap[pIdx];

      if (this.compare(p, cur) >= 0) break;

      this.heap[index] = p;
      this.heap[pIdx] = cur;
      index = pIdx;
    }
  }
  heapifyDown() {
    let index = 0;
    const cur = this.heap[index];
    const len = this.heap.length;

    while (true) {
      let swap = null;
      let lc, rc;
      const lcIdx = index * 2 + 1;
      const rcIdx = index * 2 + 2;

      if (lcIdx < len) {
        lc = this.heap[lcIdx];
        if (this.compare(lc, cur) > 0) swap = lcIdx;
      }

      if (rcIdx < len) {
        rc = this.heap[rcIdx];
        if (
          (swap === null && this.compare(rc, cur) > 0) ||
          (swap !== null && this.compare(rc, lc) > 0)
        )
          swap = rcIdx;
      }

      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = cur;
      index = swap;
    }
  }
}

let fs = require("fs");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./BackJoon/Priority_Queue/1374.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const heap = new PriorityQueue();
const n = +input[0];
const lectures = input.slice(1).map((e) => e.split(" ").map(Number));

lectures.sort((a, b) => a[1] - b[1]);

lectures.forEach(([_, start, end], idx) => {
  if (heap.size() === 0) heap.enqueue(end);
  else {
    const head = heap.heap[0];
    if (start >= head) heap.dequeue();
    heap.enqueue(end);
  }
});

console.log(heap.size());
