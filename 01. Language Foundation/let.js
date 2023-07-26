/* let 和 var 的作用差不多，最明显的区别是，let 声明的范围是块作用域，而 var 是函数作用域。 */

// var name = "Matt";
// let age = 26;
// console.log(name, age); // Matt, 26
// console.log(name, age); // Matt, Uncaught ReferenceError: age is not defined

/* 1. 暂时性死区 —— let 变量不会在作用域中被提升 */
// console.log(name, age); // undefined, Cannot access 'age' before initialization
// var name = "Asuka"; // name 会被提升
// let age = 27; // age 不会被提升

/* 2. 全局声明 —— let 在全局作用域中声明的变量不会成为 window 对象的属性。不过 let 声明仍然是在全局作用域中发生的，
  相应变量会在页面的声明周期内存续。为了避免 SyntaxError 必须确保页面不会重复声明同一个变量。 */
var name = "Matt";
let age = 26;
console.log(window.name, window.age); // Matt, undefined

/* 3. for 中的 let —— let 的作用域是块级的，它的行为非常适合在循环中声明迭代变量，因为 var 会泄漏到循环外部 */
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0); // 5, 5, 5, 5, 5
}
console.log(i); // 5, i 泄漏到了这里

for (let j = 0; j < 5; j++) {
  // JS 引擎在后台会为每个迭代循环声明一个新的迭代变量，每个 setTimeout 引用的都是不同的变量实例
  setTimeout(() => console.log(j), 0); // 0, 1, 2, 3, 4
}
// console.log(j); // Uncaught ReferenceError: j is not defined


/* 4. 如果 for 每次迭代只是创建一个新变量，可以用 const */
for (const key in { a: 1, b: 2 }) {
  console.log(key);
} // a, b

for (const value of [1, 2, 3, 4, 5]) {
  console.log(value);
} // 1, 2, 3, 4, 5

// const 声明只应用到顶级原语或对象，换句话说，赋值为对象的 const 变量不能再被重新赋值为其他引用值，但对象的健不受限制
// 如果想让整个对象都不能修改，可以使用 Object.freeze() ->  const o3 = Object.freeze({x: 1});
const o1 = {};
// o1 = {}; // TypeError: Assignment to constant variable.
o1.name = "Jake";
console.log(o1.name); // "Jake"


/* 5. 作用域与上下文 —— 使用 var 声明变量时，变量会被自动添加到最接近的上下文。在函数中最接近的上下文就是函数的局部上
  下文。如果变量未经声明就被初始化了，那么它就会被自动添加到全局上下文。 */
// function add(num1, num2) {
//   var sum = num1 + num2; // 如果去掉这里的 var 不声明 sum 而直接使用那么 sum 会被添加到全局上下文
//   return sum; 
// }

// let result = add(10, 20);
// console.log(sum);

// var 声明会被拿到函数或全局作用域的顶部，位于作用域中所有代码之前，这个现象叫做 “提升”
function fn1() {
  console.log(name); // undefined 而不是 Reference Error
  var name = "Jake"
};
fn1();



