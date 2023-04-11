function foo(){
    console.log('foo函数被执行', this )
}

function sum(num1, num2){
    console.log('sum函数被执行',this)
    return num1 + num2
}

Function.prototype.cApply = function(thisArg,arr){
    var fn = this
    thisArg = thisArg ? Object(thisArg) : window
    thisArg.fn = fn
    var result = thisArg.fn(...arr)
    return result
}
// foo.cApply(123)
console.log(sum.cApply(123,[20,22]))