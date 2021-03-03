/**
 * 模拟bind方法实现
 * bind特点:
 * 1. 返回一个函数
 * 2. 可以传入参数
 */

const A = {
    name: 'A',
    getName: function(){
        return this.name
    }
}

const B = {
    name: 'B'
}

// 第一个版本 （返回一个函数）
Function.prototype.bind1 = function(obj){
    const self = this
    return function(){
        self.apply(obj)
    }
}
console.log(A.getName.bind1(B)())


// 第二个版本 （可以传入参数）