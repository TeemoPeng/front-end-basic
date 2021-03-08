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


