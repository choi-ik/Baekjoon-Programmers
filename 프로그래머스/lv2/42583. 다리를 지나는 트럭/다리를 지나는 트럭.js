function solution(bridge_length, weight, truck_weights) {
    let answer = 0;
    let bridgeSum = 0
    let bridge =  Array.from({length: bridge_length}, () => 0);
    
    answer++;
    bridge.shift();
    bridgeSum += truck_weights[0];
    bridge.push(truck_weights.shift());
    
    while(bridgeSum > 0){
        answer++;
        
        bridgeSum -= bridge.shift();
        if(truck_weights.length > 0 && bridgeSum + truck_weights[0] <= weight){
            bridgeSum += truck_weights[0];
            bridge.push(truck_weights.shift());
        }else{
            bridge.push(0);
        }
    }
    
    return answer;
}