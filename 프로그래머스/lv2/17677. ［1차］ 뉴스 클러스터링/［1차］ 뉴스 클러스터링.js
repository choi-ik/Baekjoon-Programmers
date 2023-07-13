function solution(str1, str2) {
    let idx = Math.max(str1.length, str2.length);
    let arrA = []; // str1을 두 글자 씩 끊어서 넣을 배열
    let arrB = []; // str2를 두 글자 씩 끊어서 넣을 배열
    const regex = /[^a-zA-Z]/;
    
    for (let i = 0; i < idx - 1; i ++) {
        // str1
        if (str1[i] !== undefined && str1[i + 1] !== undefined) {
            // 문자열이 아닌 것이 포함된다면 배열에 추가 X
            if (!regex.test((str1[i] + str1[i + 1]))) arrA.push((str1[i] + str1[i + 1]).toUpperCase()); 
        };
        
        // str2
        if (str2[i] !== undefined && str2[i + 1] !== undefined) {
            // 문자열이 아닌 것이 포함된다면 배열에 추가 X
            if (!regex.test((str2[i] + str2[i + 1]))) arrB.push((str2[i] + str2[i + 1]).toUpperCase()); 
        }; 
    };
    
    let max = arrA.length + arrB.length; // 집합 A와 B의 합집합 길이
    let min = 0; // 집합 A와 B의 교집합 길이
    
    for(let i = 0; i < arrA.length; i ++) {
        for(let j = 0; j < arrB.length; j++) {
            if (arrA[i] === arrB[j]) {
                min ++;
                arrB[j] = "";
                break;
            };
        };
    };
    if (!arrA.length && !arrB.length) return 65536;
    else return Math.floor((min / (max - min)) * 65536);
}