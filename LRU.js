// LRU Least recently used


const ListNode = function(key, value){
    return {
        key: key,
        value: value,
        next: null,
        prev: null,
    }
}
const LRUCache = function(){}
LRUCache.prototype = {
    capacity: 5,
    initList: function(){
        let head = new ListNode('head', 0)
        let tail = new ListNode('tail', 0)
        head.next = tail;
        tail.prev = head;
        this.head = head;
        this.tail = tail
    },
    get: function(key){
        let node = this.hash[key];
        if(undefined === node || null === node) {
            return null;
        }
        if(node !== this.head) {
            this.moveHeadListNode(key);
        }
        return node;
    },
    put: function(key,value){
        let node = this.hash[key];
        if(node) {
            this.moveHeadListNode(key);
        } else {
            if(this.length + 1 > this.capacity) {
                this.removeTailNode()
            }

            node = new ListNode(key, value);

            this.head.prev = node;
            node.next = this.head;
            node.prev = null;
            this.head = node;
            this.hash[key] = node;
            this.length ++;
           
        }
    },
    removeTailNode: function(){
        let tail = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
        //delete
        this.hash[tail.key] = null
        tail = null;
        this.length --;
        console.log('remove tail');
       
    },
    moveHeadListNode: function(key){
        let node = this.hash[key];
        if(undefined === node || null === node) {
            return null;
        }
        node.prev.next = node.next;
        node.next.prev = node.prev;

        this.head.prev = node;
        node.next = this.head;
        node.prev = null;
        this.head = node;
         console.log('move key to head');

    },
    hash: {},
    length: 0,

    head: null,
    tail: null,
}

let lru = new LRUCache();
lru.initList()
console.log(lru);

lru.put("key1", 1)
lru.put("key2", 2)
lru.put("key3", 3)
lru.put("key4", 4)
lru.put("key5", 5)
lru.put("key6", 6)
