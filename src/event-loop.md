### Event Loop 事件循环

由于javascript是单线程的，在代码执行过程中，如果遇到同步任务，会马上执行；遇到异步任务会依次把异步任务放入异步任务队列中，等到同步代码都执行完的时候，再去异步任务队列中查找，如果有待执行的任务，就放入主线程执行，当主线程的任务执行完的时候，又会再去异步任务队列中去查询，直到所有代码都执行完毕，这样的一个过程，就称为事件循环。



### 宏任务与微任务

任务队列分为macro-task（宏任务）与micro-task（微任务）

宏任务包括：script整体代码，setTimeout，setInterval，setImmeidate， I/O，UI rendering

微任务包括：process.nextTick, Promise.then, Promise.catch, Promise.finally。

当执行栈为空时，事件循环线从一个宏任务开始，然后执行所有的微任务，再执行一个宏任务。。。

在第一次执行事件循环的时候，通常会这样说：

事件循环从宏任务队列开始，这个时候，宏任务队列中，只有一个script整体代码任务。