'use strict'

function foo(){
    console.log(this)
}

foo()

var obj = {
    name:'aa',
    foo:foo
}
obj.foo()

var bar = obj.foo
bar()

setTimeout(function(){
    console.log(this)
},1000)


