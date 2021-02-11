let source = { a: { b: { c: 1 } }, d: 2, e: () => {}, f: undefined, g: NaN, h: new Date(), j: Symbol(1)}
function deepCopy(source) {
    let target = {}
    for (let key in source) {
        if (source[key] === 'object') {
            deepCopy(source[key])
        }else {
            target[key] = source[key]
        }
    }
    return target
}

const target = deepCopy(source)
console.log('target:', target)