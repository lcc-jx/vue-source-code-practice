const obj = {
    name:'cc',
    age:18
}

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

// const depend = new Depend()
// 现在的问题就是要将对应属性与对应的depend建立联系-----①
let activeReactiveFn = null//创建全局的保存当前执行watchFn里的函数-----⑤
function watchFn(fn){
    activeReactiveFn = fn//----⑥
    // depend.addDepend(fn)
    fn()//-----②
    activeReactiveFn = null//----⑧
}

// 封装一个获取depend的函数
const targetMap = new WeakMap()
function getDepend(target,key){
    let map = targetMap.get(target)
    if(!map){
        map = new Map()
        targetMap.set(target,map)
    }
    let depend = map.get(key)
    if(!depend){
        depend = new Depend()
        map.set(key,depend)
    }
    return depend
}

const objProxy = new Proxy(obj, {
    get:function(target, property, receiver){
        // 调用watchFn里面的fn->访问包含对象的属性->从这里拿对应的target和key->获取对应的depend-----③
        const depend = getDepend(target,property)
        // 那现在怎么拿到对应的函数呢？------④
        depend.addDepend(activeReactiveFn)//-----⑦
        return Reflect.get(target, property, receiver)
    },
    set:function(target, property, newValue, receiver){
        Reflect.set(target, property, newValue, receiver)
        const depend = getDepend(target,property)
        depend.notify()//这里depend怎么获取呢？这时需要封装个函数
    }
})
watchFn(function(){
    console.log(objProxy.name,'第一个函数')
})
watchFn(function(){
    console.log(objProxy.name,'第二个函数')
})
watchFn(function(){
    console.log(objProxy.age,'第三个函数')
})

console.log('---------------------------改变值之前')

objProxy.age = 1