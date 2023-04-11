function foo(){

}

//函数也是对象
//函数作为对象来说，它也是有[[prototype]]隐式原型
// console.log(foo.__proto__)//{}

// 函数它因为是个函数，所以它还会多出来一个显式原型属性（实实在在的属性）：prototype
// console.log(foo.prototype)//{}

var f1 = new foo()
var f2 = new foo()

// 在new的过程中会把foo的prototype属性赋给对象的原型

console.log(foo.prototype === f1.__proto__)
console.log(foo.prototype === f2.__proto__)

