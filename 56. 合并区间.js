/*
给出一个区间的集合，请合并所有重叠的区间。

示例 1:

输入: [[1,3],[2,6],[8,10],[15,18]]
输出: [[1,6],[8,10],[15,18]]
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
示例 2:

输入: [[1,4],[4,5]]
输出: [[1,5]]
解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-intervals
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if(intervals.length == 0) return [];
    let build  = [];
    let sorted = intervals;
    for(let i = 0; i< sorted.length - 1; i++) {
       
        for(let j = i; j < sorted.length; j++) {
            let a = sorted[i][0]
            let b = sorted[j][0]
            if(a > b) {
                let tmp = sorted[i];
                sorted[i] = sorted[j];
                sorted[j] = tmp;
            }
        }
    }
    // console.log(sorted);
    build = walk(sorted)
    return build;
};

const walk = function(sorted) {
    let build = [];
    let flag = false;
    for(let i = 0; i< sorted.length; i++) {
        if(!sorted[i+1]) {
            build.push(sorted[i]);
            break;
        }
        let pre = sorted[i][1];
        let sub = sorted[i + 1][0];

        if(pre >= sub) {
            build.push([sorted[i][0],Math.max( sorted[i + 1][1],  sorted[i][1])]);
            i ++;
            flag = true;
        } else {
            build.push(sorted[i]);
        }
    }
    if(true == flag) {
        return walk(build);
    } else {
        return build;
    }
    
}