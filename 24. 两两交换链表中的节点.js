/*
给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

 

示例:

给定 1->2->3->4, 你应该返回 2->1->4->3.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/swap-nodes-in-pairs
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
 * @param {ListNode} head
 * @return {ListNode}
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var swapPairs = function(head) {
    if(head == null) return null;
    let list = new ListNode(0);
    list.next = head;
    recursion(list);
    return list.next;
}

var recursion = function(pre) {
    if(!pre.next || !pre.next.next) return;
    let node = pre.next;
    let sub = node.next;
    sub = node.next;
    node.next = sub.next;
    sub.next = node;
    pre.next = sub;
    pre = node;
    recursion(pre);
}

var swapPairsTraverse = function(head) {
    let node = head;
    let pre = null;
    let sub = null;
    let list = new ListNode(0);
    list.next = head;
    pre = list;
    while(node) {
        sub = node.next;
        if(!sub) break;
        node.next = sub.next;
        sub.next = node;
        pre.next = sub;
        pre = node;
        node = node.next;
    }
    return list.next;
};