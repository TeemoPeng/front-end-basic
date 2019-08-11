## 原型和原型链

#### 原型（prototype）

	每个函数对象在定义的时候，都会默认有一个prototype属性，称之为原型

#### 原型的特点

	1.所有的引用类型（数组、对象、函数），都可以无限扩展属性
	2.所有的引用类型（数组、对象、函数），都有一个隐式原型 __proto__,其属性值是一个普通对象
	3.所有的函数，都有一个prototype属性（显式原型），其属性值也是一个普通对象
	4.所有的引用类型（数组、对象、函数），它的隐式原型（__proto__)属性值指向他的构造函数的显示原型（prototype）属性值

#### 原型链

当我们访问某个对象的属性时，如果这个对象本身没有这个属性，则会去它的__proto__（构造函数的prototype）中去查找

	function Person(name,age){
	  this.name = name;
	  this.age = age;		
	}

	Person.prototype.speak = function(){
	  console.log('I am ' + this.name)
	}

	var p = new Person('zhangsan',22); 
	p.speak();

我们创建的p这个对象，它本身是没有speak这个方法的，但是当我们调用p.speak()的时候，程序会先去它本身（也就是Person这个构造函数）中去查找有没有speak这个方法，这个时候是找不到的，然后会去这个构造函数的prototype中去查找，这个就找到了speak。
