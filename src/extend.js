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

Parent1.prototype.getName = function() {
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
// console.log(child.getName)


// 3.原型链+构造函数组合继承方式
function Parent3() {
    this.name = 'parent3'
    this.play = [1,2,3,4]
}

Parent3.prototype.getName = function() { return this.name }

function Child3() {
    Parent3.call(this)
    this.type = 'child3'
}

Child3.prototype = new Parent3()
// 手动挂上构造器，指向自己的构造函数
Child3.prototype.constructor = Child3

let s3 = new Child3()
let s4 = new Child3()

s3.play.push(5)
console.log(s3.play, s4.play, s3.getName())
