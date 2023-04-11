// 你不知道的JavaScript
// function foo(el) {
//   console.log(el,this.id)
// }

// var obj = {
//   id:'awesome'
// }

// var nums = [1,2,3]
// nums.forEach(foo,obj)

var container = document.getElementById('container')
var targetNode = document.getElementById('title')
var button = document.getElementById('button')
button.onClick = function click() {
  console.log('111')
  container.removeChild(targetNode)
}
