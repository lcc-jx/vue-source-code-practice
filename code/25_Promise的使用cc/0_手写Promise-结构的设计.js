const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class Promise{
    constructor(executor){
        this.status = PROMISE_STATUS_PENDING
        this.value = ''
        this.reason = ''
        const resolve = (value) =>{
            if(this.status === PROMISE_STATUS_PENDING){
                this.status = PROMISE_STATUS_FULFILLED
                this.value = value
                console.log('resolve函数被调用')
            }
        }
        const reject = (reason) =>{
            if(this.status === PROMISE_STATUS_PENDING){
                this.status = PROMISE_STATUS_REJECTED
                this.reason = reason
                console.log('reject函数被调用')
            }
        }
        executor(resolve, reject)
    }
}

const promise = new Promise((resolve, reject)=>{
    resolve('111111')
})
