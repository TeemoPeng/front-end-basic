## 变量类型和计算

#### 1.数据类型

	在javascript中，基础数据类型有null,undefined,string,boolean,number;

	按存储方式，可分为值类型和引用类型;

	typeof只能判断值类型数据的类型：

	  typeof undefined // undefined
	  typeof 'abc' //string
	  typeof 123 //number
	  typeof {} //object
	  typeof null // object
	  typeof [] //object
	  typeof console.log //object

	如果需要判断引用类型数据的类型，则需要用到instanceof来判断：

	  var arr = [];
	  arr instanceof Array // true

	  var obj = {};
	  obj instanceof Object // true

	  var fn1 = function(){}
	  fn1 instanceof Function //true

#### 2.强制类型转换
	
	在实际的代码编写过程中，经常会碰到强制类型转换，只不过大部分人可能都忽略了这么一个过程，比如字符串拼接符合“+”，比如“==”运算符，比如if语句等等...

##### 字符串拼接
	var a = 10 + '';
	typeof a; //string 



