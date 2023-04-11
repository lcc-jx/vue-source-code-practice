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

const depend = new Depend()
function watchFn(fn){
    depend.addDepend(fn)
}

// 封装一个获取depend的函数
const targetMap = new WeakMap()
function getDepend(target,key){
    let map = targetMap.get(target)
    // 如果还没有创建这个map呢？创建并且将map与targetMap建立联系
    if(!map){
        map = new Map()
        targetMap.set(target,target[key])
    }

    // 根据key获取对应的depend
    let depend = map.get(key)
    // 但是如果还没创建这个depend呢，创建，并且将属性与depend建立map联系
    if(!depend){
        depend = new Depend()
        map.set(key,depend)
    }
    return depend
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

const objProxy = new Proxy(obj, {
    get:function(target, property, receiver){
        return Reflect.get(target, property, receiver)
    },
    set:function(target, property, newValue, receiver){
        Reflect.set(target, property, newValue, receiver)
        const depend = getDepend(target,property)
        depend.notify()//这里depend怎么获取呢？这时需要封装个函数
    }
})

objProxy.name = 'lcc'
objProxy.age = 10