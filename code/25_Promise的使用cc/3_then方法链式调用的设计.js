// 现在是：如果用setTimeout包裹一个promise，那会不会执行
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class ccPromise{
    constructor(executor){
        this.status = PROMISE_STATUS_PENDING
        this.value = ''
        this.reason = ''
        this.onFulfilledFn = []
        this.onRejectedFn = []
        const resolve = (value) =>{
            if(this.status === PROMISE_STATUS_PENDING){
                queueMicrotask(()=>{
                    if(this.status !== PROMISE_STATUS_PENDING) return
                    this.status = PROMISE_STATUS_FULFILLED
                    this.value = value
                    this.onFulfilledFn.forEach((fn) => {
                        fn(this.value)
                    })
                })
            }
        }
        const reject = (reason) =>{
            if(this.status === PROMISE_STATUS_PENDING){
                queueMicrotask(()=>{
                    if(this.status !== PROMISE_STATUS_PENDING) return
                    this.status = PROMISE_STATUS_REJECTED
                    this.reason = reason
                    this.onRejectedFn.forEach((fn) => {
                        fn(this.reason)
                    })
                })
            }
        }
        try {
            executor(resolve, reject)
        } catch (err) {
            reject('aaa')
        }
    }
    then(onFulfilled, onRejected){
        return new ccPromise((resolve, reject) => {
            if(this.status === PROMISE_STATUS_FULFILLED && onFulfilled){
                try {
                    const value = onFulfilled(this.value)
                    resolve(value)
                } catch (err) {
                    reject(err)
                }
            }
            if(this.status === PROMISE_STATUS_REJECTED && onRejected){
                try {
                    const reason = onRejected(this.reason)
                    resolve(reason)
                } catch (err) {
                    reject(err)
                }
            }
            if(this.status === PROMISE_STATUS_PENDING){
                try {
                    this.onFulfilledFn.push(()=>{
                        const value = onFulfilled(this.value)
                        resolve(value)
                    })
                } catch (err) {
                    reject(err)
                }
                try {
                    this.onRejectedFn.push(()=>{
                        const reason = onRejected(this.reason)
                        resolve(reason)
                    })
                } catch (err) {
                    reject(err)
                }
            }
        })
    }
}

const promise = new ccPromise((resolve, reject)=>{
    // resolve('22222')
    // reject('aaa')
    throw new Error('eee')
})
promise.then(res => {
    console.log('res1',res)
    return '1111'
    // throw new Error('eee')
}, err => {
    console.log('err1',err)
    return '222222'
}).then(res => {
    console.log('res2',res)
}, err => {
    console.log('err2',err)
})