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
                    if(this.status !== PROMISE_STATUS_PENDING) return //答：这样就解决了
                    this.status = PROMISE_STATUS_REJECTED//问：这行语句在queue外面还是里面？外面的话，setTimeout内的promise执行失败。里面的话，promise里面先执行resolve后，状态不改变还能执行reject()
                    this.reason = reason
                    this.onRejectedFn.forEach((fn) => {
                        fn(this.reason)
                    })
                    this.onRejected(this.reason)
                })
            }
        }
        executor(resolve, reject)
    }
    then(onFulfilled, onRejected){
        // 解决方法：
        // 如果在then调用的时候，状态已经确定下来了
        if(this.status === PROMISE_STATUS_FULFILLED && onFulfilled){
            onFulfilled(this.value)
        }
        if(this.status === PROMISE_STATUS_REJECTED && onRejected){
            onRejected(this.reason)
        }
        if(this.status === PROMISE_STATUS_PENDING){
            this.onFulfilledFn.push(onFulfilled)
            this.onRejectedFn.push(onRejected)
        }
    }
}

const promise = new ccPromise((resolve, reject)=>{
    resolve('22222')
})
promise.then(res => {
    console.log(res,'第一次')
},err => {})
//不会，因为第一个promise已经执行完后会将promise的状态置为fulfilled或者rejected，不能再改变状态了
setTimeout(()=>{
    promise.then((res)=>{
        console.log(res,'第二次')
    })
},1000)
