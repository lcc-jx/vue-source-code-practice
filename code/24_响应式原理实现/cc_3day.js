const obj = {
    name:'lcc',
    age:12
}
let activeReactiveFn = null
class Depend{
    constructor(){
        this.reactiveFn = new Set()
    }
    depend(){
        if(activeReactiveFn){
            this.reactiveFn.add(activeReactiveFn)
        }
    }
    notify(){
        this.reactiveFn.forEach(fn => {
            fn()
        })
    }

}
const depend = new Depend()
function watchFn(fn){
    activeReactiveFn = fn
    fn()
    activeReactiveFn = null 
}
const targetMap = new WeakMap()
function getDepend(target, key){
    let map = targetMap.get(target)
    if(!map){
        map = new Map()
        targetMap.set(target, map)
    }

    let depend = map.get(key)
    if(!depend){
        depend = new Depend()
        map.set(key,depend)
    }
    return depend
}

const objProxy = new Proxy(obj, {
    get(target, key, receiver){
        const depend = getDepend(target, key)
        depend.depend()
        return Reflect.get(target, key, receiver)
    },
    set(target, key, newValue, receiver){
        Reflect.set(target, key,newValue, receiver)
        const depend = getDepend(target, key)
        depend.notify()
    }
})

watchFn(function(){
    console.log(objProxy.name,'第一次访问obj的name属性')
})
watchFn(function(){
    console.log(objProxy.name,'第二次访问obj的name属性')
})
watchFn(function(){
    console.log(objProxy.age,'第一次访问obj的age属性')
})
watchFn(function(){
    console.log(objProxy.age,'第二次访问obj的age属性')
})

console.log('------')

objProxy.age = 10


