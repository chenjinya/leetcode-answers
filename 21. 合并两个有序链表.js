/*
将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

示例：

输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-two-sorted-lists
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    let head = new ListNode(0);
    head.next  = null;
    let nodeN = head;
    let node1 = l1;
    let node2 = l2;
    while(node1 && node2) {
        // console.log(node1.val, node2.val);
        if(node1.val <= node2.val) {
            nodeN.next = node1;
            node1 = node1.next;
        } else {
            nodeN.next = node2;
            node2 = node2.next;
        }
        nodeN = nodeN.next;
    }
    
    if(node2){
        nodeN.next = node2;
    }    
    if(node1){
        nodeN.next = node1;
    }

    return head.next;
};
