/*
给定一棵二叉树，返回所有重复的子树。对于同一类的重复子树，你只需要返回其中任意一棵的根结点即可。

两棵树重复是指它们具有相同的结构以及相同的结点值。

示例 1：

        1
       / \
      2   3
     /   / \
    4   2   4
       /
      4
下面是两个重复的子树：

      2
     /
    4
和

    4
因此，你需要以列表的形式返回上述重复子树的根结点。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/find-duplicate-subtrees
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
 * @return {TreeNode[]}
 */

var findDuplicateSubtrees = function(root) {
    if(!root) return [];
    let pathMap = {};
    let isLeaft = findLeafPath(root,  pathMap);
    let same = [];
    for(let k in pathMap) {
        if(pathMap[k].same == 1) {
            same.push(pathMap[k].node)
        }
    }
    same.sort(() => 1);
    return same;
};

const findLeafPath = function(tree, map) {
    if(!tree) return '';
    let path = tree.val;
    path += ',' + findLeafPath(tree.left, map) + ',' + findLeafPath(tree.right, map);
    map[path] = {
        node: tree,
        same: map[path] ? 1 : 0
    };
    return path;
}