/*
给定两个整数，分别表示分数的分子 numerator 和分母 denominator，以字符串形式返回小数。

如果小数部分为循环小数，则将循环的部分括在括号内。

示例 1:

输入: numerator = 1, denominator = 2
输出: "0.5"
示例 2:

输入: numerator = 2, denominator = 1
输出: "2"
示例 3:

输入: numerator = 2, denominator = 3
输出: "0.(6)"

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/fraction-to-recurring-decimal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
var fractionToDecimal = function(numerator, denominator) {

        let num = '';
        if(numerator* denominator < 0 ) {
            num = '-'
        }

        numerator = Math.abs(numerator)
        denominator = Math.abs(denominator)
        num = num + Math.floor(numerator / denominator);
        let y = numerator;
       

        if(y % denominator > 0) {
            num+= '.';
            let ylist = [];
            let ymap = {};
            while(1) {
                y = y % denominator * 10;

                let n = y % denominator;
                let d = Math.floor((y / denominator));
   
                if(n == 0) {
                    ylist.push(d)
                    num += ylist.join('');
                    break; 
                } else if(ymap[d + ',' + n]) {
                    //is loop
                    // ylist.push(d)
                    console.log(ylist, ymap)
                    let pre = ylist.slice(0, ymap[d + ',' + n] - 1);
                    let loop =  ylist.slice(ymap[d + ',' + n] - 1);
                    num += pre.join("") + '('+loop.join("")+')';
                    break;
                } else  {
                    ylist.push(d)
                    ymap[d + ',' + n] = ylist.length;
                } 
               
            }
           
        }
        return num;
       
};