function solution(numbers) {
    let answer = "";
    let numArr = numbers.join().split(",");

    numArr.sort((a, b) => {
        return (b+a) - (a+b);
    });

    if(numArr[0] === "0") return "0";
    return numArr.join("");
}