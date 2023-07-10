function solution(files) {
    var answer = [];
    
    files.sort((pre, cur) => {
        const regexHead = /\D+/
        const regexNumber = /\d{1,5}/
        const preHead = pre.match(regexHead)[0];
        const curHead = cur.match(regexHead)[0];
        const preNumber = pre.match(regexNumber)[0];
        const curNumber = cur.match(regexNumber)[0];
        // 두개가 같다면 0, ref가 작다면 -1 com이 작다면 1 리턴
        const head = preHead.toUpperCase().localeCompare(curHead.toUpperCase()); 
        
        // head가 0이 아니라면 두 크기에 따라 오름차순 또는 내림차순 정렬 return
        if (head) return head;
        if (Number(preNumber) - Number(curNumber) === 0) return 0;
        return Number(preNumber) - Number(curNumber);
    });
    
    return files;
}