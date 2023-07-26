/**
 * ECMAScript 数组是一组有序的数组，但和其他语言不同的是，数组中每个槽位可以存储任意类型的数据。这意味着可以创建一个
 * 数组，它的第一个元素是字符串，第二个元素是数值，第三个元素是对象。ECMAScript 数组也是动态大小的，会随着数据添加而
 * 自动增长。
 */

// ! 创建数组
// * Array 构造函数 —— 一般不会使用
let colors1 = new Array(); // 可以省略 new 
let colors2 = Array(20); // 如果传入的是数值的话，则创建了 20 个槽位的数组
let colors3 = Array("red", "blue", "green"); // 传入的非数值的话，则将传入的值作为元素

// * 数组字面量
let colors = ["red", "blue", "green"]; 
let name = []; // 空数组
let values = [1, 2,]; // 2 个元素

// ? form() 和 of()
/* ES6 新增的用于创建数组的静态方法，form() 用于将类数组结构转换为数组实例，第一个参数是一个类数组对象，即任何可迭代
  的结构，或者有一个 length 属性和可索引元素的结构；of() 用于将一组参数转换为数组实例。*/

// 字符串会被拆分成单字符串数组
console.log(Array.from("Matt")); // ['M', 'a', 't', 't'] 

// 可以使用 form() 将集合或映射转换为一个新数组
const m = new Map().set(1, 2).set(3, 4);
const s = new Set().add(1).add(2).add(3).add(4);
console.log(Array.from(m), Array.from(s)); // [[1, 2], [3, 4]]  [1, 2, 3, 4]

// Array.from() 对现有数组执行浅复制
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1);
console.log(a1, a1 === a2); // [1, 2, 3, 4] false

// 可以使用任何可迭代对象
const iter = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
  }
};
console.log(Array.from(iter)); // [1, 2, 3, 4]

// arguments 对象可以被轻松地转换为数组
function getArgsArray() {
  return Array.from(arguments);
}
console.log(getArgsArray(1, 2, 3, "function")); // [1, 2, 3, "function"]

// from() 也可以转换带有必要属性的自定义对象
const arrayLikeObject = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  length: 4
};
console.log(Array.from(arrayLikeObject)); // [1, 2, 3, 4]

/* Array.from() 还接收第二个可选的映射函数参数。这个函数可以直接增强新数组的值，而无需创建中间数组。还可以接收第三个
  可选参数，用于指定映射函数中 this 的值，但这个重写的 this 值在箭头函数中不适用 */
const b1 = [1, 2, 3, 4];
const b2 = Array.from(b1, x => x ** 2);
const b3 = Array.from(b1, function(x) {return x ** this.exponent}, {exponent: 2});
console.log(b2, b3); // [1, 4, 9, 16] [1, 4, 9, 16]

// Array.of() 可以把一组参数转换为数组，它用于替代 Array.prototype.slice.call(arguments)
console.log(Array.of(1, 2, 3, 4)); // [1, 2, 3, 4]
console.log(Array.of(undefined)); // [undefined]

// ! 数组空位
const options = [1, , , , 5]; 
console.log(options, options.length); // [1, empty * 3, 5] 5

// ES6 将空位当成存在的元素，值为 undefined
for (const option of options) { console.log(option === undefined);} // false, true * 3, false
console.log(Array.of(...[,,,])); // [undefined, undefined, undefined]
for (const [index, value] of options.entries()) { console.log(value);} // 1, undefined * 3, 5
// ES6 之前的方法会忽略这个空位，但具体的行为会因方法而异
console.log(options.map(() => 6)); // [6, empty * 3, 6] | map() 会跳过空位置
console.log(options.join('-')); // "1---5" | join() 视空位置为空字符串

// ! 数组索引 
// 如果在数组索引处放置一个大于数组最大长度的值，并给此值赋值，那么数组就会自动扩展
colors = ["red", "blue", "green"]; 
console.log(colors.length); // 3
colors[3] = "brown";
console.log(colors.length); // 4

// ? 数组元素数量保存在 length >= 0 中，这个值可写的，可以通过修改它从数组末尾删除或添加元素
colors.length = 2;
console.log(colors[2]); // undefined
colors[colors.length] = "black" // 使用 length 可以轻松的在数组末尾添加元素
console.log(colors[2]); // "black"

// ! 检测数组 —— 使用 Array.isArray() 判断一个值是否为数组
if (Array.isArray(colors)) {
  // 操作数组
}

// ! 迭代器方法 —— keys(), values(), entries()
// 因为这些方法都返回迭代器，所以可以将它们的内容通过 Array.from() 直接转换为数组实例
const a = ["foo", "bar", "baz", "qux"];
console.log(Array.from(a.keys())); // [0, 1, 2, 3]
console.log(Array.from(a.values())); // ["foo", "bar", "baz", "qux"]
console.log(Array.from(a.entries())); // [[0, "foo"], [1, "bar"], [2, "baz"], [3, "qux"]]

