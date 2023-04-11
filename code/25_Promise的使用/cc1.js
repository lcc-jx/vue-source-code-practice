//在promise内部会立即执行传入的函数，传入的这个函数，被称之为 executor
// resolve:回调函数,在成功时会回调resolve函数
// reject:回调函数，在成功时会回调reject函数
const promise = new Promise((resolve,reject)=>{
    // console.log('promise传入的函数被自动执行了')
    resolve()
})

// 有了Promise，调resolve的时候进.then,调reject的时候进.catch,就不用再为回调函数命名
// 当然还有另一种：then(()=>{},()=>{}),第一个回调函数，会在Promise执行resolve函数时调用，第二个会在Promise执行reject的时候调用

// request.js
// 传入url，内部会发出网络请求
function requestData(url){
    //模拟网络请求
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            // 拿到请求结果
            // 拿到的是url，请求成功。否则失败
            if(url == 'coderwhy'){
                //成功
                let name = ['abc','cba','nba']
                resolve()
            }else{
                //失败
                let errMessage = '请求失败,url错误'
                reject()
            }
        }, 3000);
    })
}       

// main.js
const promise1 = requestData('why')
promise1.then(()=>{
    console.log('请求成功')
},()=>{
    console.log('请求失败')
})




