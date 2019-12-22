const PPromise = function (fn) {

    this._status = 'pending';
    this._fullfilledCallbacks = [];
    this._rejectedCallbacks = [];
    this.value;
    this.reason;
    if (typeof fn === 'function') {
        try {
            fn.call(this, this._resolve.bind(this), this._reject.bind(this));
        } catch (e) {
            this.reject(e)
        }

    }


}

PPromise.prototype = {
    resolve: function () {
        return new PPromise((resolve) => {
            resolve(this.value)
        });
    },
    reject: function () {
        return new PPromise((resolve, reject) => {
            resolve(this.reject)
        });
    },
    _resolve: function (value) {
        setTimeout(() => {
            if (this._status == 'pending') {
                this._status == 'fullfilled';
                this.value = value;
                for (let fn of this._fullfilledCallbacks) {
                    console.log("_resolve", this.value);
                    fn(this.value);
                }
            }
        }, 0)

    },
    _reject: function (reason) {

        setTimeout(() => {
            if (this._status == 'pending') {
                this._status == 'rejected';
                this.reason = reason;
                for (let fn of this._rejectedCallbacks) {
                    fn(this.reason);
                }
            }
        }, 0)

        return this;

    },
    then: function (onFulfilled, onRejected) {

        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
        onRejected = typeof onRejected === "function" ? onRejected : reason => {
            throw reason;
        };
        console.log('then: status: ', this._status);
        if (this._status === 'fullfilled') { // 成功态
            let promise2 = new PPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        this.resolvePromise(promise2, x, resolve, reject); // 新的promise resolve 上一个onFulfilled的返回值
                    } catch (e) {
                        reject(e); // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
                    }
                });
            })
            return promise2
        } else if (this._status === 'rejected') { // 成功态
            let promise2 = new PPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        this.resolvePromise(promise2, x, resolve, reject); // 新的promise resolve 上一个onFulfilled的返回值
                    } catch (e) {
                        reject(e); // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
                    }
                });
            })
            return promise2

        } else {
            let promise2 = new PPromise((resolve, reject) => {

                this._fullfilledCallbacks.push(() => {
                    try {
                        let x = onFulfilled(this.value);
                        console.log("then push", x, resolve, reject)
                        this.resolvePromise(promise2, x, resolve, reject); // 新的promise resolve 上一个onFulfilled的返回值
                    } catch (e) {
                        reject(e); // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
                    }
                })
                this._rejectedCallbacks.push(() => {
                    try {
                        let x = onRejected(this.reason);
                        this.resolvePromise(promise2, x, resolve, reject); // 新的promise resolve 上一个onFulfilled的返回值
                    } catch (e) {
                        reject(e); // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
                    }
                })
            })
            return promise2

        }
    },
    catch: function (onRejected) {
        return this.then(null, onRejected);
    },
    resolvePromise: function (promise2, x, resolve, reject) {
        if (promise2 === x) {
            throw new Error('TypeError: same promise');
        }
        console.log('resolvePromise', x instanceof PPromise ? x._status : x);
        let called = false; // 避免多次调用

        if (x instanceof PPromise) {
            if (x._status === 'pending') {
                x.then(y => {
                    this.resolvePromise(promise2, y, resolve, reject);
                }, r => {
                    this.resolvePromise(promise2, r, resolve, reject);
                })
            } else {
                x.then(resolve, reject);
            }
        } else if (x != null && ((typeof x === 'object') || (typeof x === 'function'))) {
            try { // 是否是thenable对象（具有then方法的对象/函数）
                let then = x.then;
                if (typeof then === 'function') {
                    then.call(x, y => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    }, reason => {
                        if (called) return;
                        called = true;
                        reject(reason);
                    })
                } else { // 说明是一个普通对象/函数
                    resolve(x);
                }
            } catch (e) {
                if (called) return;
                called = true;
                reject(e);
            }
        } else {
            resolve(x);
        }


    }
}





let p = function () {
    return new PPromise((resolve, reject) => {
        setTimeout(() => {
            console.log("No Money");
            resolve("200 ok")
        }, 30);
        return "I'm ok";
    })
}







// let p = function(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("hahahah");
//             resolve("200 ok")
//             // reject('400 Error');
//         },1000);
//     })
// }
console.log(p, typeof p);
let pp = p();
console.log(pp, typeof pp, pp.prototype);

let a = pp.then((d) => {
    console.log('then', d)
    return new PPromise((resolve) => {
        console.log("hahhaha")
        resolve("will next")
    })
}, (e) => console.error(e)).then((d) => {
    console.log('next then', d)
}, (e) => console.error(e))