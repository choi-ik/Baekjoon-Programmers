function solution(n, wires) {
    let answer = [];
    let netWork = {};

    wires.map((wire) => {
        const [v1, v2] = wire;
        if(!netWork[v1]) netWork[v1] = [];
        if(!netWork[v2]) netWork[v2] = [];
        netWork[v1].push(v2);
        netWork[v2].push(v1);
    });
    
    for(let i=0; i<wires.length; i++) {
        const [v1, v2] = wires[i];
        let stack = [...netWork[v1]];
        let cnt = 1;
        let v = {};
        v[v1] = true;
        v[v2] = true;
            
        while(stack.length > 0) {
            let temp = stack.pop();
            if(!v[temp]) {
                v[temp] = true;
                stack.push(...netWork[temp]);
                cnt++;
            }
        }
        answer.push(Math.abs((cnt * 2) - n));
    }
    
    return Math.min(...answer);
}