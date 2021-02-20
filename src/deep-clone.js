const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)

const deepClone = (obj, hash = new WeakMap()) => {
    if (obj.constructor === Date) return new Date(obj)
    if (obj.constructor === RegExp) return new RegExp(obj)
    if (hash.has(obj)) return hash.get(obj)

    const allDesc = Object.getOwnPropertyDescriptors(obj)
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)

    hash.set(obj, cloneObj)

    for (let key of Reflect.ownKeys(obj)) {
        cloneObj[key] = (isComplexDataType(obj) && typeof obj[key] !== 'function') ? deepClone(obj[key], hash) : obj[key]
    }

    return cloneObj
}