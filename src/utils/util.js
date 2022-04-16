export function putRandomIndex(datas){

    let random_index = Math.random() * datas.length;

    return parseInt(random_index)
}

export function getRandom4Datas(datas, showData){
    let d = [];
    d.push(showData);

    for(let i = 0; i < 3; i++){
        let rIdx = parseInt(Math.random() * datas.length);
        d.push(datas[rIdx]);
        datas.splice(rIdx, 1);
    }

    // Fisher-Yates shuffle Algorithms
    let l = d.length, t, i;

    while(l){
        i = Math.floor( Math.random() * l--)

        t = d[l];
        d[l] = d[i];
        d[i] = t;
    }

    return d;
}