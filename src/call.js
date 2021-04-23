Function.prototype.myCall = function(obj){
    let context = obj || window
    context.fn = this
    let args = []
    for(let i = 1; i < arguments.length; i++){
        args.push(arguments[i])
    }

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

console.log(A.getName.myCall(B, 'hello', 'world'))