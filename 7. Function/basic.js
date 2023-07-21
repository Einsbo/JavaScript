// ! 函数声明与函数表达式
if (!true) {
  /* JS 引擎在任何代码执行之前会先读取函数声明，并在执行上下文中生成函数定义。而函数表达式必须等到代码执行到它那一行才
    会在执行上下文中生成函数定义。除了函数什么时候有真正区别之外，这两种语法等价 */
  console.log(sum1(10, 10)); // 20, 没问题
  function sum1(num1, num2) { // * 会执行函数声明提升
    return num1 + num2;
  }

  // console.log(sum2(10, 10)); // ReferenceError: Cannot access 'sum2' before initialization
  let sum2 = function(num1, num2) { // 匿名函数
    return num1 + num2;
  }

  // * 理解函数声明与函数表达式之间的区别关键是理解提升
  let condition = true;
  /* 不能这样写，这种写法不是有效的 ES 写法，JS 引擎会尝试将其纠正为适当的声明，但是浏览器纠正这个问题的方式不一致，
    多数浏览器会忽略 condition 直接返回第二个声明，Firefox 会在 condition 为 true 的时候返回第一个声明 */
  if (condition) { 
    function sayHi() { 
      console.log("Hi");
    }
  } else {
    function SayHi() {
      console.log("Yo");
    }
  }

  // 把上面的函数换成函数表达式就没问题了
  let sayHi;
  if (condition) {
    sayHi = function() {
      console.log("Hi");
    }
  } else {
    sayHi = function() {
      console.log("Yo");
    }
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
/* ES 函数的参数与其他大多数语言不同，函数及不关心传入的参数个数，也不关心这些参数的类型。之所以会这样，主要是因为 ES 
  函数的参数在内部表现为一个数组，函数调用时总会接收一个数组，但函数并不关心这个数组中有什么 */
if (!true) {
  function sayHi(name, message) {
    console.log("Hello " + name + ", " + message);
  }
  sayHi('Niher', 'Welcome')

  /* arguments 对象是一个类数组对象（但不是 Array 的实例），要确定传进来多少个参数，可以访问 arguments.length。
    可以通过 arguments[0] 取得第一个参数值，因此把函数重写成不声明参数也可以 */
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

  /* arguments 对象的值始终会与对应的命名参数同步，它们在内存中是分开的，但是仍会保持同步。同时 arguments 的长度跟
    据传入的参数来确定，无法在函数内部修改 */
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
/* 其它语言（比如 Java）中，一个函数可以有两个定义，只要签名（接收参数的类型和数量）不同就行，但是 ES 函数没有签名，
  因为参数是由数组表示的，没有签名自然没有重载 */
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

// ! 参数扩展与收集
if (!true) {
  let values = [1, 2, 3, 4];
  // 假设有如下函数定义，它会将所有传入的参数累加起来
  function getSum() {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
      sum += arguments[i];
    }
    return sum;
  }

  // * 在 ES6 中，对可迭代对象应用扩展操作服可以将其作为一个参数传入，并将可迭代对象拆分成一个一个值单独传入
  console.log(getSum(...values)); // 10
  console.log(getSum(...values, ...[5, 6, 7])); // 28

  // 对函数中的 arguments 而言，它并不知道扩展操作服的存在，它是按照调用参数时传入的参数接收每一个值
  function countArguments() {
    console.log(arguments.length, arguments[0]);
  }
  countArguments(-1, ...values); // 5, -1
  countArguments(...values, 5); // 5, 1

  // * 函数定义时可以使用扩展操作符把不同长度的独立参数组合成为一个数组，收集参数的结果会得到一个 Array 实例
  function getSum(...values) {
    // 顺序累加 values 中的值，初始值的总和为0
    return values.reduce((x, y) => x + y, 0);
  }
  console.log(getSum(1, 2, 3)); // 6

  /* 收集参数的前面如果还有命名参数，则只会收集其余的参数，如果没有则会得到空数组，因为收集参数的结果可变，所以只能把
    它作为最后一个参数 */
  // function getProduct(...values, lastValue) {} // 不可以
  function ignoreFirst(firstValue, ...values) { // 可以
    console.log(values); 
  }
}

// ! 函数作为值
/* ES 函数名就是变量，所以函数可以用在任何可以使用变量的地方，这意味着可以在一个函数中返回另一个函数，也可以把函数作为
  参数传递给另一个函数 */
if (!true) {
  // * 函数作为另一个函数的参数
  function callSomeFunction(someFunction, someArgument) {
    return someFunction(someArgument);
  }

  function add10(num) {
    return num + 10;
  }

  let result = callSomeFunction(add10, 10); // 必须将函数本身传入，而不是函数的调用结果，所以这里时 add10
  console.log(result); // 20

  function getGreeting(name) {
    return "Hello, " + name;
  }

  let result2 = callSomeFunction(getGreeting, "Nicholas");
  console.log(result2); // 'Hello, Nicholas'

  // * 函数返回另一个函数
  function createComparisonFunction(propertyName) {
    return function(object1, object2) { // 返回函数，对一个包含对象的数组按照任意对象属性进行排序
      let value1 = object1[propertyName], value2 = object2[propertyName];
      if (value1 < value2) {
        return -1;
      } else if (value1 > value2) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  let data = [
    {name: "Zachary", age: 28},
    {name: "Nicholas", age: 29}
  ];

  data.sort(createComparisonFunction("name"));
  console.log(data); // [{name: 'Nicholas', age: 29}, {name: 'Zachary', age: 28}]
}

// ! 函数属性与方法 —— ES 函数是对象，因此有属性和方法
/* 每个函数都有两个属性：length 和 prototype */
if (!true) {
  function sayName(name) {
    console.log(name);
  }
  function sum(num1, num2) {
    return num1 + num2;
  }
  function sayHi() {
    console.log("hi");
  }

  // * length 保存函数定义的命名参数的个数
  console.log(sayName.length, sum.length, sayHi.length); // 1, 2, 0

  // * prototype 是保存引用类型所有实例方法的地方，这意味着 toString(), valueOf() 等方法都在 prototype 上

  // * apply(), call() —— 以指定的 this 来调用函数，会设置调用函数时函数体内 this 对象的值
  /* 使用 apply() 和 call() 完全取决于怎么给要调用的函数传参更方便，如果想直接传 arguments 对象或一个数组，则使用
    apply()，否则用 call() */
  // apply() 的参数是 this 和一个参数数组（Array 实例或 arguments）
  function callSum1(num1, num2) {
    return sum.apply(this, arguments); // 传入 arguments
  }
  function callSum2(num1, num2) {
    return sum.apply(this, [num1, num2]); // 传入数组
  }
  console.log(callSum1(10, 10), callSum2(10, 10)); // 20, 20 这里的 this 是 window
  /* 严格模式下调用函数时如果没有指定上下文对象，则 this 不会指向 window，除非使用 apply() 或 call() 把函数指定
    给一个对象，否则 this 的值会变成 undefined */
  // 通过 call() 向函数传参时，第一个参数是 this，后面的参数要一个一个的列出来
  function callSum(num1, num2) {
    return sum.call(this, num1, num2);
  }
  console.log(callSum(10, 10)); // 20

  // * apply(), call() 强大的地方是控制函数调用上下文，即函数体内 this 的能力
  window.color = "red";
  let o = {
    color: "blue"
  };
  function sayColor() {
    console.log(this.color);
  }
  sayColor(); // red
  sayColor.call(this); // red
  sayColor.call(window); // red
  sayColor.call(o); // blue

  // * bind() —— 创建一个新的函数实例，其 this 会被绑定到传给 bind() 的对象
  let objectSayColor = sayColor.bind(o);
  objectSayColor(); // blue
}

// ! 立即调用的函数表达式
if (true) {
  /* 立即调用的函数表达式类似函数声明，但由于被包含在括号中所以会被解释为函数表达式 */
  (function() {
    // 块级作用域
    console.log('new');
  })();
}

// TODO 私有变量 10.16

// TODO 静态私有变量 10.16.1

// TODO 模块模式

// TODO 模块增强模式
