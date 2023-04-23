function solution(a, b) {
    var date =  new Date(2016, a-1, b);
    var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var weekday = week[date.getDay()];
    return weekday;
}