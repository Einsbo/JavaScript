// ! arguments
/* arguments 对象有一个 callee 属性指向 arguments 对象所在函数的指针 */
if (!true) {
  function factorial(num) {
    if (num <= 1) return 1;
    else return num * factorial(num - 1);
  }

  // 上面的函数要正确执行就必须保证函数名是 factorial 从而导致了紧密耦合，使用 arguments.callee 就可以解耦合
  function factorial(num) {
    if (num <= 1) return 1;
    else return num * arguments.callee(num - 1); // 让函数逻辑与函数名解耦合
  }

  // 重写后的 factorial 代表无论函数叫什么名称，都可以使用正确的函数
  let trueFactorial = factorial;
  factorial = function() {return 0};
  console.log(trueFactorial(5), factorial(5)); // 120, 0
}

// ! this 
if (!true) {
  // * 标准函数中 this 引用的是把函数当成方法调用的上下文对象 
  window.color = "red";
  let o = {
    color: "blue"
  };
  function sayColor() {
    console.log(this.color);
  }
  sayColor(); // 'red'
  o.sayColor = sayColor;
  o.sayColor(); // 'blue'

  // * 箭头函数中 this 引用的是定义箭头函数的上下文
  let sayColor2 = () => console.log(this.color); 
  sayColor2(); // 'red'
  o.sayColor2 = sayColor2;
  o.sayColor2(); // 'red' 

  function King() {
    this.royaltyName = "Henry";
    // this 引用 King 的实例
    setTimeout(() => console.log(this.royaltyName), 1000);
  }
  function Queen() {
    this.royaltyName = "Elizabeth";
    // this 引用 window 对象
    setTimeout(function() {console.log(this.royaltyName);}, 1000);
  }

  new King(); // 'Henry'
  new Queen(); // undefined
}

// TODO caller

// ! new.target —— 函数正常调用时为 undefined，如果是使用 new 关键字调用则 new.target 将引用被调用的构造函数
if (!true) {
  function King() {
    if (!new.target) {
      throw 'King must be instantiated using "new"';
    }
    console.log("King instantiated using 'new'");
  }

  new King(); // King instantiated using 'new'
  // King(); // Uncaught King must be instantiated using "new"
}
