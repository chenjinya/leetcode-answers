/*
在给定的二维二进制数组 A 中，存在两座岛。（岛是由四面相连的 1 形成的一个最大组。）

现在，我们可以将 0 变为 1，以使两座岛连接起来，变成一座岛。

返回必须翻转的 0 的最小数目。（可以保证答案至少是 1。）

 

示例 1：

输入：[[0,1],[1,0]]
输出：1
示例 2：

输入：[[0,1,0],[0,0,0],[0,0,1]]
输出：2
示例 3：

输入：[[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
输出：1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/shortest-bridge
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {number[][]} A
 * @return {number}
 */
var shortestBridge = function(A) {
    let R = A.length, C = A[0].length;
    let covers = find_boundary(A);
    console.log(covers);
    //计算距离
    //把所有岛1点插入队列
    let queue  = [];
    for(let y = 0 ; y < R; y ++) {
        for(let x = 0; x < C; x ++) {
            if(covers[y][x] == 1){
                queue.push({pos: y * C + x, depth: 0});
            } else {
                continue;
            }
        }
    }

    //广度遍历队列
    while(queue.length) {
        let {pos, depth} = queue.shift();
        let nb = neighbors(A, pos % C, Math.floor(pos / C));
        // console.log('nb', nb, pos % C , Math.floor(pos / R));
        for(let w of nb) {
            let _y = Math.floor(w / C), _x = w % C;
            if(2 == covers[_y][_x]) {
                //邻居是岛2
                return depth;
            } else if( 0 == covers[_y][_x]){
                //是个空点，设置标记
                covers[_y][_x] = 1;
                queue.push({pos: w, depth: depth + 1}) 
            }
        }
    }
    return 0;
    
};

//计算每个点的邻居
const neighbors = function(A, x, y) {
    let R = A.length;
    let C = A[0].length;
    if(x <0 || y < 0 || x >= C || y >= R) return[];
    let arr = [];
    
    if(x >0 ) arr.push(y * C + x -1);
    if(x < C - 1) arr.push(y * C + x +1)
    if(y > 0) arr.push((y - 1) * C + x)
    if(y < R - 1) arr.push((y + 1) * C + x);

    return arr;
}

//寻找n个岛
const find_boundary = function(A) {
    let R = A.length, C = A[0].length;
    let covers = [];
    for(let y = 0 ; y < R; y ++) {
        covers[y] = [];
        for(let x = 0; x < C; x ++) {
            covers[y][x] = 0;
        }
    }
    let no = 0;
    for(let y = 0 ; y < R; y ++) {
        for(let x = 0; x < C; x ++) {
            if(!covers[y][x] && A[y][x] == 1){
                 ++ no;
                 covers[y][x] = no;
                let stack  = [];
                stack.push(y * C + x);
               
                while(stack.length) {
                    let pos = stack.pop();
                    let nb = neighbors(A, pos % C, Math.floor(pos / C));
                    // console.log('nb', nb, pos % C , Math.floor(pos / R));
                    for(let w of nb) {
                        let _y = Math.floor(w / C), _x = w % C;
                        if(!covers[_y][_x] && A[_y][_x] == 1) {
                            covers[_y][_x] = no
                            stack.push(_y * C + _x);
                        } 
                    }
                }
            } else {
                continue;
            }
        }
    }
    return covers;
}