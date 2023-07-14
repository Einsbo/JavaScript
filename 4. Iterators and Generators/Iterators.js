// JS 中，计数循环就是一种简单的迭代
for (let i = 1; i <= 5; i++) {
  console.log(i); // 1, 2, 3, 4, 5
}

// * 迭代会在一个有序集合上进行，有序意味着集合中所有项都可以按照既定的顺序被遍历到，特别是开始和结束项有明确的定义
let collection = ['foo', 'bar', 'baz']; // 数组时 JS 中有序集合的典型例子
for (let index = 0; index < collection.length; index++) {
  console.log(collection[index]); // foo, bar, baz
}

/* 因为数组有已知的长度，且数组每一项都可以通过索引获取，所以整个数组可以通过递增索引来遍历。由于以下原因，通过这种循环
  来执行迭代并不理想：1. 迭代之前需要事先知道如何使用数据结构，数组的情况并不适用于所有数据结构。2. 遍历顺序并不是数据
  结构固有的，通过递增索引来访问数据是特定于数组类型的方式，并不适用于其他具有隐形顺序的数据结构。 
   ES5 新增了 Array.prototype.forEach() 方法，向通用迭代需求更进一步（但仍不理想）。该方法解决了单独记录索引和通
  过数组对象取得值的问题，但没有方法标识迭代何时终止，因此这个方法只适用于数组，且回调结构比较笨拙。 */
collection.forEach((item) => console.log(item)); // foo, bar, baz

// ! 迭代器模式描述了一个方案，可以把有些结构称为“可迭代对象”，它们实现了正式的 Iterable 接口
/* 基本上，可以把可迭代对象理解成数组或集合这样的集合类型的对象，它们包含的元素是有限的，且都具有无歧义的遍历顺序 */
// 数组的元素是有限的，递增索引可以按序访问每个元素
let arr  = [3, 1, 4];

// 集合的元素是有限的，可以按插入顺序访问每个元素
let set = new Set().add(3).add(1).add(4);

// ! 实现 Iterable 接口（可迭代协议）要同时具备支持迭代的自我识别能力和创建实现 Iterable 接口的对象的能力
/* 在 ES 中，这意味着必须暴露一个属性作为“默认迭代器”，而且这个属性必须使用特殊的 Symbol.iterator 作为健。这个默认
  迭代器属性必须引用一个迭代器工厂函数，调用这个工厂函数必须返回一个新迭代器。
   很多内置类型都实现了 Iterator 接口：字符串、数组、映射、集合、arguments 对象、NodeList 等DOM集合类型 */
// * 检查是否存在默认迭代器属性可以暴露这个工厂函数
let num = 1, obj = {};
// 这两种类型没有实现迭代器工厂函数
console.log(num[Symbol.iterator], obj[Symbol.iterator]); // undefined undefined

let str = "abc", map = new Map().set('a', 1).set('b', 2).set('c', 3);
let els = document.querySelectorAll('div');
set = new Set().add('a').add('b').add('c'),
arr = ['a', 'b', 'c'];

// 这些类型都实现了迭代器工厂函数
console.log(str[Symbol.iterator]); // ƒ [Symbol.iterator]() { [native code] }
console.log(arr[Symbol.iterator]); // ƒ [Symbol.iterator]() { [native code] }
console.log(map[Symbol.iterator]); // ƒ [Symbol.iterator]() { [native code] }
console.log(set[Symbol.iterator]); // ƒ [Symbol.iterator]() { [native code] }
console.log(els[Symbol.iterator]); // ƒ [Symbol.iterator]() { [native code] }

// 调用这个工厂函数会生成一个迭代器
console.log(str[Symbol.iterator]()); // StringIterator {}
console.log(arr[Symbol.iterator]()); // Array Iterator {}
console.log(map[Symbol.iterator]()); // MapIterator {'a' => 1, 'b' => 2, 'c' => 3}
console.log(set[Symbol.iterator]()); // SetIterator {'a', 'b', 'c'}
console.log(els[Symbol.iterator]()); // Array Iterator {}

/* 实际代码编写时不需要显式调用这个工厂函数来生成迭代器。实现可迭代协议的所有类型都会自动兼容接收可迭代对象的任何语言
  特性。接收可迭代对象的原生语言特性包括：
    for-of 循环
    数组解构
    扩展运算符
    Array.from()
    创建集合
    创建映射
    Promise.all() 接收由期约组成的可迭代对象
    Promise.race() 接收由期约组成的可迭代对象
    yield* 操作符，在生成器中使用
   这些原生语言结构会在后台调用提供的可迭代对象的这个工厂函数，从而创建一个迭代器
  */
arr = ['foo', 'bar', 'baz'];

// * for-of
for (const el of arr) {
  console.log(el); // foo bar baz
}

// * 数组解构
let [a, b, c] = arr;
console.log(a, b, c); // foo, bar, baz

// * 扩展运算符
let arr2 = [...arr];
console.log(arr2); // ['foo', 'bar', 'baz']

// * Array.from()
let arr3 = Array.from(arr);
console.log(arr3); // ['foo', 'bar', 'baz']

// * Set 构造函数
set = new Set(arr);
console.log(set); // Set(3) {'foo', 'bar', 'baz'}

// * Map 构造函数
let pairs = arr.map((item, index) => [item, index]);
console.log(pairs); // [['foo', 0], ['bar', 1], ['baz', 2]]
map = new Map(pairs);
console.log(map); // Map(3) {'foo' => 0, 'bar' => 1, 'baz' => 2}

// 如果对象原型链上的父类实现了 Iterable 接口，那这个对象同样也实现了该接口
class FooArray extends Array {};
let fooArr = new FooArray('foo', 'bar', 'baz');
for (const el of fooArr) {
  console.log(el); // foo bar baz
}

// TODO 迭代器协议

// TODO 自定义迭代器

// TODO 提起终止迭代器