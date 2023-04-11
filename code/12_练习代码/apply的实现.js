// apply函数的实现
var name = 'cWindow'

var obj = {
    name:'cObj',
    foo:function(name){
        console.log(name)
    }
}

obj.foo.apply(window,['name'])

// Function.prototype.cApply(getObj){

    // var _this = getObj

// }

