const foo = {
    name:'cc',
    age:18
}
class Depend {
    constructor(){
        this.reactiveFns = new Set()
    }
    notify(){
        this.reactiveFns.forEach(fn => {
            fn()
        })
    }
    addDepend(){
        this.reactiveFns.add(reactiveFn)
    }
}
// const depend = new Depend()
let reactiveFn = null
function watchFn(fn){
    reactiveFn = fn
    fn()
    reactiveFn = null
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
        map.set(key, depend)
    }
    return depend
}

const objProxy = new Proxy(foo,{
    get(target, key, receiver){
        const depend = getDepend(target, key)
        depend.addDepend()
        return Reflect.get(target, key, receiver)
    },
    set(target, key, newValue, receiver){
        Reflect.set(target, key, newValue, receiver)
        const depend = getDepend(target, key)
        depend.notify()
    }
})

watchFn(function(){
    console.log('监听到name啦' + objProxy.name)
})
watchFn(function(){
    console.log('监听到age啦' + objProxy.age)
})

objProxy.name = 'lcc'
// objProxy.age = 12

 

