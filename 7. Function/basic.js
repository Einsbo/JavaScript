// ! 函数声明与函数表达式
if (true) {
  // JS 引擎在任何代码执行之前会先读取函数声明，并在执行上下文中生成函数定义。而函数表达式必须等到代码执行到它那一行才会在执行上下文中生成函数定义
  console.log(sum1(10, 10)); // 20, 没问题
  function sum1(num1, num2) {
    return num1 + num2;
  }
}

// ! 箭头函数
// 任何可以使用函数表达式的地方都可以使用箭头函数
if (!true) {
  let arrowSum = (a, b) => {
    return a + b;
  }
  
  let functionExpressionSum = function(a, b) {
    return a + b;
  }

  console.log(arrowSum(5, 8), functionExpressionSum(5, 8)); // 13 13

  // * 箭头函数简洁的语法非常适合嵌入函数的场景
  // * 如果只有一个参数，可以不用括号。只有没有参数或多个参数的情况下才需要使用括号
  // * 箭头函数使用大括号就说明包含“函数体”，不使用那么箭头函数后面只能有一行赋值或表达式代码，并且会将改行代码的值返回
  let ints = [1, 2, 3];

  console.log(ints.map(function(i) {return i + 1;})); // [2, 3, 4]
  console.log(ints.map(i => i + 1)); // [2, 3, 4]
}

// ! 函数名 —— 就是指向函数的指针，它们跟其他包含对象指针的变量具有相同的行为，这意味着一个函数可以有多个名称
if (!true) {
  function sum(num1, num2) {
    return num1 + num2;
  }
  console.log(sum(1, 10)); // 11
  let anotherSum = sum;
  console.log(anotherSum(10, 10));

  // ES6 所有的函数都会暴露一个只读的 name 属性，其中包含关于函数的信息，使用 Function 创建的函数会是 anonymous
  console.log(sum.name); // sum
  console.log((() => {}).name); // 空字符串
  console.log((new Function()).name); // anonymous

  // 如果函数是一个获取函数、设置函数，或者使用 bind() 实例化，那么标识符前面会加上一个前缀
  let dog = {
    years: 1,
    get age() {
      return this.years;
    },
    set age(newAge) {
      this.years = newAge;
    }
  }
  let propertyDescriptor = Object.getOwnPropertyDescriptor(dog, 'age');
  console.log(propertyDescriptor.get.name); // 'get age'
  console.log(propertyDescriptor.set.name); // 'set age'
}

// ! 参数
// * ES 函数的参数只是为了方便写出来的，并不是必须写出来的，ES 根本不存在验证命名参数的机制
/* ES 函数的参数与其他大多数语言不同，函数及不关心传入的参数个数，也不关心这些参数的类型。之所以会这样，主要是因为 ES 函数的参数在内部表现为一个数组，函数调用时总会接收一个数组，但函数并不关心这个数组中有什么 */
if (!true) {
  function sayHi(name, message) {
    console.log("Hello " + name + ", " + message);
  }
  sayHi('Niher', 'Welcome')

  /* arguments 对象是一个类数组对象（但不是 Array 的实例），要确定传进来多少个参数，可以访问 arguments.length。可以通过 arguments[0] 取得第一个参数值，因此把函数重写成不声明参数也可以 */
  function sayHi2() {
    console.log("Hello " + arguments[0] + ", " + arguments[1]);
  }
  sayHi2('Hoger', 'Good');

  function howManyArgs() {
    console.log(arguments.length);
  }
  howManyArgs(); // 0
  howManyArgs(12); // 1
  howManyArgs("String", []); // 2

  /* arguments 对象的值始终会与对应的命名参数同步，它们在内存中是分开的，但是仍会保持同步。同时 arguments 的长度跟据传入的参数来确定，无法在函数内部修改 */
  function doAdd(num1, num2) {
    arguments[1] = 10;
    arguments[3] = 12;
    console.log(arguments.length);
    return arguments[0] + num2; // num2 与 arguments[0] 保持一致
  }
  console.log(doAdd(1, 2)); // 2, 11

  // * 箭头函数不能使用 arguments 关键字，只能通过定义的命名参数访问。但是可以在包装函数中把 arguments 提供给箭头函数
  function foo() {
    let bar = () => {
      console.log(arguments[0]);
    };
    bar();
  }
  foo(5); // 5
}

// ? ES 函数没有重载
/* 其它语言（比如 Java）中，一个函数可以有两个定义，只要签名（接收参数的类型和数量）不同就行，但是 ES 函数没有签名，因为参数是由数组表示的，没有签名自然没有重载 */
if (!true) {
  function addSomeNumber(num) {
    return num + 100;
  }

  // ES 中后定义的函数会覆盖先定义的
  function addSomeNumber(num) {
    return num + 200;
  }

  console.log(addSomeNumber(100)); // 300
}

// * 默认参数值 —— 并不限于原始值或对象类型
if (!true) {
  function makeKing(name = "Henry") {
    return `King ${name} VIII`;
  }
  console.log(makeKing('Louis')); // 'King Louis VIII'
  console.log(makeKing()); // 'King Henry VIII'

  /* arguments 的值不反应参数的默认值，只反映传递给函数的参数 */
  function makeKing(name = "Henry") {
    name = "Louis";
    return `King ${arguments[0]}`;
  }
  console.log(makeKing(), makeKing('Louis')); // 'King undefined', 'King Louis'
}

// 默认参数值也可以使用调用函数返回的值
if (!true) {
  let romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
  let ordinality = 0;
  function getNumerals() {
    return romanNumerals[ordinality++]; // 每次调用后递增
  }
  function makeKing(name = 'Henry', numerals = getNumerals()) { // 函数的默认参数只有在函数被调用时才会求值
    return `King ${name} ${numerals}`;
  }
  console.log(makeKing()); // 'King Henry I'
  console.log(makeKing('Louis', 'XVI')); // 'King Louis XVI'
  console.log(makeKing()); // 'King Henry II'
}

// * 默认参数作用域与暂时性死区
if (!true) {
  // 给多个参数定义默认值实际上跟使用 let 关键字顺序声明变量一样
  function makeKing(name = 'Henry', numerals = 'VIII') {
    return `King ${name} ${numerals}`;
  }
  // 默认参数会按照定义它们的顺序依次被初始化，可以将上面的函数想成下面这样
  function makeKing() {
    let name = 'Henry';
    let numerals = 'VIII';
    return `King ${name} ${numerals}`;
  }

  // 因为参数是按顺序初始化的，所以后定义默认值的参数可以引用先定义的参数
  function makeKing(name = 'Henry', numerals = name) {
    return `King ${name} ${numerals}`;
  }

  /* 暂时性死区规则：前面定义的参数不能引用后面定义的 */
}