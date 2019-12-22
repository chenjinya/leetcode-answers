
/*
给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/3sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    
    let result = [];
    nums = nums.sort((a,b) => { return  a-b });
    let len = nums.length;
    let precheck = 0;
    let traget = 0;
    let pos = {};
    let sum2s = {};
    for(let k = 0; k<len; k ++ ) {
        if(!sum2s[traget - nums[k]]) {
            sum2s[traget - nums[k]] = k;
        }
    }
    for(let key in sum2s) {
        let n = sum2s[key]
        let i =0,j = len - 1;
        let p = traget - nums[n];
        // console.log(nums[i],nums[j],nums[k])
        while(i < j) {
            if(n == i) {
                i ++
                continue;
            } 
            if(n == j) {
                j --;
                 continue;
            }
            let sum = nums[i] + nums[j];
            if(sum == p) {
                let r = [nums[i],nums[j],nums[n]].sort((a,b) => {return a - b } );
                // let pos_s = [i,j,k].sort((a,b) => a - b)
                if(!pos[r.join(",")]){
                    pos[r.join(",")] = 1
                    result.push(r);
                }
                i ++;
                j --;
            }else if(sum > p) {
                j --;
            } else{
                i ++;
            }
            
        }
    }
    return result;
};