// 如果参数不确定的情况下，可以这样接收，可以叫做ES6的剩余参数
function sum(...nums){
    console.log(nums)
}

sum(10)//[10]
sum(10, 20)//[10,20]
sum(10, 20, 30)//[10,20,30]
