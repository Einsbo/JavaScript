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

// * 在函数执行时，要从作用域链中查找变量以便读写值 ？？？ 对这里的图有疑问
/* 这里定义的 compare() 函数是在全局上下文中的，第一次调用 compare() 时会为它创建一个包含 arguments, value1, value2
  的活动对象，这个对象是其作用域链上的第一个对象。而全局上下文的变量对象 则是 compare() 作用域链上的第二个对象，其中包
  含 this, result, compare 
   在定义 compare() 时就会为它创建作用域链，预装载全局变量对象并保存在内部的 [[Scope]] 中，在调用这个函数时，会创建相
  应的执行上下文，然后通过复制函数的 [[Scope]] 来创建其作用域链。接着创建函数的活动对象（用作变量对象）并将其推入作用域
  链的前端。
   在这个例子中，compare() 函数执行上下文的作用域链中有两个变量对象：局部变量对象和全局变量对象。作用域链其实是一个包含
  指针的列表，每个指针分别指向一个变量对象，但物理上并不会包含相应的对象
   函数内部的代码在访问变量时，就会使用给定的名称从作用域链中查找变量，函数执行完毕后，局部活动变量会被销毁，内存中就只
  剩下全局作用域，不过闭包就不一样了

                  /<—————————————————————————————————————————————————————\
                  |                                                      |
                  v                                                      |
    compare() 函数的执行上下文                 /—————> 全局变量对象        | 
      (作用域链) ———————————————> 作用域链     |        compare   ———————>/
                                  1 —————————>/        result   undefined
                                  -
                                  0 —————————>\
                                              |
                                              |
                                              \—————> compare() 函数的活动对象
                                                      arguments   [5, 10]
                                                      value1      5
                                                      value2      10
 */
function compare(value1, value2) {
  if (value1 < value2) return -1;
  else if (value1 < value2) return 1;
  else return 0;
}

let result = compare(5, 10);

// * 在一个函数内部定义的函数会把包含它的函数的活动对象添加到自己的作用域链中
/* 在 createComparisonFunction() 函数中，匿名函数的作用域链中实际上包含 createComparisonFunction() 的活动对象
        let compare = createComparisonFunction("name"); // 创建比较函数
        let result = compare({name: "Nicholas"}, {name: "Matt"}); // 调用函数
   以上代码在 createComparisonFunction() 返回匿名函数后，它的作用域链被初始化为包含 createComparisonFunction() 的活
  动对象和全局变量对象。这样匿名函数就会访问到 createComparisonFunction() 可以访问的所有变量。还有一个副作用是，
  createComparisonFunction() 的活动对象并不能在它执行完毕后销毁，因为匿名函数的作用域链中仍然有对它的引用。在
  createComparisonFunction() 执行完毕后，其执行上下文的作用域链会销毁，但它的活动对象仍然会保留在内存中，直到匿名函数
  被销毁后才会被销毁：
        compare = null; // 解除对函数的引用，这样就可以释放内存了
   这里吧 compare 设置为 null会解除对函数的引用，从而让垃圾回收程序可以将内存释放掉。作用域链也会被销毁，其他作用域（除
  全局作用域之外）也可以销毁
*/

function createComparisonFunction(propertyName) {
  return function(object1, object2) {
    let value1 = object1[propertyName], value2 = object2[propertyName];

    if (value1 < value2) return -1;
    else if (value1 > value2) return 1;
    else return 0;
  }
}

// ? this 对象 —— 在闭包中使用 this 会让代码变复杂
/* 如果内部函数没有使用箭头函数定义则 this 对象会在运行时绑定到执行函数的上下文，如果在全局函数中调用，非严格模式下
  this 等于 window，严格模式下等于 undefined。如果作为某个对象的方法调用，则 this 等于这个对象。匿名函数在这种情况下
  不会绑定到某个对象，这就意味着 this 会指向 window，除非严格模式下是 undefined。 */
window.identity = "The Window";
let object = {
  identity: "My Object",
  getIdentityFunc() {
    return function() {
      return this.identity;
    };
  },
  getIdentity() {return this.identity;}
};
console.log(object.getIdentityFunc()()); // "The Window"
console.log(object.getIdentity()); // "My Object"

/* 每个函数在调用时都会自动创建两个变量：this, arguments。内部函数永远不可能直接访问外部函数的这两个变量，但是如果把
  this 保存到闭包可以访问的另一个变量中，则是行得通的： */
object = {
  identity: "My Object",
  getIdentityFunc() {
    /* 在定义内部函数之前先把外部函数的 this 保存到变量 that 中，然后在定义闭包时就可以让它访问 that，因为这是内部函数
      中名称没有任何冲突的一个变量，即使在外部函数返回后，that 仍然指向 object 所以调用 object.getIdentityFunc() 就
      会返回 “My Object” */
    let that = this;
    return function() {return that.identity;};
  }
}
console.log(object.getIdentityFunc()()); // "My Object"

// TODO 内存泄漏

function assignHandler() {
  let element = document.getElementById("someElement");
  element.onclick = () => console.log(element.id);
}


// ! 函数柯里化 —— 接收一部分参数，返回一个函数接收剩余参数，接收足够参数后，执行原函数
// 判断数字是否在给定范围
function isBetween(value, min, max) { // 普通函数
  return value >= min && value <= max;
}

function isBetween(min, max) { // 柯里化函数
  return function(value) {
    return value >= min && value <= max;
  }
}

// 柯里化函数的一种写法
const currying = fn => judge = (...args) => 
  args.length >= fn.length ? fn(...args) : (...arg) => judge(...args, ...arg);

// TS 不能使用箭头函数做函数柯里化
function curry(fn) {
  return function judge(...args) {
    args.length >= fn.length ? fn(...args) : (...arg) => judge(...args, ...arg);
  }
}