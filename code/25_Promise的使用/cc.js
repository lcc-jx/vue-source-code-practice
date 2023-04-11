// 1.异步请求的处理方式
/**
 * 这种方法的弊端：
 * 1、如果是我们自己封装的requestData，那么我们在封装的时候必须要自己设计好callBack的名称，并且使用好
 * 2、如果我们使用的是别人封装的requestData或者是一些第三方库，那么我们必须去看别人的源码或者文档，才知道他这个函数需要
 */
// request.js
function requestData(url, successCallback, failureCallback){
    // 传入url，内部会发出网络请求
    //模拟网络请求
    setTimeout(() => {
        // 拿到请求结果
        // 拿到的是url，请求成功。否则失败
        if(url == 'coderwhy'){
            //成功
            let name = ['abc','cba','nba']
            successCallback(name)
        }else{
            //失败
            let errMessage = '请求失败,url错误'
            failureCallback(errMessage)
        }

    }, 3000);

}

// main.js
requestData('coderwhy', (res)=>{
    console.log(res)
},(err)=>{
    console.log(err)
})

// 更好的方案：承诺(promise)
function requestData2(){
    return '承诺'
}