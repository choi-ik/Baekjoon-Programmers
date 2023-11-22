function solution(n, k, cmd) {
    let answer = '';
    const linkedList = new CircularLinkedList(n); // 원형 연결리스트
    
    let previousNode = linkedList.head;
    // 연결리스트에 값 삽입
    for (let i = 0; i < n; i ++) {
        previousNode = linkedList.insert(i, previousNode);
    };

    let startNode = linkedList.find(k); // 시작 행
    let deleteList = []; // 삭제된 행 저장소 
    
    // 명령 진행
    for (const [i, command] of cmd.entries()) {
        
        // 아래 방향(+)
        if (command[0] === 'D'){
            const [_, count] = command.split(' ');
            const node = linkedList.moveDownList(count, startNode);
            startNode = node;
        }
        // 윗 방향(-)
        if (command[0] === 'U'){
            const [_, count] = command.split(' ');
             const node = linkedList.moveUpList(count, startNode);
            startNode = node;
        }
        // 데이터 삭제 후 아래 데이터 선택
        if (command[0] === 'C'){
            const node = linkedList.remove(startNode);
            startNode = node[1]
            deleteList.push(node[0]);
            
        }
        // 삭제된 데이터 원위치 복구
        if (command[0] === 'Z'){
            const node = deleteList.pop();
            const prevNode = node.prev;
            const nextNode = node.next;
            
            prevNode.next = node;
            nextNode.prev = node;
        }
    };
    
    
    answer = Array(n).fill('O')
    
    deleteList.forEach(e => {
        answer[e.node] = 'X'
    })
    
    return answer.join('');
}

class Node {
    constructor(data) {
        this.node = data
        this.next = null;
        this.prev = null;
    }
};

// 원형 연결리스트
class CircularLinkedList {
    constructor(N) {
        // 서로를 가리키게 초기화
        this.head = new Node("head");
        this.head.next = this.head;
        this.n = N;
    }
    
    // 데이터 찾기
    find(data) {
        let curNode = this.head;
        let i = 0; 
        
        while (curNode.node !== data && i < this.n) {
            curNode = curNode.next;
            i ++;
        }
        
        return curNode;
    }
    
    // D일 경우
    moveDownList(count, Node) {
        let curNode = Node;
   
        while(count > 0 && curNode.next !== null) {
            curNode = curNode.next;
            
            count --;
        }
        
        return curNode;
    }
    
    // U일 경우
    moveUpList(count, Node) {
        let curNode = Node;
        
        while(count > 0 && curNode.prev !== null) {
            curNode = curNode.prev;
            count --;
        }
        
        return curNode;
    }
    
    // 데이터 삽입
    insert(newData, data) {
        
        let newNode = new Node(newData);
        let curNode = data;
        
        if (curNode.next !== null) {
            newNode.next = curNode.next;
            newNode.prev = curNode;
            curNode.next.prev = newNode;
            curNode.next = newNode;
        }        
        
        return newNode;
    }
    
    // 데이터 제거
    remove(curNode) {
        curNode.prev.next = curNode.next;
        curNode.next.prev = curNode.prev;
        
        // 삭제된 값은 리턴
        return curNode.next.node !== 'head' ? [curNode, curNode.next] : [curNode, curNode.prev]
    }
}