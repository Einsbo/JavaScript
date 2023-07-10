/**
 * Map 为 ECMAScript 带来了真正的健/值存储机制。
 */
// * 创建空映射
const m = new Map(); 

// * 使用嵌套数组初始化映射
const m1 = new Map([ 
  ["key1", "val1"],
  ["key2", "val2"],
  ["key3", "val3"]
]);
console.log(m1, m1.size);

// * 使用自定义迭代器初始化映射
const m2 = new Map({
  [Symbol.iterator]: function*() { 
    yield ["key1", "val1"];
    yield ["key2", "val2"];
    yield ["key3", "val3"];
  }
});
console.log(m2, m2.size);

// * set(), get(), has(), delete(), clear()
/* 初始化之后，可以使用 set() 在添加键值对，使用 get() 和 has() 进行查询，通过 size 属性获取映射中健值对的数量，
  使用 delete() 和 clear() 删除值 */
console.log(m.has("firstName"), m.get("firstName"), m.size); // false undefined 0
m.set("firstName", "Matt").set("lastName", "Frisbie");
console.log(m.has("firstName"), m.get("firstName"), m.size); // true 'Matt' 2
m.delete("firstName"); // 只删除这一个健值对
console.log(m.has("firstName"), m.has("lastName"), m.size); // false true 1
m.clear(); // 清楚这个映射实例中的所有健值对
console.log(m.has("firstName"), m.has("lastName"), m.size); // false false 0

// set() 方法返回映射实例，因此可以把多个操作符连接起来，包括初始化声明
const m3 = new Map().set("key1", "val1");
m3.set("key2", "val2").set("key3", "val3");
console.log(m3.size); // 3

/* Map 可以使用任何 JS 数据类型作为健。Map 内部使用 SameValueZero 比较操作（ECMAScript 规范内部定义，语言内无法
  使用），基本上相当于使用严格对象相等的标准来检查健的匹配性 */
const m4 = new Map();

const functionKey = function() {};
const symbolKey = Symbol();
const objectKey = new Object();

m4.set(functionKey, "functionValue").set(symbolKey, "symbolValue").set(objectKey, "objectValue");
console.log(m4.get(functionKey), m4.get(symbolKey), m4.get(objectKey)); // functionValue symbolValue objectValue
console.log(m.get(function() {})); // undefined, SameValueZero 比较意味着独立实例不冲突

// ? 与严格相等一样，在映射中用作健和值的对象及其他”集合“类型，在自己的内容或属性被修改时仍然保持不变
const m5 = new Map();
const objKey = {}, objVal = {}, arrKey = [], arrVal = [];
m5.set(objKey, objVal).set(arrKey, arrVal);
objKey.foo = "foo";
objVal.bar = "bar";
arrKey.push("foo");
arrVal.push("bar");
console.log(m5.get(objKey), m5.get(arrKey)); // {bar: "bar"} ["bar"]

// * SameValueZero 比较也可能导致意想不到的冲突
const m6 = new Map();
const a = 0/""; // NaN
const b = 0/""; // NaN
pz = +0;
nz = -0;
console.log(a === b, pz === nz); // false true
m6.set(a, "foo").set(pz, "bar");
console.log(m6.get(b), m6.get(nz)); // foo bar

// ! 顺序与迭代 —— Map 实例会维护健值对的插入顺序，因此可以根据插入顺序执行迭代操作
// * entries(), Symbol.iterator
/* 映射实例可以提供一个迭代器（Iterator），能以插入顺序生成 [key, value] 形式的数组，可以通过 entries() 方法或
  Symbol.iterator 属性（引用 entries()）取得这个迭代器。*/
const m7 = new Map([
  ["key1", "val1"],
  ["key2", "val2"],
  ["key3", "val3"]
]);
console.log(m7.entries === m[Symbol.iterator]); // true
for (const pair of m7.entries()) {
  console.log(pair); // ['key1', 'val1'] ['key2', 'val2'] ['key3', 'val3']
}
for (const pair of m7[Symbol.iterator]()) {
  console.log(pair); // 与上相同
}

// 可以直接对映射实例使用扩展操作，把映射转换为数组
console.log([...m7]); // [['key1', 'val1'], ['key2', 'val2'], ['key3', 'val3']]