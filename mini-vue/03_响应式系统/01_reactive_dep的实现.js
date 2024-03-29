class Dep {
    constructor(){
        this.subscribers = new Set()//元素不会重复
    }
    addEffect(effect){
        this.subscribers.add(effect)
    }
    notify(){
        this.subscribers.forEach(effect => {
            effect()
        })
    }
}

const dep = new Dep()
const info = {
    counter: 100
}
function doubleCounter(){
    console.log(info.counter * 2)
}
function powerCounter(){
    console.log(info.counter * info.counter)
}
dep.addEffect(doubleCounter)
dep.addEffect(powerCounter)
info.counter++
dep.notify()
// 收集依赖
