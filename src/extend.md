###  继承概念的探究

说到继承的概念，首先要说一个经典的例子。

先定义一个类（Class）叫汽车，汽车的属性包括颜色、轮胎、品牌、速度、排气量等，由汽车这个类可以派生出“轿车”和“货车”两个类，那么可以在汽车的基础属性上，为轿车添加一个后备厢、给货车添加一个大货箱。这样轿车和货车就是不一样的，但是二者都属于汽车这个类，这样从这个例子中就能详细说明汽车、轿车以及卡车之间的继承关系。

继承可以使得子类别具有父类的各种方法和属性，比如上面的例子中“轿车” 和 “货车” 分别继承了汽车的属性，而不需要再次在“轿车”中定义汽车已经有的属性。在“轿车”继承“汽车”的同时，也可以重新定义汽车的某些属性，并重写或覆盖某些属性和方法，使其获得与“汽车”这个父类不同的属性和方法。

继承的基本概念就初步介绍这些，下面我们就来看看 JavaScript 中都有哪些实现继承的方法。



### JS 实现继承的几种方式

1. #### 原型链继承

   ```javascript
   function Parent() {
     this.name = 'Parent'
     this.play = [1, 2, 3]
   }
   
   function Child() {
     this.type = 'Child'
   }
   
   Child.prototype = new Parent()
   const child = new Child()
   console.log(child, child.name, child.play) 
   ```

   上面的代码看似没有问题，虽然父类的方法和属性都能够访问，但其实有一个潜在的问题，我再举个例子来说明这个问题。

   ```javascript
   let s1 = new Child()
   let s2 = new Child()
   s1.play.push(4)
   console.log(s1.play, s2.play) // [1,2,3,4] [1,2,3,4]
   ```

   创建的2个实例对象s1，s2，用的是同一个原型对象，它们的内存空间是共享的，当其中一个发生变化，另一个也随之变化，这就是原型链继承方式的一个缺点。

2. #### 构造函数继承（借助 call）

   ```javascript
   function Parent1() {
     this.name = 'parent1'
   }
   
   Parent1.prototype.getName = () => return this.name
   
   function Child1() {
     Parent1.call(this)
     this.type = 'child1'
     this.play = [1,2,3,4]
   }
   
   let child1 = new Child1()
   let child2 = new Child1()
   
   console.log(child1)
   console.log(child1.getName) // child1.getName is not a function
   
   child1.play.push(5) 
   console.log(child1.play) // [1,2,3,4,5]
   console.log(child2.play) // [1,2,3,4]
   
   ```

   这种方式解决了原型链继承方式中两个实例共享内存的问题，但是随之也带来了另外一个问题：

   只能继承父类的属性和方法，不能继承父类的原型属性和方法。

   

3. #### 组合继承（原型链 + 构造函数组合）

   ```javascript
   function Parent3() {
     this.name = 'parent3'
     this.play = [1,2,3]
   }
   
   Parent3.prototype.getName = function() {
     return this.name
   }
   
   function Child3() {
     Parent3.call(this) //第二次调用Parent3
     this.type = 'child3'
   }
   
   Child3.prototype = new Parent3() //第一次调用Parent3
   Child3.prototype.constructor = Child3
   
   let s3 = new Child3()
   let s4 = new Child3()
   
   s3.play.push(4)
   console.log(s3.play, s4.play) // [1,2,3,4],[1,2,3] 互不影响
   console.log(s3.getName()) // 能访问到父类的原型属性及方法
   ```

   执行以上代码，原型链继承方式、构造函数继承方式中的问题都能得以解决。

   **缺点：**

   Parent3多调用了一次，第一次是在改变Child3的prototype的时候，第二次是通过call方法调用Parent3的时候，多执行了一次，就多进行了一次性能开销。

   

4. #### 原型式继承

   

5. #### 寄生式继承

   

6. #### 寄生组合式继承

   