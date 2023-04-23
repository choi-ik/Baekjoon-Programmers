function solution(word) {
    let answer = {};
    let alphabet = ["A", "E", "I", "O", "U"];
    let wordNumber = 0; 
    function DFS(word, num, length) {
        if(length > 5) {
            wordNumber--;
            return;
        }
        answer[word] = num;  //{"": 0} -> {"A" : 1 .... "AAAAA" : 5, "AAAAE" : 6}
        for(let i=0; i<alphabet.length; i++) {
            wordNumber++;
            DFS(word + alphabet[i], wordNumber, length+1);
        }
    };
    
    DFS("", wordNumber, 0);
    return answer[word];
}