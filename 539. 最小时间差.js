
/*
给定一个 24 小时制（小时:分钟）的时间列表，找出列表中任意两个时间的最小时间差并已分钟数表示。


示例 1：

输入: ["23:59","00:00"]
输出: 1

备注:

列表中时间数在 2~20000 之间。
每个时间取值在 00:00~23:59 之间。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minimum-time-difference
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function(timePoints) {
    let minsList = [];
    
    for(let time of timePoints) {
        let time_arr = time.split(":");
        //  console.log(time_arr)
        let mins = time_arr[0] * 60 + parseInt( time_arr[1]);
        minsList.push(mins);
    }
    minsList.sort((a, b) => { return a - b});
    console.log(minsList)

    let longest = Math.abs(minsList[minsList.length - 1] - minsList[0]);
    let min = Math.min(longest, 24 * 60 - longest);
    for(let i =0 ; i < minsList.length - 1; i ++) {
        let diff = Math.abs(minsList[i+ 1] - minsList[i]);
        diff = Math.min(diff, 24 * 60 - diff);
        if(diff < min) {
            min = diff;
        }
    }
    return min;
    
    
};