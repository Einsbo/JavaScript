/**
 * ! Boolean，Number 和 String 被称为原始值包装类型。
 */

/* 每当用到某个原始值的方法或属性时，后台都会创建一个相应原始包装类型的对象，从而暴露出操作原始值的各种方法。 */
let s1 = "some text";
let s2 = s1.substring(2); // 以读模式访问，从过年内存中读取变量保存的值

/* 以读模式访问字符串值的任何时候，后台都会执行三步：1. 创建一个 String 类型对象，2. 调用实例上的特定方法，3. 销毁
  实例。上面三行相当于下方代码。此行为让原始值拥有对象的特点，对于布尔值和数值而言，这三步也会在后台发生。 */
// let t1 = new String("some text");
// let t2 = t1.substring(2);
// t1 = null;

/* 引用类型和原始值包装类型的主要区别在于对象的生命周期，在通过 new 实例化引用类型后，实例会再离开作用域时被销毁，而自
  动创建的原始值包装对象则只存在于访问它的那行代码执行期间，这意味着不能在运行时给原始值添加属性和方法： */
let t1 = "some text";
t1.color = "red"; // 这行代码运行时会临时创建一个 String 对象，但是下一行这个对象就立刻销毁掉
console.log(t1.color); // undefined

// ! Object 构造函数作为工厂方法，能够根据传入值的类型返回相应原始值包装类型的实例。
let obj = new Object("some text");
console.log(obj instanceof String); // true

/* 使用 new 调用原始值包装类型的构造函数与调用同名的转型函数并不一样。 */
let value = "25";
let number = Number(value); // 转型函数
console.log(typeof number); // "number"，number 中保存的是一个值为 25 的原始数值
let obj1 = new Number(value); // 构造函数
console.log(typeof obj); // "object"，obj 中保存的是一个 Number 的实例

// ! Boolean —— 建议永远不要使用 Boolean 对象。 

// ! Number —— 不建议直接实例化 Number 对象。在处理原始数值和引用数值时，typeof 和 instanceof 会返回不同结果。
let numberObject = new Number(10);
let numberValue = 10;
console.log(typeof numberObject, typeof numberValue); // object, number
console.log(numberObject instanceof Number, numberValue instanceof Number); // true, false

// ! String 
// * 提取子字符串: slice(indexStart, indexEnd), substring()
/* 这两个函数都接收一或两个参数，第一个参数表示子字符串开始的位置，第二个参数表示子字符串结束的位置。这两个函数不会修改
  调用它们的字符串，只会返回提取到的新字符串值。传入负值时，slice 以 string.length 与负值相加作为参数，substring 
  以 0 作为参数 */
let stringValue = "hello world";
console.log(stringValue.slice(3), stringValue.substring(3)); // "lo world", "lo world"
console.log(stringValue.slice(-3), stringValue.substring(-3)); // "rld", "hello world"

// * 定位子字符串: indexOf(searchString, position), lastIndexOf()
/* 这两个方法从字符串中搜索传入的字符串，并返回位置（未找到返回 -1），两者的区别在于一个从头向后找，一个从后向前找。如
  果有第二个参数则表示搜索开始的位置。 */
console.log(stringValue.indexOf("o"), stringValue.lastIndexOf("o")); // 4, 7
console.log(stringValue.indexOf("o", 4), stringValue.lastIndexOf("o", 4)); // 4, 4

// 可以利用第二个参数循环调用这两个函数，就可以在字符串中找到所有的目标子字符串
let tempString = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
let positions = new Array();
let pos = tempString.indexOf("e");

while (pos > -1) {
  positions.push(pos);
  pos = tempString.indexOf("e", pos + 1);
}

console.log(positions); // [3, 24, 32, 35, 52]

// * 字符串包含方法: startsWith(searchString, position), endsWith(), includes()
/* 这些方法都会从字符串中搜索传入的字符串，并返回一个表示是否包含的布尔值。startsWith() 从 0 开始检索，第二个参数表
  示开始搜索的位置；endsWith() 从 string.length - substring.length 开始检索，第二个参数当作字符串末尾的位置；
  includes() 检索整个字符串，第二个参数表示开始搜索的位置。 */
let message = "foobarbaz";
console.log(message.startsWith("foo"), message.startsWith("bar")); // true, false
console.log(message.endsWith("baz"), message.endsWith("bar")); // true, false
console.log(message.includes("bar"), message.includes("qux")); // true, false

// * trim() —— 创建字符串的一个副本，删除前、后所有空格符再返回结果
let stringValue1 = "   hello world  ";
let trimmedStringValue1 = stringValue.trim();
console.log(stringValue1, trimmedStringValue1); // "   hello world  ", "hello world"

// * 复制字符串 —— padStart(), padEnd() 如果小于制定长度，则在相应一边填充字符直至满足长度条件
let stringValue2 = "foo";
console.log(stringValue2.padStart(6), stringValue2.padStart(9, ".")); // "   foo", "......foo"
console.log(stringValue2.padStart(2), stringValue2.padStart(8, "bar")); // "foo", "barbafoo"
console.log(stringValue2.padEnd(6), stringValue2.padEnd(9, ".")); // "foo   ", "foo......"
console.log(stringValue2.padEnd(2), stringValue2.padEnd(8, "bar")); // "foo", "foobarba"

// * 字符串迭代与解构 —— 字符串原型上暴露了 @@iterator 方法表示可迭代字符串的每个字符
// 可以手动使用迭代器
let message1 = "abc";
let stringIterator = message1[Symbol.iterator]();

console.log(stringIterator.next()); // {value: "a", done: false}
console.log(stringIterator.next()); // {value: "b", done: false}
console.log(stringIterator.next()); // {value: "c", done: false}
console.log(stringIterator.next()); // {value: "undefined", done: true}

// 也可以在 for-of 循环中通过迭代访问每个字符
for (const c of "abcde") {
  console.log(c); 
} // a b c d e

// 有了迭代器字符串就可以通过解构操作符来解构了，这样可以更方便地把字符串分割为字符数组
console.log([...message1]); // ['a', 'b', 'c']

// * 字符串大小写转换: toLowerCase(), toUpperCase()
console.log(message1.toLowerCase()); // "abc"
console.log(message1.toUpperCase()); // "ABC"

// * 字符串模式匹配
// match() —— 接收一个参数，可以是正则表达式字符串也可以是 RegExp 对象
let text = "cat, bat, sat, fat";
let pattern = /.at/;

let matches = text.match(pattern); // 等价于 pattern.exec(text)
console.log(matches.index, matches[0], pattern.lastIndex); // 0, "cat", 0

// search() —— 参数与 match() 一样，返回第一个匹配模式的位置索引，没有则返回 -1
let position = text.search(/at/);
console.log(position); // 1

// replace() —— 简化字符串替换，第一个参数可以是 RegExp 对象或字符串，第二个参数是一个字符串或一个函数。如果第一个
//  参数是字符串，则只会替换第一个子字符串，要想替换所有子字符串，第一个参数必须为正则表达式并且带上全局标记
let result = text.replace("at", "ond");
console.log(result); // "cond, bat, sat, fat"

result = text.replace(/at/g, "ond");
console.log(result); // "cond, bond, sond, fond"

// split() —— 根据传入的分隔符将字符串拆分成数组，第二个参数可选，代表数组大小确保返回的数组不会超过制定大小
let colorText = "red,blue,green,yellow";
console.log(colorText.split(",")); // ['red', 'blue', 'green', 'yellow']
console.log(colorText.split(",", 2)); // ['red', 'blue']
console.log(colorText.split(/[^,]+/)); // ['', ',', ',', ',', '']