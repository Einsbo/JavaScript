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
if (true) {
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