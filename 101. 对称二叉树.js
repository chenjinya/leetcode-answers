/*
给定一个二叉树，检查它是否是镜像对称的。

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

    1
   / \
  2   2
 / \ / \
3  4 4  3
但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

    1
   / \
  2   2
   \   \
   3    3
说明:

如果你可以运用递归和迭代两种方法解决这个问题，会很加分。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/symmetric-tree
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
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if(!root) { return true; }
    if(!root.left && !root.right) {
        return true;
    }
    //递归
    return walk(root.left, root.right);
    let node = root;
    let left = node.left;
    let right = node.right;
    let leftStack = [];
    leftStack.push(left);
    let rightStack = [];
    rightStack.push(right);
    while(rightStack.length && leftStack.length) {
        left = leftStack.pop();
        right = rightStack.pop();
        // console.log(left, right)
        if(!left && !right) {
            continue;
        }
        if(!left && right || left && !right || left.val !== right.val) {
            return false;
        }
        leftStack.push(left.right);
        leftStack.push(left.left);
        rightStack.push(right.left);
        rightStack.push(right.right);
    }
    if(rightStack.length || leftStack.length) {
        return false;
    }

    return true;
   
};

//递归
var walk = function(treeL, treeR) {
    if(!treeL != !treeR) { return false; }
    if(!treeL && !treeR) {
        return true;
    }
    if(treeL.val != treeR.val) {
        return false;
    } 
    return walk(treeL.left, treeR.right) && walk(treeL.right, treeR.left)
}

