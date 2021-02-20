/**
 * js 继承的方式
 */

 // 1.原型链继承

function Parent() {
    this.name = 'Parent'
    this.play = [1, 2, 3]
}

function Child() {
    this.type = 'Child'
}

Child.prototype = new Parent()

let s1 = new Child()
let s2 = new Child()
s1.play.push(4)
// console.log(s1.play, s2.play) [1,2,3,4] [1,2,3,4]


// 2.构造函数继承
function Parent1() {
    this.name = 'parent1'
}

Parent1.prototype.getName = () => {
    return this.name
}

function Child1() {
    Parent1.call(this)
    this.play = [1,2,3,4]
    this.type = 'child1'
}

let child = new Child1()
let child2 = new Child1()
child.play.push(4)
console.log('child:', child)
console.log(child.getName)
console.log('child2:', child2)
