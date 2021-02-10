## 作用域及闭包

在ES5中，是没有块级作用域的，只有全局作用域和函数作用域，而在ES6中，增加了块级作用域，前提是要遵守ES6的语法规则。

ES5中没有块级作用域：

	for(var i = 0; i < 10; i++){
	  console.log(i);
	}
	console.log(i); 	//在for循环代码块之外能访问到i

ES6中增加了块级作用域：

	for(let x = 0; x < 10; x++){
	  console.log(x);
	}
	console.log(x);		//x is not define 在for循环代码块之外访问，会报错

#### 函数作用域

	function fn1(){
	  var a = 100;
	}
	console.log(a) 

如上代码，我们在函数体fn1中定义了一个变量a，然后我们在函数体外去访问它，这个时候是访问不到的，因为a这个变量是在fn1这个函数作用域中定义的，只能在其中访问的到。

#### 作用域链

    function Fn1(){
	  var a = 100;
	  return function (){
	    console.log(a);
	  }
	}

	var f1 = new Fn1();
	var a = 200;
	f1();

当调用f1()这个方法时，会执行console.log(a),然后程序会在当前作用域中查找是否存在a这个变量，当前作用域，即 return function (){console.log(a);}这个函数作用域，但是并没有找到a这个变量，然后会去这个作用域的父级作用域中去查找，即function Fn1(){}中去查找，然后找到了a这个变量，发现值为100，然后将其打印出来。

这就是作用域链。

#### 闭包

什么是闭包，为什么需要闭包？

*闭包就是跨作用域访问变量，* 前面在函数作用域那里说到，在函数体外是访问不到函数体内定义的变量的，但是通过闭包，使内部作用域保持对外部作用域中的变量的引用，从而能够在外部作用域中访问内部作用域的变量。

局部变量无法共享和长久的保存，而全局变量可能造成变量污染，所以我们希望有一种机制既可以长久的保存变量又不会造成全局污染。

举个栗子,实现一个计算器功能，我们可以用以下方法：

	var counter = 0; //定义一个全局变量
	function add(){
	  return counter += 1;
	} 

	add();
	add();

每次调用的时候，counter+1，实现了我们要的功能，但是，我们定义的counter是个全局变量，也就是说，我们在其他地方，是能够更改这个变量的值的，比如,我先将counter的值改为10，然后再执行add():
	
	counter = 10;
	add();

这个时候，就不是我们想要的结果了。所以需要闭包了闭包来实现：

	function add(){
	  var counter = 0; // 变量定义在add函数体中，外部不能直接修改
	  return function(){
	  	return counter +=1;
	  }
	}

	var fn1 = add();
	var count;
	count = fn1(); //1
	count = fn1();	//2

	count = null ; //手动销毁变量，释放内存

函数执行完，生命周期结束，但是通过闭包引用的外层作用域内的变量依然存在，并且将一直存在，直到执行闭包的的作用域被销毁，
这里的局部变量才会被销毁，因此，为了避免内存销毁，我们需要手动销毁；

[闭包的应用](https://github.com/TeemoPeng/front-end-basic/blob/master/src/debounce.md)




