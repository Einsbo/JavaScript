/* 闭包指的是那些引用了另一个函数作用域中变量的函数，通常在嵌套函数中实现 */
function createComparisonFunction(propertyName) {
  return function(object1, object2) {
    let value1 = object1[propertyName]; // 引用了外部函数的变量 propertyName
    let value2 = object2[propertyName];

    if (value1 < valu2) return -1;
    else if (value1 < value2) return 1;
    else return 0;
  }
}