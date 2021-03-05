Function.prototype.myBind = function(obj){
    if (typeof this !== 'function') {
        throw new Error('this must be function')
    }
    const self = this    
    const args = Array.prototype.slice.call(arguments, 1)
    const fBound = function(){
        const bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(obj, args)
    }
    if (this.prototype) {
        fBound.prototype = Object.create(this.prototype)
    }
    return fBound
}

const A = {
    name: 'A',
    getName: function(){
        return this.name
    }
}
const B = {
    name: 'B'
}

A.getName.myBind(B, 'test')