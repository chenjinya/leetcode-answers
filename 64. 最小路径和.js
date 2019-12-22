/*
给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

说明：每次只能向下或者向右移动一步。

示例:

输入:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 7
解释: 因为路径 1→3→1→1→1 的总和最小。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minimum-path-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var  minPathSum = function(grid) {
    let dp = [];
    let R = grid.length;
    let C = grid[0].length;
    for(let y = 0; y < R; y ++) {
        dp[y] = [];
        for(let x = 0; x < C; x++) {
            dp[y][x] = 0;
        }
    }
  
    for(let y = 0; y < R; y ++) {
        for(let x = 0; x < C; x++) {
            let w = grid[y][x];
            if(y == 0 && x == 0) {
                 dp[y][x] = w;
            } else if(y == 0 && x > 0) {
                dp[y][x] = w +  dp[y][x - 1];
            } else if(x == 0 && y > 0) {
                dp[y][x] = w +  dp[y - 1][x];
            } else {
                dp[y][x] =w +  Math.min(dp[y - 1][x], dp[y][x - 1]);
            }
        }
    }
    console.log(dp);
    return dp[R-1][C - 1];
}

//递归 或者用queue做队列

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    let queue = [];
    let R = grid.length;
    let C = grid[0].length;
    let path = 0,x =0, y= 0, map = {};
    queue.push({pos: y * C + x, depth: grid[y][x]});
    map[`${x},${y}`] = grid[y][x];
    while(queue.length > 0) {
        // console.log(queue);
        let {pos, depth} = queue.shift();
        x = pos % C;
        y = Math.floor(pos / C);
        if(map[`${x},${y}`] && depth > map[`${x},${y}`] ) {
           continue;
        } 
        if(!map[`${x},${y}`]) map[`${x},${y}`] = depth;
        map[`${x},${y}`] = Math.min(map[`${x},${y}`], depth);
        depth = map[`${x},${y}`];
        let nb = neighbors(grid, pos);
        // console.log(nb)
        if(path != 0 && depth > path) {
            continue;
        }
        if(nb.length == 0) {
            if(path == 0 || path > depth) {
                path = depth;
            }
            // break;
        } else {
            for(let p of nb) {
                let _x = p % C, _y = Math.floor(p / C);
                queue.push({pos: p, depth: depth + grid[_y][_x]})
            
            }
        }
        
    }
    return path;
};

const neighbors = function(grid, pos) {
    let R = grid.length;
    let C = grid[0].length;
    let x = pos % C, y = Math.floor(pos / C);
    let arr = [];
    if(x < C - 1)  arr.push(y * C + x + 1);
    if(y < R - 1)  arr.push((y + 1) * C + x);
    return arr;

}