/*
在一个由 'L' , 'R' 和 'X' 三个字符组成的字符串（例如"RXXLRXRXL"）中进行移动操作。一次移动操作指用一个"LX"替换一个"XL"，或者用一个"XR"替换一个"RX"。现给定起始字符串start和结束字符串end，请编写代码，当且仅当存在一系列移动操作使得start可以转换成end时， 返回True。

示例 :

输入: start = "RXXLRXRXL", end = "XRLXXRRLX"
输出: True
解释:
我们可以通过以下几步将start转换成end:
RXXLRXRXL ->
XRXLRXRXL ->
XRLXRXRXL ->
XRLXXRRXL ->
XRLXXRRLX
注意:

1 <= len(start) = len(end) <= 10000。
start和end中的字符串仅限于'L', 'R'和'X'。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/swap-adjacent-in-lr-string
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {string} start
 * @param {string} end
 * @return {boolean}
 */
var canTransform = function(start, end) {
    let str_from = start.replace(/X/g,"");
    let str_to = end.replace(/X/g, "");
    // console.log(start, str_from, end, str_to);
    if(str_from != str_to) {
        return false;
    }
   let t = 0;
   for(let i = 0; i < start.length; i++) {
       if(start[i] == "L") {
           for(t; t < end.length; t ++) {
               if(start[i] == end[t] ) {
                   if(i < t) {
                        // console.log('L', i, t);
                       return false;
                    }else {
                        t = t + 1;
                        break;
                    }
               } 
           }
       }
   }

    t = 0;
   for(let i = 0; i < start.length; i++) {
       if(start[i] == "R") {
           for(t; t < end.length; t ++) {
               if(start[i] == end[t] ) {
                   if(i > t) {
                    //    console.log('R', i, t);
                       return false;
                   } else {
                        t = t + 1;
                        break;
                    }
               } 
           }
       }
   }
   return true;
};