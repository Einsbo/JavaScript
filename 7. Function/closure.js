/**
 * * 闭包指的是那些引用了另一个函数作用域中变量的函数，通常在嵌套函数中实现。
 * 在调用一个函数时，会为这个函数创建一个执行上下文，并创建一个作用域链，然后用 arguments 和其他命名参数来初始化这个函
 * 数的活动对象。外部函数的活动对象是内部函数作用域链上的第二个对象，这个作用域链一直向外串起了所有包含函数的活动对象。
 * 直到全局执行上下文才终止
 * 
 * 函数执行时，每个执行上下文都会有一个包含其中变量的对象，全局上下文中的叫变量对象，它会在代码执行期间始终存在。而函数
 * 局部上下文中的叫做活动对象，只在函数执行期间存在。
 */

function makeFunc() {
  let name = "Mozilla"; // name 是一个被 makeFunc 创建的局部变量
  function displayName() {
    // displayName() 是内部函数形成闭包
    alert(name); // 使用了父函数中声明的变量
  }
  return displayName;
}
/* myFunc 是执行 makeFunc 时创建的 displayName 函数实例的引用，displayName 的实例维持了一个对它的词法环境（变量
  name 存在于其中）的引用。因此 myFunc 被调用时变量 name 仍然可用，其值 Mozilla 就被传递到 alert 中 */
let myFunc = makeFunc();

// * 在函数执行时，要从作用域链中查找变量以便读写值
/* 这里定义的 compare() 函数是在全局上下文中的，第一次调用 compare() 时会为它创建一个包含 arguments, value1, value2
  的活动对象，这个对象是其作用域链上的第一个对象。而全局上下文的变量对象 则是 compare() 作用域链上的第二个对象，其中包
  含 this, result, compare 
   在定义 compare() 时就会为它创建作用域链，预装载全局变量对象并保存在内部的 [[Scope]] 中，在调用这个函数时，会创建相
  应的执行上下文，然后通过复制函数的 [[Scope]] 来创建其作用域链。接着创建函数的活动对象（用作变量对象）并将其推入作用域
  链的前端。
   在这个例子中，compare() 函数执行上下文的作用域链中有两个变量对象：局部变量对象和全局变量对象。作用域链其实是一个包含
  指针的列表，每个指针分别指向一个变量对象，但物理上并不会包含相应的对象

                  /------------------------------------------------------\
                  |                                                      |
                  v                                                      |
    compare() 函数的执行上下文                 /------> 全局变量对象        | 
      (作用域链) ---------------> 作用域链     |        compare   ---------/
                                  1 ----------/        result   undefined
                                  0-----------\
                                              |
                                              |
                                              \-----> compare() 函数的活动对象
                                                      arguments   [5, 10]
                                                      value1      5
                                                      value2      10
 */
function compare(value1, value2) {
  if (value1 < valu2) return -1;
  else if (value1 < value2) return 1;
  else return 0;
}

let result = compare(5, 10);