## new, call, apply, bind原理介绍

### -------- new关键字原理 --------

new 关键字的主要作用是执行构造函数，返回一个实例对象，在new的过程中，根据构造函数的情况，来确定是否需要参数传递。

```javascript
function Person(){
  this.name = 'person'
}

const p1 = new Person()
console.log(p1) // { name: 'person' }

```
这段代码比较容易理解，p1是通过构造函数Person创建的一个实例对象，那么，在new的过程中，究竟发生了什么呢？总结下，大致分为以下几个步骤：

1. **创建一个空对象**
2. **将构造函数的作用域赋值给这个新对象（this指向新对象）**
3. **执行构造函数中的代码（为这个对象添加属性）**
4. **返回新对象**

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

**总结: new 关键字返回的结果有两种情况，要么是一个实例对象，要么是return语句返回的新对象。**


### -------- call, apply, bind原理介绍 --------

先来了解一下这三个方法的基本使用情况，call,apply,bind是挂在Function对象的三个方法，调用这三个方法的必须是函数。
基本语法：
```javascript
func.call(thisArg, param1,param2)
func.apply(thisArg, [param1, param2])
func.bind(thisArg, param1, param2)
```
其中，func为方法名，thisArg为需要调用func方法的对象，param1,param2为func方法需要的参数,如果func不需要参数，则后面的param1，param2可以省略。

这三个方法共有的比较明显的作用就是，都可以改变func方法的this指向。call和apply的区别在于参数的形式不一样，apply的第二个参数为数组，call的第二个到第n个都是给func的传参；
而bind和call、apply的区别在于，bind虽然改变了this的指向，但是不马上执行，call、apply方法改变this的指向后会立即执行。

这几个方法的原理基本解释清楚了，但是理解起来可能还稍微费劲，举个例子：
A对象中有一个方法getName，B对象也想临时使用A对象的getName方法，那么这个时候，我们就不需要为B对象单独定义一个getName方法了，而是可以直接借用A对象的方法，既达到了目的，又节省重复定义，节约内存空间。
代码示例：
```javascript
const A = {
  name: 'A',
  getName: function(msg){
    return `${msg} ${this.name}` 
  }
}

const B = {
  name: 'B'
}

console.log(A.getName('hello'))
console.log(A.getName.call(B, 'hi'))
console.log(A.getName.apply(B, ['how are you']))
console.log(A.getName.bind(B, 'hellooooo')())
```
通过以上代码可以看出，三种方式都能达到我们的预期目标，即通过改变this的指向，让B临时拥有A的getName方法。

以上，就是call，apply，bind的基本原理，接下来看看这几个方法的使用场景。

### -------- call，apply，bind方法的使用场景 --------

1. #### 判断数据类型

Object.prototype.toString()用来判断数据类型是最合适的，借用它我们几乎可以判断所有类型的数据。
```javascript
function getType(obj){
  let type = typeof obj
  if (type !== 'object'){
    return type
  }
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
}
```
这种判断数据类型的方法，就是借用了Object原型链上的toString()方法，来确定数据类型。

2. #### 类数组借用方法

因为类数组不是真正的数组，所以没有数组自带的各种方法，所以我们就可以一些方法去借用数组的方法，比如借用数组的push方法：
```javascript
const arrayLike = {
  0: 'javascript',
  1: 'java',
  length: 2
}
Array.prototype.push.call(arrayLike, 'tom', 'jerry')
console.log(typeof arrayLike) // 'object'
console.log(arrayLike) // {0:'javascript', 1:'java', 2:'tom', 3:'jerry', length:4}
```
从以上代码可以看出，arrayLike是一个对象，typeof判断输出的是object，它本身是没有push方法的，但是我们可以通过call调用数组原型链上的push方法，来实现一个类数组的push方法，给arrayLike添加新元素。

3. #### 获取数组的最大值、最小值

