function solution(land) {
    for(let idx = 1; idx < land.length; idx ++) {
        land[idx][0] += Math.max(land[idx - 1][1], land[idx - 1][2], land[idx - 1][3]);
        land[idx][1] += Math.max(land[idx - 1][0], land[idx - 1][2], land[idx - 1][3]);
        land[idx][2] += Math.max(land[idx - 1][0], land[idx - 1][1], land[idx - 1][3]);
        land[idx][3] += Math.max(land[idx - 1][0], land[idx - 1][1], land[idx - 1][2]);
    }

    return Math.max(...land[land.length - 1]);
}