for (const [idx, element] of a.entries()) { // 使用 ES6 的解构可以很容易的在循环中拆分健值对
  console.log(idx, element); // 0 'foo', 1 'bar', 2 'baz', 3 'qux'
}

// ! 复制和填充方法 —— copyWithin(), fill()
const zeros = [0, 0, 0, 0, 0];
zeros.fill(5); // 用 5 填充 zeros
console.log(zeros); // [5, 5, 5, 5, 5]
zeros.fill(6, 3); // 用 6 填充索引大于等于 3 的元素
console.log(zeros); // [5, 5, 5, 6, 6]
zeros.fill(7, 1, 4); // 用 7 填充索引大于等于 1 且小于 3 的元素
console.log(zeros); // [5, 7, 7, 7, 6]

// copyWithin() 会按照指定范围浅复制数组中的部分内容，然后将它们插入到指定索引开始的位置
let ints, reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
reset();
console.log(ints.copyWithin(5)); // [0, 1, 2, 3, 4, 0, 1, 2, 3, 4] 复制 0 开始的内容，插入到 5 开始的位置
reset();
console.log(ints.copyWithin(0, 5)); // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9] 复制 5 开始插入到 0 开始
console.log(ints.copyWithin(4, 0, 3)); // [5, 6, 7, 8, 5, 6, 7, 7, 8, 9] 复制 0 到 3 插入到 4 开始
// JS 引擎在插值前会完整复制范围内的值，因此复制期间不存在重写的风险
console.log(ints.copyWithin(2, 0, 6)); // [5, 6, 5, 6, 7, 8, 5, 6, 8, 9] 

// ! 转换方法 —— toString(), valueOf()
// toString() 返回由数组中每个值等小字符串拼接而成的由逗号分隔的字符串，valueOf() 返回的还是数组本身
colors = ["red", "blue", "green"]; 
console.log(colors.toString()); // red,blue,green 
console.log(colors.valueOf()); // ['red', 'blue', 'green']

// 如果想改变分隔符，可以使用 join()
console.log(colors.join("||")); // red||blue||green

// ? 如果数组中某一项为 null 或 undefined，则在 join(), toString(), valueOf() 返回的结果为空字符串

// ! 栈方法 —— 栈是 LIFO 的解构
// * push(), pop() —— 实现类似栈的行为，返回数组的新长度
colors = new Array();
let count = colors.push("red", "green"); // 推入两项
console.log(count, colors); // 2 ["red", "green"]
count = colors.push("black"); // 再推入一项
let item = colors.pop(); // 推出最后一项并拿到值
console.log(item, colors.length); // black 2

// ! 队列方法 —— 队列以 FIFO 形式限制访问，在末尾添加数据，在开头获取数据
// * push(), shift(), unshift() —— 返回数组的新长度
item = colors.shift(); // 取得第一项
console.log(item, colors.length); // red 1
count = colors.unshift("red", "green"); // 在数组开头推入两项，与 shift() 行为相反
console.log(count, colors); // 3, ["red", "green", "green"]

// ! 排序方法
// * reverse(), sort() —— 前者将数组元素反向排列, sort() 则更灵活
values = [1, 2, 3, 4, 5];
values.reverse(); // reverse() 不够灵活，所以才有了 sort() 方法
console.log(values); // [5, 4, 3, 2, 1]

/* sort() 会在每一项上调用 String() 转型函数，然后比较字符串来决定顺序。默认行为大部分情况下是不合适的，所以 sort()
  方法可以接收一个比较函数，用于判断哪个值应该排在前面 */
values = [0, 1, 5, 10, 15];
values.sort();
console.log(values); // [0, 1, 10, 15, 5]

values.sort((value1, value2) => {
  return value1 - value2; // 适用于数组元素为数值的情况，如果为其他形式则需要自己书写比较逻辑
})
console.log(values); // [0, 1, 5, 10, 15]

// ! 操作方法
// * concat() —— 在现有数组全部元素基础上创建一个新数组
/* 它会创建当前数组的副本，然后再把它的参数添加到数组末尾，最后返回这个新构建的数组。如果传入一个或多个数组，它会把数组
  的每一项都添加到结果数组，如果参数不是数组，则直接添加到数组末尾 */
colors = ["red", "green", "blue"];
colors2 = colors.concat("yellow", ["black", "brown", ["red"]]);
console.log(colors); // ['red', 'green', 'blue'] 
console.log(colors2); // ['red', 'green', 'blue', 'yellow', 'black', 'brown']

/* 打平数组参数的行为可以重写，方法是在参数数组上指定 Symbol.isConcatSpreadable，这个符号能阻止 concat() 打平参
  数数组，如果把这个值设为 true 则可以强制打平类数组对象： */
colors = ["red", "green", "blue"];
let newColors = ["black", "brown"];
let moreNewColors = {
  [Symbol.isConcatSpreadable]: true,
  length: 2,
  0: "pink",
  1: "cyan"
};
newColors[Symbol.isConcatSpreadable] = false;
console.log(colors); // ['red', 'green', 'blue']
console.log(colors.concat("yellow", newColors)); // ['red', 'green', 'blue', 'yellow', ["black", "brown"]]
console.log(colors.concat(moreNewColors)); // ['red', 'green', 'blue', 'pink', 'cyan']

