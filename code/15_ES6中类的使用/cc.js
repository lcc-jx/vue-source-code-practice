//  2.混入
class Person{

}

class Student extends Person{

}

function mixinRunner(BaseClass){
    class NewClass extends BaseClass{
        running(){
            console.log('running~')
        }
    }
    return NewClass
}

// 或者可以这样(这个类用不到的话直接使用匿名类)
function mixinEater(BaseClass){
    return class extends BaseClass{
        eating(){
            console.log('eating~')
        }
    }
}

// var NewStudent = mixinRunner(Student)
// var ns = new NewStudent()
// ns.running()

var NewStudent = mixinEater(Student)
var ns = new NewStudent()
ns.eating()

