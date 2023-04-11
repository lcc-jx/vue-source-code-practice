const obj = {
    name:'cc',
    age:18
}
let activeReactiveFn = null
class Depend{
    constructor(){
        this.reactiveFn = []
    }
    // addDepend(fn){
    //     this.reactiveFn.push(fn)
    // }
    depend(){
        if(activeReactiveFn){
            this.reactiveFn.push(activeReactiveFn)
        }
    }
    notify(){
        this.reactiveFn.forEach(item => {
            item()
        })
    }
}

function watchFn(fn){
    activeReactiveFn = fn
    fn()
    activeReactiveFn = null
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
        map.set(key,depend)
    }
    return depend
}

const objProxy = new Proxy(obj, {
    get:function(target, property, receiver){
        const depend = getDepend(target,property)
        // depend.addDepend(activeReactiveFn)  不希望在这用到activeReactiveFn
        depend.depend()
        return Reflect.get(target, property, receiver)
    },
    set:function(target, property, newValue, receiver){
        Reflect.set(target, property, newValue, receiver)
        const depend = getDepend(target,property)
        depend.notify()
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