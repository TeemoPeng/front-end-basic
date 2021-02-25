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

   

4. #### 原型式继承（Object.create）

   原型式继承，主要用到Object.create方法，该方法接收两个参数，第一个参数为用作新对象原型的对象，第二个参数为定义新对象额外属性的对象（可选）。

   ```javascript
   let parent4 = {
     name: 'parent4',
     play: [1,2,3],
     getName: function(){
       return this.name
     }
   }
   
   let child4 = Object.create(parent4)
   child4.name = 'child4'
   child4.play.push(4)
   
   let child5 = Object.create(parent4)
   console.log(child4, child4.play, child5.play)
   ```

   **缺点**：

   多个实例的引用类型属性指向相同的内存，存在篡改的可能。

   

5. #### 寄生式继承

   使用原型式继承可以获得一份目标对象的浅拷贝，然后利用这个浅拷贝的能力再进行增强，添加一些方法，这样的继承方式就叫做寄生式继承。

   虽然其优缺点和原型式继承一样，但是对于普通对象的继承方式来说，寄生式继承相比于原型式继承，是在父类基础上添加了更多的方法。

   ```javascript
   let parent5 = {
     name: 'parent5',
     friends: ['p1', 'p2', 'p3'],
     getName: function(){
       return this.name
     }
   }
   
   function clone(origin) {
     let clone = Object.create(origin)
     clone.getFriends = function() {
       return this.friends
     }
     return clone
   }
   ```

   通过上面这段代码，我们可以看到 person5 是通过寄生式继承生成的实例，它不仅仅有 getName 的方法，而且它最后也拥有了 getFriends 的方法。

   从最后的输出结果中可以看到，person5 通过 clone 的方法，增加了 getFriends 的方法，从而使 person5 这个普通对象在继承过程中又增加了一个方法，这样的继承方式就是寄生式继承。

   

   上面第三种组合继承方式中提到了一些弊端，即两次调用父类的构造函数造成浪费，下面要介绍的寄生组合继承就可以解决这个问题。

   

6. #### 寄生组合式继承

   结合第四种中提及的继承方式，解决普通对象的继承问题的 Object.create 方法，我们在前面这几种继承方式的优缺点基础上进行改造，得出了寄生组合式的继承方式，这也是所有继承方式里面相对最优的继承方式，代码如下。

   ```javascript
   function Parent6() {
     this.name = 'parent6'
   }
   Parent6.prototype.getName = function() {
     return this.name
   }
   function Child6() {
     Parent6.call(this)
     this.type = 'child6'
   }
   
   /**
   	这一步不用Child6.prototype = Parent.prototype的原因是避免内存共享
   	不用Child6.prototype = new Parent6()的原因是避免调用2次父类的构造方法（另一次是call),会存在一份多余的父类实例属性
   	Object.create()是创建了父类原型的副本，与父类原型完全隔离
   */
   Child6.prototype = Object.create(Parent6.prototype)
   Child6.prototype.say = function(){
     console.log(this.type)
   }
   Child6.prototype.constructor = Child6
   

   let child6 = new Child6()
   console.log(child6.getName())
   
   
   ```

   