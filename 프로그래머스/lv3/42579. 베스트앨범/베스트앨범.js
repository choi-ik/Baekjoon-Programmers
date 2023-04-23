function solution(genres, plays) {
    var answer = [];
    var obj = {};
    
    // 장르별 재생횟수의 합
    for(var i=0; i<genres.length; i++){
        if(genres[i] in obj){
            obj[genres[i]] += plays[i];
        }else{
            obj[genres[i]] = {};
            obj[genres[i]] = plays[i];
        }
    }
    
    // 장르별 재생횟수의 합을 키,값의 배열 형태로 만들고 정렬
    var sortArr = Object.entries(obj)
    sortArr.sort((a, b) => b[1] - a[1]);
    
    // 장르, id, 재생횟수별 키 값의 객체 형태로 생성
    var arr = genres.map((e, i) => ({
        genre: e,
        id: i,
        play: plays[i]
    }));
    // 정렬된 장르별 재생횟수의 합과 객체 형태로 생성된 arr을 비교하고 push
    sortArr.forEach((e) => {
        var genreArr = [];
        for(var j=0; j<arr.length; j++){
            if(e[0] === arr[j].genre) genreArr.push(arr[j]);
        };
        genreArr.sort((a, b) => b.play - a.play);
        genreArr.forEach((k, i) => {
            if(i < 2) answer.push(k.id);
        })
        
    })
    
    return answer;
}