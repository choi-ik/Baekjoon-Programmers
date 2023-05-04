function solution(n, costs) {
    let answer = 0;
    let parent = new Array(n).fill("d")
    costs.sort((a, b) => a[2] - b[2]); // 간선의 비용을 기준으로 오름차순 정렬
    
    /* 각 정점이 포함된 그래프가 어디인지 저장 */
    for(let i=0; i<n; i++) {
        parent[i] = i;
    };
    
    /* 사이클이 발생하지 않는 경우 그래프에 포함 */
    for(let i=0; i<costs.length; i++) {
        if(!findParent(parent, costs[i][0] - 1, costs[i][1] - 1)) {
            answer += costs[i][2];
            unionParent(parent, costs[i][0] - 1, costs[i][1] - 1);
        }
    }
    /* 여기서부터 세번째 함수까지 Union & find 알고리즘 */
    /* 부모 노드를 찾는 함수 */
    function getParent(parent, x) {
        if(parent[x] === x) return x;
        return parent[x] = getParent(parent, parent[x]);
    };
    /* 두 부모 노드를 합치는 함수 */
    function unionParent(parent, a, b) {
        a = getParent(parent, a);
        b = getParent(parent, b);
        if(a < b) parent[b] = a;
        else parent[a] = b;
    };
    
    /* 같은 부모를 가지는지 확인 */
    function findParent(parent, a, b) {
        a = getParent(parent, a);
        b = getParent(parent, b);
        if(a === b) return 1;
        return 0;
    };
    
    return answer;
}