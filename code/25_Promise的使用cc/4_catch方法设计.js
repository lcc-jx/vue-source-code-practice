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
        const defaultOnRejected = err => { throw err }
        onRejected = onRejected || defaultOnRejected
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
                if(onFulfilled){
                    this.onFulfilledFn.push(()=>{
                        try {
                            const value = onFulfilled(this.value)
                            resolve(value)
                        } catch (err) {
                            reject(err)
                        }
                    })
                }
                if(onRejected){
                    this.onRejectedFn.push(()=>{
                        try {
                            const reason = onRejected(this.reason)
                            resolve(reason)
                        } catch (err) {
                            reject(err)
                        }
                    })
                }
            }
        })
    }
    catch(onRejected){
        this.then(undefined, onRejected)
    }
}

const promise = new ccPromise((resolve, reject)=>{
    console.log("状态pending")
    reject('11111')
    // throw new Error('eee')
})
promise.then(res => {
    console.log('res',res)
}).catch(err => {
    console.log('err',err)
})