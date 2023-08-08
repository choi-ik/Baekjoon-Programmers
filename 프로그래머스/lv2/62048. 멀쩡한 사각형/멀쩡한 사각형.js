function solution(w, h) {
    var answer = 1;
    
    let x = Math.max(w, h)
    let y = Math.min(w, h);
    
    // w, h의 최대 공약수
    let g = gcd(x, y);
    
    // 대각선을 그으면 패턴이 생기는데 패턴에 대한 영역 x, y값
    let xx = Math.floor(x/g);
    let yy = Math.floor(y/g);

    // 최대 공약수 함수
    function gcd(n1, n2) {
        let gcd = 1;
        for (let i = 2; i <= Math.min(n1, n2); i++){
            if (n1 % i === 0 && n2 % i === 0) {
                gcd = i;
            };
        };
        
        return gcd;
    };
    
    // 패턴 영역에서 잘라지는 사각형 갯수 구하기
    let cut = ((xx * yy) - (xx - 1) * (yy - 1));
    
    // 패턴에서 잘라지는 사각형 갯수와 최대공약수를 곱하고 전체 넒이에서 뺴주면 값임
    return answer = x * y - (cut * g);
}