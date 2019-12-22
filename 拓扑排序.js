//拓扑排序

let map = {
    0 : [1],
    1 : [2,3],
    2 : [3, 5],
    3 : [5],
    4 : [ 0,2],
    5 : [],
}
let len = Object.keys(map).length;
let in_map = {};
let arr = [];
console.log(len)
//计算入度
for(let i = 0; i < len; i++) {
    if(! in_map[i])  in_map[i] = 0;
    for(let j = 0; j < map[i].length; j++) {
        if(!in_map[map[i][j]]) in_map[map[i][j]] = 0;
        in_map[map[i][j]] ++
    }
}

console.log(JSON.stringify(in_map))
//找到入度为0节点
let next = null;
for(let n = 0; n < len; n++) {
    if(in_map[n] == 0) {
        next = n;
        break;
    }
}

console.log(next);
// //遍历
for(let c = 0; c< len; c++) {
    let node = next;
    for(let j=0; j< map[node].length; j++) {
        in_map[map[node][j]] --;
        if(in_map[map[node][j]] === 0) {
            next = map[node][j];
        }
    }
    arr.push(node);
    // map[node] = null;
}

console.log(arr);