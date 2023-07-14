/**
 * 生成器是 ES6 新增的一个极为灵活的结构，拥有在一个函数块内暂停和恢复代码执行的能力。使用生成器可以自定义迭代器和实现
 * 协程。
 */

// ! 生成器的形式是一个函数，函数名称前加一个 * 表示它是一个生成器。只要是可以定义函数的地方就可以定义生成器
// 标识生成器函数的型号不受两侧空格的影响
function* generatorFn0() {}; // 生成器函数声明

let generatorFn1 = function* () {}; // 生成器函数表达式

let foo = {
  * generatorFn() {} // 作为对象字面量方法的生成器函数
}

class Foo {
  * generatorFn() {} // 作为类实例方法的生成器函数
}

class Bar {
  static * generatorFn() {} // 作为类静态方法的生成器函数
}

// TODO