我们可以利用apply方法来获取数组的最大、最小值，apply直接传递数组作为调用方法的参数，也可以减少进一步展开数组：
```javascript
const arr = [8,10,29,1,3]
const max = Math.max.apply(Math, arr)
const min = Math.min.apply(Math, arr)

console.log(max) // 29
console.log(min) // 1
```


4. #### 继承

组合继承方式：
```javascript
function Parent() {
  this.name = 'parent'
  this.play = [1,2,3]
}
Parent.prototype.getName = function(){
  return this.name
}
function Child(){
  Parent.call(this)
  this.type = 'child'
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
```
关于继承的内容在这里就不过多讲解了，另外这些方法类似的应用场景还有很多，关键在于它们借用方法的理念，如果对这部分内容不理解的话，可以再多看几遍。


### ------- 如何实现这些方法 -------
  在互联网大厂的面试中，手写new，call，apply，bind 一直是比较高频的题目，接下来我们就一起来实现这几个方法。

1. #### new的实现
    在new的过程中，主要做了以下几件事：
    1. 让实例可以访问到私有属性
    2. 让实例可以访问构造函数原型链上的属性
    3. 构造函数返回的结果是引用类型
    
    以下是模拟实现new的步骤：
    ```javascript
    function newOpt(constructor){
      let obj = {}
      let args = []
      for (let i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
      }
      const result = constructor.apply(obj, args)
      return typeof result === 'object' ? result : obj 
    }
    ```

2. #### call的实现
    实现步骤：
    1. 将方法设置为需要调用该方法的对象的一个属性
    2. 将this指向这个函数
    3. 执行函数
    4. 返回结果并删除对象上的函数

    ```javascript
    Function.prototype.myCall = function(obj) {
      let context = obj || window
      context.fn = this // 为对象添加方法，并将this指向这个方法
      let args = []
      for (let i = 1; i < arguments.length; i++){
        args.push(arguments[i])
      }
      const result = context.fn(...args)
      delete context.fn
      return result
    }

    const Parent = {
      name: 'parent',
      getName: function(msg, msg2){
        return `${msg} ${msg2} ${this.name}`
      }
    }

    const child = {
      name: 'child'
    }
    console.log(Parent.getName.myCall(child, 'hi~', 'sb'))

    ```

3. #### apply的实现
    apply方法的实现步骤与call的实现一致，只是参数形式不一样而已：

    ```javascript
    Function.prototype.myApply = function(obj) {
      let context = obj || window
      context.fn = this
      let args = arguments[1] ? arguments[1] : []
      const result = context.fn(...args)
      delete context.fn
      return result

    }
    const Parent = {
      name: 'parent',
      getName: function(msg, msg2){
        return `${msg} ${this.name}`
      }
    }

    const child = {
      name: 'child'
    }
    console.log(Parent.getName.myApply(child, ['hi', 'sb']))
    ```

