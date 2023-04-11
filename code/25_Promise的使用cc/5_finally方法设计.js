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
    finally(onFinally){
        this.then(()=>{
            onFinally()
        },()=>{
            onFinally()
        })
    }
}

const promise = new ccPromise((resolve, reject)=>{
    console.log("状态pending")
    resolve('eeeee')
})
promise.then(res => {
    console.log('res1',res)
    return '22222'
}).then(err => {
    console.log('res2',err)
}).finally(()=>{
    console.log('finally函数调用')//现在的问题是，reject会正确执行，但是resolve不会正确执行了
})