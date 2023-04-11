// 总结：我们每个对象都有个[[prototype]],这个属性我们可以称之为对象的原型（隐式原型）


var obj = {name:'cc'}//看似只有一个属性，但每个其实都隐藏了一个属性[[prototype]]
var info = {}
// 1、解释下原型的概念和看一下原型
//早期的ECMA是没有规范如何去查看[[prototype]]

// 很多   浏览器  （不是全部浏览器）给我们对象中 提供了一个属性，让我们开发可以查看这个原型对象
// __proto__
// console.log(info.__proto__)

// ES5之后提供的Object.getPrototypeOf
// console.log(Object.getPrototypeOf(obj))


// 2、原型有什么作用？
// 当我们从一个对象中获取一个属性时，它会触发[[get]]操作
// 1、在当前对象去查找对应的属性，如果找到就直接使用
// 2、如果没有找到，那么会沿着它的原型去查找

obj.__proto__.age = 18

console.log(obj.age)









