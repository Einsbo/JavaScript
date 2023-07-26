/**
 * ES6 新增的迭代器和扩展操作服对集合引用类型特别有用，这些新特性让集合类型之间相互操作、复制和修改变得异常方便。
 */

// ! 有 4 种原生集合类型定义了默认迭代器：Array, 所有定型数组, Map, Set
// 这意味着上述所有类型都支持顺序迭代，都可以传入 for-of 循环
let iterableThings = [
  Array.of(1, 2),
  typedArr = Int16Array.of(3, 4),
  new Map([[5, 6], [7, 8]]),
  new Set([9, 10])
];

for (const iterableThing of iterableThings) {
  for (const x of iterableThing) {
    console.log(x); // 1, 2, 3, 4, [5, 6], [7, 8], 9, 10
  }
}

// ! 这些类型都兼容扩展运算符，扩展运算符在对可迭代对象执行浅复制时特别有用，只需简单的语法就可以复制整个对象
let arr1 = [1, 2, 3];
let arr2 = [...arr1];
console.log(arr1, arr2, arr1 === arr2); // [1, 2, 3], [1, 2, 3], false

// * 对于期待可迭代对象的构造函数，只需传入一个可迭代对象就可以实现复制
let map1 = new Map([[1, 2], [3, 4]]);
let map2 = new Map(map1);
console.log(map1, map2); // Map(2) {1 => 2, 3 => 4}, Map(2) {1 => 2, 3 => 4}

// * 也可以构建数组的部分元素
arr2 = [0, ...arr1, 4, 5];
console.log(arr2); // [0, 1, 2, 3, 4, 5]

// * 浅复制意味着只会复制对象引用
arr1 = [{}];
arr2 = [...arr1];
arr1[0].foo = "bar";
console.log(arr2[0]); // {foo: 'bar'}

// ? 上面的这些类型都支持多种构建方法，比如 Array.of() 和 Array.from() 静态方法，在与扩展操作符一起使用时，可以
// ? 非常方便的实现相互操作
arr1 = [1, 2, 3];

// * 把数组复制到定型数组
let typedArr1 = Int16Array.of(...arr1);
let typedArr2 = Int16Array.from(arr1);
console.log(typedArr1, typedArr2); // Int16Array [1, 2, 3], Int16Array [1, 2, 3]

// * 把数组复制到映射（Map）
let map = new Map(arr1.map((x) => [x, 'val1' + x]));
console.log(map); // Map(3) {1 => 'val11', 2 => 'val12', 3 => 'val13'}

// * 把数组复制到集合（Set）
let set = new Set(typedArr2);
console.log(set); // Set(3) {1, 2, 3}

// * 把集合复制回数组
arr2 = [...set];
console.log(arr2); // [1, 2, 3]