

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