// ! 类
/* 与函数类型相似，定义类也有两种主要方式：类声明和类表达式 */
class Person {}; // 类声明
const Animal = class {}; // 类表达式

if (!true) {
  /* 与函数表达式类似，类表达式在它们被求值前也不能引用。不过与函数定义不同的是，函数声明可以提升，但类定义不能 */
  console.log(FunctionExpression);  // undefined
  var FunctionExpression = function() {};
  console.log(FunctionExpression); // f() {}

  console.log(FunctionDeclaration); // ƒ FunctionDeclaration() {}
  function FunctionDeclaration() {};
  console.log(FunctionDeclaration); // ƒ FunctionDeclaration() {}

  console.log(ClassExpression); // undefined
  var ClassExpression = class {};
  console.log(ClassExpression); // class {}

  // console.log(ClassDeclaration); // ReferenceError: Cannot access 'ClassDeclaration' before initialization
  class ClassDeclaration {};
  console.log(ClassDeclaration); // class ClassDeclaration {}
}

/* 另一个跟函数声明不同的地方是，函数受函数作用域限制，而类受块作用域限制 */
if (!true) {
  {
    function FunctionDeclaration() {};
    class ClassDeclaration {};
  }
  console.log(FunctionDeclaration); // ƒ FunctionDeclaration() {}
  console.log(ClassDeclaration); // ReferenceError: ClassDeclaration is not defined
}

// * 类的构成
if (true) {
  
}
