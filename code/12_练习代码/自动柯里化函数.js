function sum(num1, num2, num3){
    return sum1+sum2+sum3
}
sum.ccCurrying(10,20,30)
var ccCurrying = function(args){
    var fn = this
    if(args.length >= sum.length){
        fn(...args)
    }else{
        
    }
    
}


