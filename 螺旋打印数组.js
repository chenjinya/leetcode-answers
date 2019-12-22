//螺旋打印数组

// 1 
let rows = 5;
let num = 0;
let arr = [];

for( let i = 0; i < rows; i++) {
    arr[i] = [];
    for( let j = 0; j < rows; j++) {
        arr[i][j] = 0;
        
    }
}

console.log(JSON.stringify(arr));

for( let i = 0; i < rows; i++) {
    for( let j= 0; j< rows; j++) {
        if(j >= i) {
            if( (j + 1) % 2 == 1) {
                arr[i][j] = (j + 1) * (j + 1)  - i;
            } else {
                arr[i][j] = j*j + 1  + i;
            }

        } else {
            if( (i + 1) % 2 == 1) {
                arr[i][j] = i * i + 1  + j;
            } else {
                arr[i][j] = (i + 1) * (i + 1)   - j;
            }
        }
    }
}

console.log((arr));

// 2

let rows = 5;
let num = 0;
let arr = [];

for( let i = 0; i < rows; i++) {
    arr[i] = [];
    for( let j = 0; j < rows; j++) {
        arr[i][j] = 0;
        
    }
}

console.log(JSON.stringify(arr));

for( let i = 1; i <= rows; i++) {

    if(i % 2 == 0) {
        for(let k = 0; k < i; k++) {
            arr[k][i - 1] = ++num
        }
        for(let k = i - 1 -1; k >= 0; k--) {
            arr[i - 1][k] = ++num
        }
    } else {
        for(let k = 0; k < i; k++) {
            arr[i - 1][k] = ++num
        }
        for(let k = i - 1 - 1; k >= 0; k--) {
            arr[k][i - 1] = ++num
        }
        
    }
}

console.log((arr));