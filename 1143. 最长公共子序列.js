/*
给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列。

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。

若这两个字符串没有公共子序列，则返回 0。

 

示例 1:

输入：text1 = "abcde", text2 = "ace" 
输出：3  
解释：最长公共子序列是 "ace"，它的长度为 3。
示例 2:

输入：text1 = "abc", text2 = "abc"
输出：3
解释：最长公共子序列是 "abc"，它的长度为 3。
示例 3:

输入：text1 = "abc", text2 = "def"
输出：0
解释：两个字符串没有公共子序列，返回 0。
 

提示:

1 <= text1.length <= 1000
1 <= text2.length <= 1000
输入的字符串只含有小写英文字符。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-common-subsequence

*/

// 3 valid.

//优化，可以只保留上下两层的数组 
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    // console.log(text1,text2)
    if(text1 == text2) return text1.length;
    if(text1.length == 0 || text2.length == 0) return 0;

    let len1 = text1.length;
    let len2 = text2.length;

    let dp = [];
    for(let i = 0; i <= len1; i ++) {
         dp[i] = []
        for(let j = 0; j<= len2; j ++) {
           dp[i][j] = 0;
        }
    }
    for(let i = 1; i <= len1; i ++) {
        for(let j = 1; j<= len2; j ++) {
            if(text1[i - 1] == text2 [ j - 1]) {
                dp[i][j] = dp[i-1][j-1] + 1 ;
            } else {
                dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1]);
            }
        }
    }
    // console.log(dp);
    return dp[len1][len2];
};


//1 beyond time
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    
    let queue = [];
    let p1 = 0, p2 = 0;
    let max = 0;

    for(p1 =0; p1 < text1.length; p1 ++) {
         for(p2 =0; p2 < text2.length; p2 ++) {
             if(text1[p1] == text2[p2]) {
                queue.push({pos: [p1,p2], depth: 1});
                if(1 > max) max = 1;
                while(queue.length) {
                    let {pos, depth} = queue.shift();
                    for(let pp1 = pos[0] + 1; pp1 < text1.length; pp1 ++) {
                        for(let pp2 = pos[1] + 1; pp2 < text2.length; pp2 ++) {
                            if(text1[pp1] == text2[pp2]) {
                                queue.push({pos:[pp1,pp2], depth : depth +1})
                                if(depth + 1 > max) {
                                    max = depth + 1;
                                }
                            }
                        }
                    }
                }
             }
         }
        
    }
    return max;
};

//2 beyond time
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    // console.log(text1,text2)
    if(text1 == text2) return text1.length;
    if(text1.length == 0 || text2.length == 0) return 0;

    let len1 = text1.length;
    let len2 = text2.length;

    if(text1[len1 - 1] == text2[len2 - 1]) {
        return longestCommonSubsequence(text1.substr(0,  len1 - 1), text2.substr(0,len2 - 1)) + 1;
    } else {
        return Math.max(longestCommonSubsequence(text1.substr(0, len1 - 1), text2),longestCommonSubsequence(text1, text2.substr(0,len2 - 1)))
    }
};