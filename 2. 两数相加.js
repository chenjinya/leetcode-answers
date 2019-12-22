/*
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/add-two-numbers
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
var addTwoNumbers = function(l1, l2) {

    let node1 = l1;
    let node2 = l2;
   
	let header=null,node = null;
    let carry = 0;

    while(node1 || node2) {
    	let sum_number = parseInt(node1 ? node1.val : 0 ) + parseInt(node2 ? node2.val : 0) + parseInt(carry);
        carry = 0;
        if(sum_number > 9 ){
           carry = 1;
           sum_number = sum_number - 10;
        }

        if(header === null) {
            header =  new ListNode(sum_number);
            node = header;
        }
        else {
            let next = new ListNode(sum_number)
            node.next = next;
            node = next;
        }
        
        if(node1) node1 = node1.next;
        if(node2) node2 = node2.next;
    }
    

	if(carry ==1) {
	    let next = new ListNode(1)
        node.next = next;
        node = next;
	}
	
    return header;
};