## 作用域及闭包

在ES5中，是没有块级作用域的，只有全局作用域和函数作用域，而在ES6中，增加了块级作用域，前提是要
遵守ES6的语法规则。

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

##### 函数作用域

	function fn1(){
	  var a = 100;
	}
	console.log(a) 

如上代码，我们在函数体fn1中定义了一个变量a，然后我们在函数体外去访问它，这个时候是访问不到的，因为a
这个变量是在fn1这个函数作用域中定义的，只能在其中访问的到。

##### 作用域链

    function Fn1(){
	  var a = 100;
	  return function (){
	    console.log(a);
	  }
	}

	var f1 = new Fn1();
	var a = 200;
	f1();

当调用f1()这个方法时，会执行console.log(a),然后程序会在当前作用域中查找是否存在a这个变量，当前作用域，
即 return function (){console.log(a);}这个函数作用域，但是并没有找到a这个变量，然后会去这个作用域的
父级作用域中去查找，即function Fn1(){}中去查找，然后找到了a这个变量，发现值为100，然后将其打印出来。

这就是作用域链。


