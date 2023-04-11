function foo(){
    console.log('foo函数被执行', this )
}

function sum(num1, num2){
    console.log('sum函数被执行')
    return num1 + num2
}

// foo.call()

// foo.ccall()
// sum.cCall()

// 1.如果想要每个函数都能调用call函数，肯定不能每次有个函数就调用一次，应该在全局加一个

// 应该给所有的函数加一个cCall方法
// Function.prototype.cCall = function(){
//     console.log('cCall被调用了')
// }

// foo.cCall() // cCall被调用了

// 2、但是foo函数并没有被执行，所以我们需要在Function里面执行foo
// 问题是，我们怎么获取到哪一个函数执行了cCall
// 首先我们可以看到，foo.cCall()是属于隐式调用，所以this指向foo，所以我们可以这样做

// Function.prototype.cCall = function(thisArg){
//     // 1.获取需要被执行的函数
//     var fn = this 

//     // 2、调用需要被执行的函数
//     thisArg.fn = fn
//     thisArg.fn()
//     delete thisArg.fn
// }
// foo.cCall({})
// 3、此时又有一个新问题，如果里面传入的是123，"abc" 或者布尔值呢，这时候我们需要把它转成对应的类型对象，以123举例：
// 有三种方法：
//      1、Number(123)
//      2、var numObj = new Number(123)
//      3、Object(123)
// 因此我们用Object更加的快捷方便，他会把所传入的值转成对应的对象，并且传入对象时返回的是原对象，这就可以很好地应用到我们现在所需

// Function.prototype.cCall = function(thisArg){
//     // 获取需要被执行的函数
//     var fn = this 

//     // 对thisArg转成对象类型，防止传入的是非对象类型
//     thisArg = Object(thisArg)

//     // 调用需要被执行的函数
//     thisArg.fn = fn
//     thisArg.fn()
//     delete thisArg.fn
// }
// foo.cCall(null)

// 4、还有一种edge case需要处理，就是当传入null / undefined的时候会返回的是window对象
// 解决方案：将48行改为 thisArg = thisArg ? Object(thisArg) : window

// 5、如果像sum函数那样需要传num1,num2......等参数呢？
// 使用ES6的剩余参数
Function.prototype.cCall = function(thisArg, ...args){
    // 获取需要被执行的函数
    var fn = this 

    // 对thisArg转成对象类型，防止传入的是非对象类型
    // thisArg = Object(thisArg)
    thisArg = thisArg ? Object(thisArg) : window

    // 调用需要被执行的函数
    thisArg.fn = fn
    var result = thisArg.fn(...args)
    delete thisArg.fn
    // 最终结果的返回
    return result
}
var result = sum.cCall({},20,30)
console.log(result)




