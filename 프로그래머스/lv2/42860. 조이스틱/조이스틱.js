function solution(name) {
    let answer = 0;
    let min_move = name.length - 1;
    
    for(let i=0; i<name.length; i++) {
        answer += Math.min(name[i].charCodeAt() - 65, 91 - name[i].charCodeAt());
        let idx = i + 1;
        
        while(idx < name.length && name[idx] === "A") idx++;
        console.log("이것보라", idx)
        min_move = Math.min(min_move, i * 2 + name.length - idx, i + 2 * (name.length - idx));
        console.log(min_move)
    };

  return answer + min_move;
}