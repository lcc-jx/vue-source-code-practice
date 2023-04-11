var obj = {
    name:'cc'
}

console.log(obj.__proto__ === Object.prototype)//true

// 对象里面是有一个__proto__对象：隐式原型对象

// Foo是一个函数，那么他会有一个显式原型对象:Foo.prototype
function Foo(){

}
// 但是函数其实也是一个对象，所以Foo也会有个隐式原型对象：Foo.__proto__
    // 那么Foo又是由谁创建出来的呢？
    // Foo是由new Function()创建出来的
    // 所以 var Foo = new Function()就相当于上面的代码


// Foo.prototype与Foo.__proto__相等吗？
// 答案：不等
// Foo.prototype是指向Foo原型对象
// Foo是new Function new出来的，所以Foo.__proto__指向的是Function函数的原型对象（Object是Function的父类）
// 特殊：Function.prototype === Function.__proto__




