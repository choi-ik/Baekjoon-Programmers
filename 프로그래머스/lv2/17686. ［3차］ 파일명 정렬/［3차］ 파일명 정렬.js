/*
    HEAD = 문자 -> 최소 한 글자 이상.
    NUMBER = 숫자 -> 최대 다섯 글자 사이의 연속된 숫자
    TAIL = 나머지 부분 -> 숫자 OR 문자 OR 아무 글자 없을 수도 있음
    
    * 우선 입력 파일을 HEAD, NUMBER, TAIL로 분리한다.
    * 분리 기준 -> for 문 돌며 숫자체크, 꼬리 체크 변수 생성 후, 체크 변수를 참조하여 NUMBER, TAIL 분리
    * 분리된 배열을 순회하며 HEAD 비교 (대문자로 변환 후 비교) 
        HEAD가 같다면 NUMBER 비교(숫자형으로 변환),
        HEAD가 같지 않다면 HEAD만 비교하여 정렬,
        HEAD와 NUMBER 가 같다면 들어온 순으로 정렬
*/

function solution(files) {
    var answer = [];
    
    const HEAD = Array.from({length: files.length}, () => [""]);
    const NUMBER = Array.from({length: files.length}, () => [""]);
    const TAIL = Array.from({length: files.length}, () => [""]);
    
    for (let i = 0; i < files.length; i ++) {
        let check = false;
        
        for (let j = 0; j < files[i].length; j ++) {
            if (check) TAIL[i] += files[i][j]; // TAIL
            else { 
                if (isNaN(files[i][j]) || files[i][j] === " " || files[i][j] === "." || files[i][j] === "-") HEAD[i] += files[i][j]; // NaN 이면 HEAD에 넣고
                else if (!isNaN(files[i][j])) { // NaN이 아니면 NUMBER에 넣고
                    NUMBER[i] += files[i][j]
                    if (isNaN(files[i][j + 1]) || files[i][j + 1] === " " || files[i][j + 1] === "." || files[i][j + 1] === "-") check = true; // 다음 문자가 NaN이면 check를 true로 변환한 뒤, 다음 순회부터는 check를 참조하여 TAIL에 넣기
                }
            }
        }
    };
    
    
    let i = 0;
    while (i < files.length) {
        for (let k = 0; k < files.length - 1; k ++) {
            let temp = [];
            
            if (HEAD[k].toUpperCase() === HEAD[k + 1].toUpperCase()) {  // HEAD가 같다면
                if (Number(NUMBER[k]) === Number(NUMBER[k + 1])) continue;
                else if (Number(NUMBER[k]) > Number(NUMBER[k + 1])) {
                    temp = [HEAD[k], NUMBER[k], TAIL[k]];
                    HEAD[k] = HEAD[k + 1];
                    NUMBER[k] = NUMBER[k + 1];
                    TAIL[k] = TAIL[k + 1];
                    
                    HEAD[k + 1] = temp[0];
                    NUMBER[k + 1] = temp[1];
                    TAIL[k + 1] = temp[2];
                }
            }
            else if (HEAD[k].toUpperCase() > HEAD[k + 1].toUpperCase()) {   //HEAD가 다르다면
                temp = [HEAD[k], NUMBER[k], TAIL[k]];
                HEAD[k] = HEAD[k + 1];
                NUMBER[k] = NUMBER[k + 1];
                TAIL[k] = TAIL[k + 1];
                    
                HEAD[k + 1] = temp[0];
                NUMBER[k + 1] = temp[1];
                TAIL[k + 1] = temp[2];
            }
        }
        
        i ++;
    }

    for (let i = 0; i < files.length; i ++) {
        answer.push(HEAD[i] + NUMBER[i] + TAIL[i])
    }
    
    let a = "A BB";
    
    console.log(HEAD, "\n", NUMBER, "\n", TAIL)
    return answer;
}