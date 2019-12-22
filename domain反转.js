// domain 反转
let str = "www.baidu.com"

const rev_domain_1 = function(domain){
    let str = domain;
    let rev = '';
    let arr = str.split(".");
    let arr_rev = [];
    while(arr.length >0) {
        arr_rev.push(arr.pop());
    }

    console.log(arr_rev.join("."));
}

const rev_domain_2 = function(domain){
    let pointer = 0;
    let tmp_str = '',rev_str = '';
   
    while(pointer < domain.length) {
        if(domain[pointer] === '.') {
            rev_str = tmp_str + (rev_str === '' ? rev_str : '.' + rev_str);
            tmp_str = '';
        } else {
            tmp_str += domain[pointer];
        }
        pointer ++;
    }
    rev_str = tmp_str + '.' +  rev_str;

    console.log(rev_str);
}