function foo(){
    console.log('foo函数被执行了',this)
}
function sum(num1, num2, num3){
    console.log(num1,num2,num3)
}

Function.prototype.cBind = function(thisArg){
    var fn = this
    thisArg = thisArg ? Object(thisArg) : window
    thisArg.fn = fn
    return thisArg.fn
}

// foo.cBind()
// var bar = foo.cBind('abc')
// bar ()
var obj1 = sum.cBind('123')
obj1(10,20,30)
///详见老师的代码


