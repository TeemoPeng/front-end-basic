// JSON.stringify 各种数据输入 - 输出

// undefined
JSON.stringify(undefined) // undefined
// Boolean
JSON.stringify(false) // 'false'
JSON.stringify(true) // 'true'
// String
JSON.stringify('test') //  string
// Number
JSON.stringify(3) // '3'
// Null
JSON.stringify(null) // 'null'

// ====================== 引用类型 

JSON.stringify({name: 'test', age: undefined})
