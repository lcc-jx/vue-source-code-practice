const obj = {
    name:'lcc',
    age:12
}
const info ={
    address:'合肥市'
}

class Depend{
    constructor(){
        this.reactiveFn = []
    }
    addDepend(fn){
        this.reactiveFn.push(fn)
    }
    notify(){
        this.reactiveFn.forEach(fn => {
            fn()
        })
    }
}

let activeReactiveFn = null
// const depend = new Depend()
function watchFn(fn){
    activeReactiveFn = fn
    fn()
    activeReactiveFn = null
    // depend.addDepend(fn)
}

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
        map.set(key, depend)
    }
    return depend
}
const objProxy = new Proxy(obj, {
    get(target, key, receiver){
        let depend = getDepend(target, key)
        depend.addDepend(activeReactiveFn)
        return Reflect.get(target, key, receiver)
    },
    set(target, key, newValue, receiver){
        Reflect.set(target, key, newValue, receiver)
        let depend = getDepend(target, key)
        depend.notify()
    }
})
watchFn(function(){
    console.log(objProxy.name,'第一条name执行函数')
})
watchFn(function(){
    console.log(objProxy.name,'第二条name执行函数')
})
watchFn(function(){
    console.log(objProxy.age,'第一条age执行函数')
})
watchFn(function(){
    console.log(objProxy.age,'第二条age执行函数')
})


// console.log(objProxy.name)


objProxy.name = 'lcc'
// 卡在：获取depend,再将depend里加函数
