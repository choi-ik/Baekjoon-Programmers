function solution(alp, cop, problems) {
    let targetAlp = 0; // 목표 알고력
    let targetCop = 0; // 목표 코딩력
    // 알고력과 코딩력의 최대치만큼의 배열을 무한대로 설정
    let visit = Array.from({length: 151}, () => Array.from({length: 151}, () => Infinity)); 
    
    // 전체 모든 문제를 풀기 위해 모든 문제들 중 가장 큰 알고력과 코딩력을 목표치로 설정
    for (let i = 0; i < problems.length; i ++) {
        targetAlp = Math.max(targetAlp, problems[i][0]);
        targetCop = Math.max(targetCop, problems[i][1]);
    };

    // 특정 값을 만족하는 모든 경우의 수를 구하기
    DFS(alp, cop, 0,  problems);
    
    function DFS(al, co, time, pb) {
        // // 알고력, 코딩력이 최대치를 넘어가면 최대치로 고정
        if (targetAlp < al) al = targetAlp;
        if (targetCop < co) co = targetCop;
        
        // 목표 알고 코딩력보다 더 많은 시간을 소요하면 리턴
        if (visit[al][co] <= time) return;
        
        visit[al][co] = Math.min(visit[al][co], time);
        
        // 목표 알고력, 코딩력에 도달하면 리턴
        if (al === targetAlp && co === targetCop) return;
        
        for (let i = 0; i < pb.length; i ++) {
            if (al >= pb[i][0] && co >= pb[i][1]) {
                let nextAlp = al + pb[i][2];
                let nextCop = co + pb[i][3];
                
                // 문제를 직접 푸는 모든 경우
                DFS(nextAlp, nextCop, time + pb[i][4], pb);
            }
        }
        
        // 시간으로 알고력, 코딩력 올리는 경우
        DFS(al + 1, co, time + 1, pb);
        DFS(al, co + 1, time + 1, pb);
    }

    return visit[targetAlp][targetCop];
}    