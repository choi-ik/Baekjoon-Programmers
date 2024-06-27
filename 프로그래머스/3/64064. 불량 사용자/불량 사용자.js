function solution(user_id, banned_id) {
    function permutation(arr, selectNum) {
        let result = [];
        if (selectNum === 1) return arr.map((v) => [v]);

        arr.forEach((v, idx, arr) => {
            const fixer = v;
            const restArr = arr.filter((_, index) => index !== idx);
            const permuationArr = permutation(restArr, selectNum - 1);
            const combineFixer = permuationArr.map((v) => [fixer, ...v]);
            result.push(...combineFixer);
        });
        
        return result;
    }
    
    function check_id(u_id, b_id) {
        u_id = u_id.sort((a,b) => a.length - b.length);
        b_id = b_id.sort((a,b) => a.length - b.length);
    
        for(let i = 0; i < u_id.length; i++) {
            if(u_id[i].length !== b_id[i].length) {
                return false;
            } 
        
            for(let j = 0; j < b_id[i].length; j++){
                if(u_id[i][j] !== b_id[i][j] && b_id[i][j] !== '*') {
                    return false;
                }
            }
        }
        
        return true;
    }

    const permutationUser = permutation(user_id, banned_id.length)
    const value = permutationUser.filter(v => check_id(v, banned_id))
    const answer = [...new Set(value.map(v=> v.sort().join(' ')))];
    
    return answer.length;
}