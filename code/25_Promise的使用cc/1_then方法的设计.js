const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class Promise{
    constructor(executor){
        this.status = PROMISE_STATUS_PENDING
        this.value = ''
        this.reason = ''
        this.onFulfilledFn = []
        this.onRejectedFn = []
        const resolve = (value) =>{
            if(this.status === PROMISE_STATUS_PENDING){
                this.status = PROMISE_STATUS_FULFILLED
                queueMicrotask(()=>{
                    this.value = value
                    this.onFulfilledFn.forEach((fn) => {
                        fn(this.value)
                    })
                })
            }
        }
        const reject = (reason) =>{
            if(this.status === PROMISE_STATUS_PENDING){
                this.status = PROMISE_STATUS_REJECTED
                queueMicrotask(()=>{
                    this.reason = reason
                    this.onRejectedFn.forEach((fn) => {
                        fn(this.value)
                    })
                    this.onRejected(this.reason)
                })
            }
        }
        executor(resolve, reject)
    }
    then(onFulfilled, onRejected){
        this.onFulfilledFn.push(onFulfilled)
        this.onRejectedFn.push(onRejected)
    }
}

const promise = new Promise((resolve, reject)=>{
    resolve('22222')
})
// 现在多次调用then方法，只会执行第二个，因为第二个调用的时候将第一个onFulFilled覆盖了，解决方法：就是将onFulfilled保存到一个数组中
promise.then(res => {
    console.log(res,'第一次')
},err => {

})

promise.then((res)=>{
    console.log(res,'第二次')
})
