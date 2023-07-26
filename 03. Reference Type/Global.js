/**
 * Global 对象是 ECMAScript 中最特别的对象，因为代码不会显式的访问它。事实上，不存在全局变量或全局函数这种东西。在
 * 全局作用域中定义的变量和函数都会变成 Global 对象的属性。
 */

// ! URL 编码方法
/* encodeURI() 不会编码属于 URL 组建的特殊字符，比如冒号、斜杠、问号和井号，而 encodeURIComponent() 会编码它发
  现的所有非标准字符 */
let uri = "http://www.wrox.com/illegal value.js#start";

console.log(encodeURI(uri)); // "http://www.wrox.com/illegal%20value.js#start"
console.log(encodeURIComponent(uri)); // "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.js%23start"

/* 与上面两个函数相对应的是 decodeURI() 和 decodeURIComponent() */
let uri1 = "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.js%23start";
console.log(decodeURI(uri1)); // "http%3A%2F%2Fwww.wrox.com%2Fillegal value.js%23start"
console.log(decodeURIComponent(uri1)); // "http://www.wrox.com/illegal value.js#start"

// TODO eval() 方法

// ! Global 对象属性
/* undefined NaN Infinity Object Array Function Boolean String Number Date RegExp Symbol Error
  EvalError RangeError ReferenceError SyntaxError TypeError URIError */

// ! window 对象 —— Global 对象的代理，但它在 JS 中远不止实现了 ECMAScript 的 Global 对象那么简单
/* 所有全局作用域中声明的变量和函数都变成了 window 的属性 */
var color = "red";

function sayColor() {
  console.log(window.color);
}
window.sayColor(); // "red"


