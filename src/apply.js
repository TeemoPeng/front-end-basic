Function.prototype.myApply = function(obj){
    let context = obj || window
    context.fn = this
    let args = arguments[1] ? arguments[1] : []
    const result = context.fn(...args)
    delete context.fn
    return result
}

const A = {
    name: 'A',
    getName: function(msg1, msg2 = ''){
        return `${msg1} ${msg2} ${this.name}`
    }
}

const B = {
    name: 'B'
}

console.log(A.getName.myApply(B, ['hello', 'world']))