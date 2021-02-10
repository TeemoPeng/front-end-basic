#### 深浅拷贝

- 浅拷贝：假设有一个目标对象target，用来接收源对象source的拷贝，当源对象的属性是基本数据类型时，复制的就是基本数据类型的值给target，但是，当源对象source的属性是引用类型时，复制的就是内存中的地址。当这个内存地址改变的时候，会影响到目标对象。

- 深拷贝：将源对象从内存中完整的拷贝一份出来给目标对象，并从内存中开辟一个全新的空间来存放对象，且目标对象的修改不会影响源对象，二者实现真正的分离。



#### 浅拷贝的实现方式

- ##### Object.assgin()

  ```javascript
  let target = {}
  let source = { a: { b: 1} }
  Object.assign(target, source)
  console.log(target) // { a: { b: 1} }
  ```

  ###### 使用Object.assgin()需要注意：

  - 它不会拷贝对象的继承属性
  - 它不会拷贝对象的不可枚举属性
  - 可以拷贝Symbol类型的属性
    

- ##### 扩展运算符 ...

  ```javascript
  let source = { a: { b: 1} }
  let target = {...source}
  console.log(target)
  ```

- ##### = 赋值符

  

##### 如何实现一个浅拷贝？

```javascript
const shallowCopy = (source) => {
  if (typeof source === 'object' && source !== null) {
  const cloneTarget = Array.isArray(source) ? [] : {}
  for (let p in source) {
   if (source.hasOwnProperty(p)){
     cloneTarget[p] = source[p]
   }
  }
  return cloneTarget
  } else {
   return source
  }
}
```

从上面这段代码可以看出，利用类型判断，针对引用类型的对象进行 for 循环遍历对象属性赋值给目标对象的属性，基本就可以手工实现一个浅拷贝的代码了

#### 深拷贝的实现方式