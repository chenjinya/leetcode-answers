let arr= [6,2,4,7,3,5,8,9,1,2,5,4,7,6,8]

const swap = (_arr, i,j) => {
    let tmp = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = tmp;
    return _arr;
}

// 冒泡排序
const bubbleSort = (list) => {
    let len = list.length;
    let hasSwp = false;
    for(let i = 0; i < len - 1; i++) {
        for(let j = 0 ; j < len - 1; j ++) {
            if(list[j] > list[j + 1]) {
                list = swap(list, j, j + 1)
                hasSwp = true;
            }
        }
        if(false == hasSwp) {
            break;
        }
    }
    console.log(list)
    return list;
}


// 选择排序
const ChoosenSort = (list) => {
    let len = list.length;

    for(let i = 0; i < len - 1; i++) {
        for(let j = i + 1; j < len; j ++) {
            if(list[i] > list[j]) {
                list = swap(list, i, j)
            }
        }
    }
    console.log(list)
    return list;
}

// 快速排序
let arr= [6,2,4,7,3,5,8,9,1,2,5,4,7,6,8]
let step = 0;
const FastSort = (list, from, to) => {

    let sorted_list = [];
    let left = 0;
    let right = 0;
    let flag = 0;
    console.log("hah list", list.slice(from, to))

    for(let i = from; i < to; i++) {
        flag += list[i];
    }

    if(from + 1 >= to) return false;
    flag  = (flag / (to - from));
    if(step > 10) {
        return false;
    }
    step ++;
    for(let i = from; i < to; i++) {
        if(list[i] > flag) {
            sorted_list.push(list[i])
            right ++;
        } else {
            sorted_list.unshift(list[i])
            left ++;
        }
    } 
    // console.log('from', from, 'to', to, 'flag', flag)
    // console.log('left', list.slice(0, from))
    console.log('sort', sorted_list)
    // console.log('right', list.slice(to))

    console.log('left count', left,'right count',  right);
    let result_list = [].concat(list.slice(0, from ), sorted_list , list.slice(to - 1));
    if(sorted_list.length > 2) {
        result_list = FastSort(result_list, from, from + left);
        result_list = FastSort(result_list, from + left, to);
    }
    
    // console.log('result', result_list)
   


    return result_list;
}


