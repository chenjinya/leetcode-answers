
/*
给定一个二叉树，编写一个函数来获取这个树的最大宽度。树的宽度是所有层中的最大宽度。这个二叉树与满二叉树（full binary tree）结构相同，但一些节点为空。

每一层的宽度被定义为两个端点（该层最左和最右的非空节点，两端点间的null节点也计入长度）之间的长度。

示例 1:

输入: 

           1
         /   \
        3     2
       / \     \  
      5   3     9 

输出: 4
解释: 最大值出现在树的第 3 层，宽度为 4 (5,3,null,9)。
示例 2:

输入: 

          1
         /  
        3    
       / \       
      5   3     

输出: 2
解释: 最大值出现在树的第 3 层，宽度为 2 (5,3)。
示例 3:

输入: 

          1
         / \
        3   2 
       /        
      5      

输出: 2
解释: 最大值出现在树的第 2 层，宽度为 2 (3,2)。
示例 4:

输入: 

          1
         / \
        3   2
       /     \  
      5       9 
     /         \
    6           7
输出: 8
解释: 最大值出现在树的第 4 层，宽度为 8 (6,null,null,null,null,null,null,7)。
注意: 答案在32位有符号整数的表示范围内。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximum-width-of-binary-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var widthOfBinaryTree = function(root) {
    let queue = [];
    queue.push([root,1,1])
    let num = 0,count = 1, max = 1, depth = 1;
    while(queue.length > 0) {
        let item = queue.shift();
        let node = item[0];
        let pos = item[2]
        if(node.left) {
            queue.push([node.left, depth, pos * 2 ])
        } 
        if(node.right) {
            queue.push([node.right, depth, pos* 2+1 ])
        }
        
        num ++;
        if(num == count) {
            num = 0;
            depth ++;
            count = queue.length;
            if(queue.length > 0) {
                let left = queue[0];
                let right = queue[queue.length - 1];
                if(right[2] - left[2] + 1 > max) {
                    max = right[2] - left[2]+ 1 ;
                }
            }
           
        }
    }
    return max
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var widthOfBinaryTree = function(root) {
    let queue = [];
    queue.push(root)
    let num = 0,count = 1, max = 1;;
    while(queue.length > 0) {
        let node = queue.shift();
        
        queue.push(node == null ? null : node.right)
        queue.push(node == null ? null : node.left)
        num ++;
        if(num == count) {
            num = 0;
            let queue_copy = queue;
            while(queue_copy.length >0 && queue_copy[0] == null) {
                queue_copy.shift();
            }
            while(queue_copy.length >0 && queue_copy[queue.length - 1] == null) {
                queue_copy.pop();
            }
            
            count = queue.length;
            count_copy = queue_copy.length;
            if(count_copy > max) {
                max = count_copy;
            }
        }
    }
    return max
};