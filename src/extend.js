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

const p = new Parent()
const c = new Child()

let s1 = new Child()
let s2 = new Child()
s1.play.push(4)
console.log(s1.play, s2.play)