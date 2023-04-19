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

function watchEffect(effect){
    dep.addEffect(effect)
}

const dep = new Dep()
const info = {
    counter: 100
}
watchEffect(function (){
    console.log(info.counter * 2)
})
watchEffect(function (){
    console.log(info.counter * info.counter)
})
dep.addEffect(doubleCounter)
dep.addEffect(powerCounter)
info.counter++
dep.notify()
