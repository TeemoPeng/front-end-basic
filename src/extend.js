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

// 4. Object.create继承方式
let parent4 = {
    name: 'parent4',
    play: [1,2,3],
    getName: function(){
        return this.name
    }
}
let child4 = Object.create(parent4)


//  最优继承方式
function Parent6() {
    this.name = 'parent6'
    this.play = [1, 2, 3]
}
Parent6.prototype.getName = function() {
    return this.name
}

function Child6() {
    Parent6.call(this)
    this.type = 'child6'
}

Child6.prototype = Object.create(Parent6.prototype)
Child6.prototype.say = function() {
    console.log('child6 name:', this.name)
}
Child6.prototype.constructor = Child6


let child6 = new Child6()
let child7 = new Child6()

child6.play.push(4)
console.log(child6.play, child7.play)
console.log(child6.getName(), child6.say())