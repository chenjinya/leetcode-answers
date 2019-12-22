/*
给定一个二叉树，返回所有从根节点到叶子节点的路径。

说明: 叶子节点是指没有子节点的节点。

示例:

输入:

   1
 /   \
2     3
 \
  5

输出: ["1->2->5", "1->3"]

解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-paths
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
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    if(!root) return [];
    let paths = [];
    walk(root, "",paths);
    return paths;
    
};

var walk = function(root, path, paths){
    if(!root) return null;
    //  console.log(root.val);
     if(path) {
        path = path + '->' + root.val;
     } else {
         path = '' + root.val;
     }
    
    if(!root.left && !root.right) {
        paths.push(path);
    } else {
        walk(root.left,path, paths)
        walk(root.right,path, paths)
    }
     
}

//2
var binaryTreePaths = function(root) {
    if(!root) return [];
    let paths = [];

    let stack = [];
    let path_stack = [];
    let path = '' + root.val;
    stack .push(root)
    path_stack.push(path);
    while(stack.length > 0) {
        let node = stack .pop();
        let path = path_stack.pop();
       
       if(!node.left && !node.right) {
            paths.push(path);
            continue;
       }
        if(node.right) {
            stack.push(node.right);
            path_stack.push(path + '->' + node.right.val);
        }
        
        if(node.left) {
            stack.push(node.left)
            path_stack.push(path + '->' + node.left.val);
           
        }
        
       
    }
    return paths;
    
};