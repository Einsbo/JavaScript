/**
 * Object 是 ECMAScript 中最常用的类型之一。它很适合存储和在应用程序之间交换数据。
 */

// ! 创建 Object 实例
// * new 和 Object() 创建 —— 一般不会使用
let person1 = new Object();
person1.name = "Nicholas";
person1.age = 29;

// * 对象字面量 —— 不会调用 Object 构造函数
/* { 表示对象字面量开始，因为它出现在一个表达式上下文中，在 ECMAScript 中表达式上下文指的是期待返回值的上下文，赋值
  操作符表示后面要期待一个值，因此左大括号表示一个表达式的开始。同样是左大括号，如果出现在语句上下文中，比如 if 语句的
  条件后面则表示一个语句块的开始。 */
let person2 = { 
  name: "Nicholas", // 属性名可以是字符或数值，数值属性会自动转换为字符串
  "age": 29,
  5: true
};
console.log(person1, person2);

// 对象字面量已经成为给函数传递大量可选参数的主要方式，比如
function displayInfo(args) {
  let output = "";

  if (typeof args.name == "string") {
    output += "Name: " + args.name + "\n";
  }

  if (typeof args.age == "number") {
    output += "Age: " + args.age + "\n";
  }

  console.log(output);
}

displayInfo({
  name: "Nicholas",
  age: 29
});

displayInfo({
  name: "Greg",
});

// * 属性名也是可以用中括号语法访问它们的，它的优势是可以通过变量访问属性，如下
let propertyName = "name";
console.log(person1[propertyName]);