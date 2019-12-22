// 单向链表反转

const ListNode = function(key, value){
    return {
        key: key,
        value: value,
        next: null,
    }
}

let head = new ListNode(0,0);
let curr = head;
for(let i = 1; i <= 5; i++) {
    let node =new ListNode(i,i);
    curr.next = node;
    curr = node;
}

console.log(head);

const revList = function(list) {
    let pointer = list;
    let rev = null;
    while(pointer) {
        let node = pointer;
        // console.log(rev)
        pointer = pointer.next;
        node.next = rev;
        rev = node;
       
    }
    return rev;
}

revList(head)