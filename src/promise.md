### 实现符合Promise/A+ 规范的 Promise

1. Promise/A+ 约定了哪些规范？
2. 在手动实现Promise的过程中都遇到过哪些问题？

#### Promise/A+ 规范

官方解释：https://promisesaplus.com/

#### 1. 术语

 1. 'promise' 是一个包含then方法的对象或者方法
 2. 'thenable' 是用来定义 then 方法的一个对象或者方法
 3. 'value' 是任意合法的javascript 值（包括undefined, thenable, promise）
 4. 'exception' 是一个异常，是在Promise里面可以用throw抛出来的值
 5. 'reason' 是一个Promise 里 reject 之后返回的拒绝原因

#### 2. 状态
  
  一个Promise有三种状态：pending, fullfilled, rejected。

  当状态为pending时，一个promise可以转变成fullfilled或者rejected；
  当状态为fullfilled时，就不能转变成其他状态了，必须返回一个不能再改变的值；
  当状态为rejected时，也不能再转变成其他状态，必须返回一个不能再改变的拒绝原因（reason）。

#### 3. then方法

  一个Promise 必须提供一个then方法，去访问它的值或者拒绝的原因。
  一个Promise的then方法接收两个参数:

  ```javascript
  Promise.then(onFullfilled, onRejected)
  ```

  1. onFullfilled, onRejected都是可选参数，如果onFullfilled（onRejected）不是一个方法，那么这个参数就会被忽略掉
  2. 如果onFullfilled是一个函数时，则当promise执行结束之后必须被调用，最终返回值为value，其调用次数不可以超过一次， 而onRejcted除了最后返回的是reason之外，其他方面和onFullfilled在规范的表述上基本一致。

#### 多次调用

  then方法可以被一个Promise多次调用，且必须返回一个Promise对象。

  ```javascript
  const promise2 = promise1.then(onFullfilled, onRejected)
  ```
其中 promise1 执行了 then 的方法之后，返回的依旧是个 promise2，然后我们拿着 promise2 又可以执行 then 方法，而 promise2 是一个新的 Promise 对象，又可以继续进行 then 方法调用。

#### 实现Promise

1. 构造函数
按照Promise/A+的规范，第一步就是实现构造函数( const p = new Promise() )，这一步的思路是：Promise函数接收一个executor函数，executor函数执行完同步或异步的操作后，调用它的两个参数resolve，rejecte。

```javascript
function Promise(executor){
  const self = this
  self.status = 'pending' // Promise当前的状态
  self.data = undefined  // Promise的值
  self.onResolveCallback = [] // Promise resolve时的回调函数集
  self.onRejecteCallback = [] // Promise rejecte时的回调函数集
  executor(resolve, rejecte) // 执行executor并传入相应的参数
}
```

接下来实现Promise中的resolve，reject方法：

```javascript
function MyPromise(executor) {
  const self = this
  self.status = 'pending'
  self.data = undefined
  self.onResolvedCallback = []
  self.onRejectedCallback = []

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'resolved'
      self.data = value
      for (let i = 0; i < self.onResolvedCallback.length; i++) {
        self.onResolvedCallback[i](value)
      }
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected'
      self.data = reason
      for (let i = 0; i < self.onRejectedCallback.length; i++) {
        self.onRejectedCallback[i](reason)
      }
    }
  }

  executor(resolve, reject)
}
```
resolve和reject方法，主要是返回当前Promise的值value或是拒绝的原因reason，并且将Promise内部的状态status改为resolved或是rejected，并且这个状态不能再逆转。

#### 实现then方法
then 方法是Promise执行之后可以拿到value或reason的方法，并且then返回的是一个Promise，支持链式调用。

```javascript
function MyPromise(executor) {
  const self = this
  self.status = 'pending'
  self.data = undefined
  self.onResolvedCallback = []
  self.onRejectedCallback = []

  function resolve(value) {
    if (self.status === 'pending') {
      self.data = value
      self.status = 'resolved'
      for (let i = 0; i < self.onResolvedCallback.length; i++) {
        self.onResolvedCallback[i](value)
      }
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.data = reason
      self.status = 'rejected'

      for(let i = 0; i < self.onRejectedCallback.length; i++) {
        self.onRejectedCallback[i](reason)
      }
    }
  }

  executor(resolve, reject)
}

// then 方法接收两个参数onFullfilled， onRejected
MyPromise.prototype.then = function(onFullfilled, onRejected){
  
}
```



