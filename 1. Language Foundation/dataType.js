/* typeof 运算符会返回以下几个字符串之一：undefined boolean string number object function symbol */

console.log(typeof "some string"); // "string"
console.log(typeof 96); // "number"
console.log(typeof null); // "object"

/* 1. Undefined —— 声明但未初始化变量的值为 undefined */
let message;
console.log(message == undefined);

// 无论是未声明还是未初始化，typeof 返回的都是 "undefined"
console.log(typeof age);

/* 2. Null —— null 表示一个空对象指针，任何时候，只要变量要保存对象，而当时没有具体对象可保存就要用 null 填充该变量 */

/* 3. Boolean —— 能转为 false 的值为：false "" 0 NaN null undefined */

/* 4. String */
// 摸板字面量 `abc` —— 定义模版
let pageHTML = `
<div>
  <a href="#">
    <span>Jake</span>
  </a>
</div>
`;

// 字符串插值 `{value}` —— 所有的插值都会使用 toString() 强制转换为字符串
let value = 5;
let exponent = "second";
let interpolatedTemplateLiteral = `${value} to the ${exponent} power is ${value * value}`;

/* Symbol —— not learn */

/* Object */
/* Object 实例本身没有什么用，但是理解它的概念还是比较重要的。每个 Object 实例都有如下属性和方法：
  constructor 用于创建当前对象的函数，在下面的例子中这个属性的值为 Object()
  hasOwnProperty(propertyName) 用于判断当前对象实例（不是原型）上是否有给定的属性，属性名必须为字符串或符号
  isPrototypeOf(object) 用于判断当前对象是否为另一个对象的原型
  propertyIsEnumerable(propertyName) 用于判断给定的属性是否可以使用 for-in 枚举。属性名必须为字符串 
  toLocaleString() 返回对象的字符串表示，该字符串反应对象所在的本地化执行环境
  toString() 返回对象的字符串表示
  valueOf() 返回对象对应的字符串、数值或布尔值表示，通常与 toString() 的返回值相同
 */
let o = new Object();
console.log(o);