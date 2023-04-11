// 父类：
function Person(){
    this.name = 'cc'
}

Person.prototype.eating = function(){
    console.log(this.name + '在吃饭')
}

// 子类

function Student(){
    this.sno = 111
}

Student.prototype.studying = function() {
    console.log(this.name + '在学习')
}

var p = new Person()
Student.prototype = new Person()

var stu = new Student()
console.log(stu.name)//undefined
stu.eating()//报错

// 现在我们就要实现继承，
// Student.prototype = new Person()

