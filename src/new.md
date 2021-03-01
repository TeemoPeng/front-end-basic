### new, call, apply, bind原理介绍

#### new关键字原理

new 关键字的主要作用是执行构造函数，返回一个实例对象，在new的过程中，根据构造函数的情况，来确定是否需要参数传递。

```javascript
function Person(){
  this.name = 'person'
}

const p1 = new Person()
console.log(p1) // { name: 'person' }

```
这段代码比较容易理解，p1是通过构造函数Person创建的一个实例对象，那么，在new的过程中，究竟发生了什么呢？总结下，大致分为以下几个步骤：

1. 创建一个空对象
2. 将构造函数的作用域赋值给这个新对象（this指向新对象）
3. 执行构造函数中的代码（为这个对象添加属性）
4. 返回新对象

那么问题来了，假如不用new关键字，会发生什么？

```javascript
function Person1() {
  this.name = 'person'
}

const p2 = Person1()
console.log(p2, name) // undefined person
```
以上代码，没有使用new，返回的是undefined。其中由于javascript在默认情况下this是指向window的，那么name的输出即为person，这是一种不存在new关键字的情况。

那么当构造函数中有return一个对象的时候，结果又会是什么样的呢？

```javascript
function Person2(){
    this.name = 'person2'
    return {
        age: 30,
        sex: 1
    }
}
const p2 = new Person2()
console.log(p2) // { age: 30, sex: 1}
```
通过以上代码可以看出，当构造函数返回的是一个与this无关的对象时，new命令会直接返回这个对象，而不是通过new执行步骤生成的this对象。

这里要求构造函数返回的是一个对象，那么，当构造函数return的不是对象时，又是什么情况呢？

```javascript
function Person3(){
    this.name = 'person3'
    return 'person'
}
const p3 = new Person3()
console.log(p3) // { name: 'person3'}
```
可以看出来，当return返回的不是一个对象时，那么它会根据new关键字执行逻辑，生成一个新的对象，最后返回。

总结: new 关键字返回的结果有两种情况，要么是一个实例对象，要么是return语句返回的新对象。

理解了new的原理，接下来我们来模拟一下new的实现:

```javascript
function newOpt(constructor) {
  let obj = {}
  let args = []

  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i])
  }

  const result = constructor.apply(obj, args)
  return typeof result === 'object' ? result : obj
}

function Person4() {
  this.name = 'person4'
  return 'sb'
}
const p4 = newOpt(Person4)

```

#### call, apply, bind原理介绍

先来了解一下这三个方法的基本使用情况，call,apply,bind是挂在Function对象的三个方法，调用这三个方法的必须是函数。
基本语法：
```javascript

```




