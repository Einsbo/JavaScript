/* 递归函数通常的形式是一个函数通过名车给你调用自己 */
function factorial(num) {
  if (num <= 1) return 1;
  else return num * factorial(num - 1);
}
// 这是经典的递归阶乘函数，但如果把这个函数赋值给其他变量就会出问题
if (!true) {
  let anotherFactorial = factorial;
  factorial = null;
  // console.log(anotherFactorial(4)); // TypeError: factorial is not a function at factorial
}

// * 在编写递归函数时，arguments.callee 是引用当前函数的首选
// 在写递归函数时使用 arguments.callee 可以避免这个问题，
function factorial(num) {
  if (num <= 1) return 1;
  else return num * arguments.callee(num - 1);
}

/* 不过严格模式下无法使用 arguments.callee，此时可以使用命名函数表达式达到目的 */
if (true) {
  const factorial = (function f(num) {
    if (num <= 1) return 1;
    else return num * f(num - 1);
  });
} 

// ! 尾调用优化
/* ES6 新增了一项内存管理优化机制让 JS 引擎在满足条件是可以重用栈帧 */
if (true) {
  // 这项优化非常适合“尾调用”，即外部函数的返回值是一个内部函数的返回值
  function outerFunction() {
    return innerFunction(); // 尾调用
  }

  /**
   * * 在 ES6 优化之前，执行上面的代码会在内存中发生如下操作
   * 1. 执行到 outerFunction 函数体，第一个栈帧被推到栈上
   * 2. 执行 outerFunction 函数到 return 语句，计算返回值必须先计算 innerFunction
   * 3. 执行到 innerFunction 函数体，第二个栈帧被推到栈上
   * 4. 执行 innerFunction 函数计算其返回值
   * 5. 将返回值传回 outerFunction 然后 outerFunction 在返回值
   * 6. 将栈帧弹出栈外
   * 
   * * 在 ES6 优化之后，执行这个例子会在内存发生下面的操作
   * 1. 执行到 outerFunction 函数体，第一个栈帧被推到栈上
   * 2. 执行 outerFunction 函数到 return 语句，计算返回值必须先计算 innerFunction
   * 3. 引擎发现把第一个栈帧弹出栈外也没问题，因为 innerFunction 的返回值也是 outerFunction 的返回值
   * 4. 弹出 outerFunction 的栈帧
   * 5. 执行到 innerFunction 函数体，第二个栈帧被推到栈上
   * 6. 执行 innerFunction 函数计算其返回值
   * 7. 将 innerFunction 栈帧弹出栈外
   * 
   * 很明显，第一种情况没多调用一次嵌套函数就会多增加一个栈帧，而第二种情况下无论调用多少次嵌套函数只有一个栈帧。这就是
   * ES6 尾调用优化的关键：如果函数的逻辑允许基于尾调用将其销毁，则引擎就会那么做
   * 
   * * 尾调用优化的条件 —— 确定外部栈帧真的没有存在的必要了
   * 1. 代码在严格模式下执行
   * 2. 外部函数的返回值是对尾调用函数的调用
   * 3. 尾调用函数返回后不需要执行额外的逻辑
   * 4. 尾调用函数不是引用外部函数作用域中自由变量的闭包
   */

  // 下面展示了几个违反尾调用优化条件的函数，因此不符合尾调用优化的要求
  "use strict";
  function outerFunction() {
    innerFunction(); // 尾调用没有返回
  }

  function outerFunction() {
    let innerFunctionResult = innerFunction();
    return innerFunctionResult; // 尾调用没有直接返回
  }

  function outerFunction() {
    return innerFunction().roString(); // 尾调用返回后必须转型为字符串，有多余逻辑
  }

  function outerFunction() {
    let foo = 'bar';
    function innerFunction() {return foo;}

    return innerFunction(); // 尾调用是一个闭包
  }

  // * 下面是几个符合尾调用优化条件的例子
  function outerFunction(a, b) {
    return innerFunction(a + b); // 有优化，栈帧销毁前执行参数计算
  }
  
  function outerFunction(a, b) {
    if (a < b) return a;
    return innerFunction(a + b); // 有优化，初始返回值不涉及栈帧
  }

  function outerFunction(condition) {
    return condition ? innerFunctionA() : innerFunctionB(); // 有优化，两个内部函数都在尾部
  }

  /* 差异化尾调用和递归尾调用是容易让人混淆的地方。无论是递归尾调用还是非递归尾调用，都可以应用优化。引擎并不区分尾调用
    中调用的是函数自身还是其他函数。不过，这个优化在递归场景下的效果是最明显的，因为递归代码最容易在栈内存中迅速产生大
    量栈帧 */
}

// ! 尾调用优化的代码
if (!true) {
  /* 可以通过把简单的递归函数转换为待优化的代码来加深对尾调用优化的理解 */
  function fib(n) {
    /* 这个函数不符合尾调用优化的条件，因为返回语句中有一个相加操作，fib(n) 的栈帧数的内存复杂度是 O(n^2) */
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
  }
  console.log(fib(0)); // 0
  console.log(fib(1)); // 1
  console.log(fib(2)); // 1
  console.log(fib(3)); // 2
  console.log(fib(4)); // 3

  /* 解决这个问题的逻辑有很多，比如可以将其重构满足优化条件的形式，为此可以使用两个嵌套的函数，外部函数作为基础框架，内
    部函数执行递归 */
  "use strict";
  function fib(n) { // 基础框架
    return fibImpl(0, 1, n); 
  }

  function fibImpl(a, b, n) {
    if (n === 0) return a;
    return fibImpl(b, a + b, n - 1);
  }

  // 这样重构后，就可以满足尾调用优化的所有条件
}