// * slice() —— 创建一个包含原数组中一个或多个元素的新数组
/* 它可以接收一个或两个参数：返回元素的开始索引和结束索引，[开始索引, 结束索引)，该操作不影响原数组 */
colors = ["red", "green", "blue", "yellow", "purple"];
colors2 = colors.slice(1);
colors3 = colors.slice(1, 4);
console.log(colors2, colors3); // ['green', 'blue', 'yellow', 'purple'] ['green', 'blue', 'yellow']

// * splice() —— 可以说是最强大的数组方法，可以完成删除、插入、替换三种功能。返回一个数组，它包含从原数组中删除的元素
/* splice(start, deleteCount, item1, item2, itemN) */
colors = ["red", "green", "blue"];
let removed = colors.splice(0, 1); // 删除第一项
console.log(colors, removed); // ["green", "blue"] ["red"]
removed = colors.splice(1, 0, "yellow", "orange"); // 在位置 1 处插入两个元素
console.log(colors, removed); // ['green', 'yellow', 'orange', 'blue'] []
removed = colors.splice(1, 1, "red", "purple"); // 在位置 1 处删除一个元素后插入两个元素
console.log(colors, removed); // ['green', 'red', 'purple', 'orange', 'blue'] ['yellow']

// ! 搜索和位置方法
// * 严格相等：indexOf(), lastIndexOf(), includes()
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
console.log(numbers.indexOf(4), numbers.lastIndexOf(4), numbers.includes(4)); // 3 5 true
console.log(numbers.indexOf(4, 4), numbers.lastIndexOf(4, 4), numbers.includes(4, 7)); // 5 3 false

let person = {name: "Nicholas"};
let people = [{name: "Nicholas"}];
let morePeople = [person];
console.log(people.indexOf(person), morePeople.indexOf(person)); // -1 0
console.log(people.includes(person), morePeople.includes(person)); // false true

// * 断言函数 —— find(), findIndex(), ECMAScript 允许按照定义的断言函数搜索数组，每个索引都会调用这个函数
/* 函数的返回值决定了相应索引的元素是否被认为匹配，断言函数接收 3 个参数：元素、索引和数组本身。find() 返回第一个匹配
  的元素，findIndex() 返回第一个匹配元素的索引。找到匹配项后，这两个函数都不再继续搜索 */
people = [
  {name: "Matt", age: 27},
  {name: "Nicholas", age: 29}
];
console.log(people.find((element, index, array) => element.age < 28)); // {name: 'Matt', age: 27}
console.log(people.findIndex((element, index, array) => element.age < 28)); // 0

const evens = [2, 4, 6];
evens.find((element, index, array) => {
  console.log(element, index, array); // 2 0 [2, 4, 6] | 4 1 [2, 4, 6]
  return element === 4;
});

// ! 迭代方法 —— 对数组的每一项都运行传入的函数，传入每个方法的函数接收 3 个参数：数组元素、元素索引和数组本身
// * every() —— 如果对每一项函数都返回 true，则这个方法返回 true
// * some() —— 如果有一项函数返回 true，则这个方法返回 true
// * filter() —— 函数返回 true 的项会组成数组后返回
// * forEach() —— 每一项运行函数，无返回值              这些方法都不改变调用它们的数组
// * map() —— 返回由每次函数调用的结果构成的数组
numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
console.log(numbers.every((item, index, array) => item > 2)); // false
console.log(numbers.some((item, index, array) => item > 2)); // true
console.log(numbers.filter((item, index, array) => item > 2)); // [3, 4, 5, 4, 3]
console.log(numbers.map((item, index, array) => item * 2)); // [2, 4, 6, 8, 10, 8, 6, 4, 2]
numbers.forEach((item, index, array) => {
  // do something, no return
})

// ! 归并方法 —— 迭代数组的所有项，并在此基础上构建一个最终返回值
// * reduce() —— 从数组第一项开始遍历到最后一项
// * reduceRight() —— 从数组最后一项开始遍历到第一项
/* 这两个函数接收两个参数：对每一项都会运行的归并函数，以及可选的归并起点（初始值）。传入的归并函数接收 4 个参数：上一
  个归并值、当前项、当前项的索引和数组本身。这个函数返回的任何值都会作为下一次调用同一个函数的第一个参数。如果没有给这
  两个方法传入可选的第二个参数（归并起点），则第一次迭代将从数组的第二项开始，因此传给归并函数的第一个参数是数组的第一
  项，第二个参数是数组的第二项。*/
values = [1, 2, 3, 4, 5];
console.log(values.reduce((prev, cur, index, array) => prev + cur)); // 15
console.log(values.reduceRight((prev, cur, index, array) => prev + cur, 5)); // 20