4. #### bind的实现
    bind与call、apply的区别在于函数没有立即执行，返回的结果是一个函数，且返回的函数可以作为构造函数使用，故作为构造函数时应使this失效，但是传入的参数依然有效。

    bind方法的特点：
    1. 返回一个函数
    2. 可以传入参数

    **返回一个函数：**
    ```javascript  
    Function.prototype.myBind = function(obj){
      const self = this
      return function(){
        return self.apply(obj)
      }
    }
    const A = {
      name: 'A',
      getName: function(){
        return this.name
      }
    }
    const B = {
      name: 'B'
    }
    console.log(A.getName.myBind(B)()) // B
    ```
    之所以 return self.apply(obj)，是考虑到绑定函数可能是有返回值的。

    **可以传入参数**
    在bind调用的时候，可以传入参数，在执行bind返回函数的时候依然可以传入参数：

    ```javascript
    const A = {
      name: 'A',
      getName: function(msg1, msg2){
        console.log('name:', this.name)
        console.log('msg1:', msg1)
        console.log('msg2:', msg2)
      }
    }
    const B = {
      name: 'B'
    }
    const fn = A.getName.bind(B, 'test')
    fn('test2')

    // name: B
    // msg1: test
    // msg2: test2

    ```
    getName函数需要传入两个参数，可以在bind的时候传入第一个，然后在返回函数执行时再传入第二个。

    ```javascript
    Function.prototype.bind2 = function(obj){
      const self = this
      // 获取bind2函数从第二个到最后一个参数
      const args = Array.prototype.slice.call(arguments, 1)
      return function(){
        //这里的arguments是bind2返回的函数执行时传入的参数
        const bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(obj, args.concat(bindArgs))
      }
    }

    const A = {
      name: 'A',
      getName: function(msg1, msg2){
        console.log('name:', this.name)
        console.log('msg1:', msg1)
        console.log('msg2:', msg2)
      }
    }
    const B = {
      name: 'B'
    }
    const fn = A.getName.bind2(B, 'test')
    fn('test2')
    ```

    完成了前面步，接下来还有一个需要处理的，那就是bind的另外一个特点：

    > 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。	
    
    也就是说，当bind返回的函数作为构造函数的时候，bind时指定的this值会失效，但传入的参数依然有效。举个例子：
    
    ```javascript
    const value = 2
    const foo = {
      value: 1
    }
    function bar(name, age){
      this.habit = 'playing'
      console.log(this.value)
      console.log(name)
      console.log(age)
    }
    bar.prototype.friend = 'Kevin'
    const bindFoo = bar.bind(foo, 'Daniel')
    const obj = new bindFoo('18')
    // undefined
    // Daniel
    // 18
    console.log(obj.habit) // playing
    console.log(obj.friend) // Kevin
    ```
    
    尽管在全局和foo中我们都声明了value，最后依然返回了undefined，说明绑定的this失效了。
    
    我们可以通过修改返回的函数原型来实现：
    
    ```javascript
    Function.prototype.bind3 = function(obj){
      if (typeof this !== 'function') {
        throw new Error('this must be function')
      }
      const self = this
      const args = Array.prototype.slice.call(arguments, 1)

      const fBound =  function(){
        const bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(this instanceof fBound ? this : obj, args.concat(bindArgs))
      }

      fBound.prototype = this.prototype
      return fBound
    }

    const value = 2
    const foo = {
      value: 1
    }
    function bar(name, age){
      this.habit = 'playing'
      console.log(this.value)
      console.log(name)
      console.log(age)
    }
    bar.prototype.friend = 'Kevin'
    const bindFoo = bar.bind(foo, 'Daniel')
    const obj = new bindFoo('18') // this失效
    ```

    在这个写法中，fBound.prototype = this.prototype 我们直接修改fBound.prototype的时候，也会修改绑定函数的prototype，所以，可以用Object.create()来改造一下：
    ```javascript
    Function.prototype.bind4 = function(obj){
      if (typeof this !== 'function'){
        throw new Error('this must be function')
      }
      const self = this
      const args = Array.prototype.slice.call(arguments, 1)
      const fBound =  function(){
        const bindArgs = Array.prototype.slice.call(arguments)
        // 当返回函数作为构造函数时，this instanceof fBound 为true， 将绑定函数的this指向该实例，可以让实例获得来自绑定函数的值
        // 当返回函数作为普通函数时，this 指向window， 将绑定函数的this指向obj
        return self.apply(this instanceof fBound ? this : obj, args.concat(bindArgs))
      }

      if (this.prototype) {
        fBound.prototype = Object.create(this.prototype)
      }
      return fBound
    }

    const value = 2
    const foo = {
      value: 1
    }
    function bar(name, age){
      this.habit = 'playing'
      console.log(this.value)
      console.log(name)
      console.log(age)
    }
    bar.prototype.friend = 'Kevin'
    const bindFoo = bar.bind4(foo, 'Daniel')
    const obj = new bindFoo('18') // this失效
    ```
    