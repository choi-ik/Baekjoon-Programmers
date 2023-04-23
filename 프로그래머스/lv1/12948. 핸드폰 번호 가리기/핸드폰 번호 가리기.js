function solution(phone_number) {
    var answer = '';
    
    var back = phone_number.substr(-4, 4);
    var front = phone_number.substr(0, phone_number.length-4);
    
    var result = front.replace(/[0-9]/gi,'*');
    var answer = result + back;
    
    return answer;
}