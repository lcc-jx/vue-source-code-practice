const obj = {
    name:'cc',
    age:18
}
const info = {
    address:'合肥市'
}

// 用Proxy监听访问和设置
// 在设置值的时候调用一些函数

// 1、绑定函数到对应的对象属性上Map
class Depend{
    constructor(){
        this.reactiveFn = []
    }
    addDepend(fn){
        this.reactiveFn.push(fn)
    }
    notify(){
        this.reactiveFn.forEach(item => {
            item()
        })
    }
}


const depend = new Depend()
function watchFn(fn){
    depend.addDepend(fn)
}
watchFn(function(){
    console.log(objProxy.name,'第一个函数')
})
watchFn(function(){
    console.log(objProxy.name,'第二个函数')
})
watchFn(function(){
    console.log(objProxy.name,'第三个函数')
})

// 为对象设置代理
const objProxy = new Proxy(obj, {
    get:function(target, property, receiver){
        return Reflect.get(target, property, receiver)
    },
    set:function(target, property, newValue, receiver){
        Reflect.set(target, property, newValue, receiver)
        depend.notify()
    }
})

objProxy.name = 'lcc'
objProxy.age = 10

// obj对象
// name会对应一个depend对象,age会对应一个depend对象

const objMap = new Map()
objMap.set('name','nameDepend')//'nameDepend'伪代码
objMap.set('age','ageDepend')

const depend1 = objMap.get('name')
depend.notify()

// info对象
// address会对应一个depend对象
const infoMap = new Map()
infoMap.set('address','addressDepend')

// weakMap
const weakMap = new WeakMap()
weakMap.set(obj, objMap)
weakMap.set(info, infoMap)

// 若obj.name发生变化
const depend2 = weakMap.get(obj).get('name')
depend2.notify()

