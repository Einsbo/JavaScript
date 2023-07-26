/**
 * ES 把原型链定义为主要继承方式。基本思想是通过原型继承多个引用类型的属性和方法。每个构造函数都有一个原型对象，原型有
 * 一个属性指回构造函数，而实例有一个内部指针指向原型。如果原型是另一个类型的实例呢？那就意味着这个原型本身有一个内部
 * 指针指向另一个原型，相应地另一个原型也有一个指针指向另一个构造函数，这样就在实例和原型之间构造了一条原型链。这就是
 * 原型链的基本思想。
 */
// * 实现原型链设计如下代码模式
if (!true) {
  /* 下面代码实现继承的关键是 SubType 没有使用默认原型，而是将其替换成了一个新的对象。这个新对象恰好是 SuperType 的
    实例，这样  SubType 的实例不仅能从 SuperType 的实例中继承属性和方法而且还与 SuperType 的原型挂上了钩。于是
    instance（通过内部的 [[Prototype]]）指向 SubType.prototype，而 SubType.prototype（作为 SuperType 的
    实例又通过内部的 [[Prototype]]）指向 SuperType.prototype。
     由于 SubType.prototype 的 constructor 属性被重写为指向 SuperType，所以 instance.constructor 也指向 
    SuperType */
  function SuperType() {
    this.property = true;
  };

  SuperType.prototype.getSuperValue = function() {
    return this.property;
  };

  function SubType() {
    this.subproperty = false;
  };

  // 继承 SuperType
  SubType.prototype = new SuperType();

  SubType.prototype.getSubValue = function() {
    return this.subproperty;
  };

  let instance = new SubType();
  console.log(instance.getSuperValue()); // true
  console.log(instance.__proto__); // SuperType {property: true, getSubValue: ƒ}

  /* 在读取实例上的属性时，首先会在实例上搜索这个属性，如果没找到则会继续搜索实例的原型。在通过原型链实现继承后，搜索
    就可以继续向上搜索原型的原型，对上面的例子来说调用 instance.getSuperValue() 经过了 3 个步骤：instance、
    SubType.prototype 和 SuperType.prototype，最后一步找到了这个方法。对属性和方法的搜索会一直持续到原型链的末
    端 */

  // ? 默认原型 —— Object
  /* 默认情况下所有引用类型都继承自 Object，这也是通过原型链实现的。任何函数的默认原型都是一个 Object 的实例，这意味
    着这个实例有一个内部指针指向 Object.prototype。因此前面的例子还有额外一层继承关系，就是 SuperType 的原型中的
    [[Prototype]] 指向 Object 的原型 —— SubType 继承 SuperType，SuperType 继承 Object。在调用 
    instance.toString() 时，实际上调用的是保存在 Object.prototype 上的方法。 */
  console.log(SuperType.prototype.__proto__); // {constructor: f Object(), ..., toString: f ...}

  // ? 原型与继承的关系 —— instanceof, isPrototypeOf()
  /* 如果一个实例的原型链中出现过相应的构造函数，则 instanceof 操作符返回 true，只要原型链中包含这个原型，则
    isPrototypeOf() 就返回 true */
  console.log(instance instanceof Object, instance instanceof SuperType); // true * 2
  console.log(instance instanceof SubType); // true
  console.log(Object.prototype.isPrototypeOf(instance)); // true
  console.log(SuperType.prototype.isPrototypeOf(instance)); // true
  console.log(SubType.prototype.isPrototypeOf(instance)); // true

  // ? 添加方法
  /* 子类有时候需要覆盖父类的方法或者添加父类没有的方法，这些方法必须在原型赋值之后再添加 */
  /* 这里的例子重点是这两个方法都是在把原型赋值为 SuperType 的实例之后定义的 */
  SuperType.prototype.getSubValue = function() { // 新方法
    return this.subproperty;
  }
  SubType.prototype.getSuperValue = function() { // 覆盖已有的方法
    return false;
  }
  instance = new SubType();
  console.log(instance.getSuperValue()); // false

  // * 以对象字面量方式创建原型方法会破坏之前的原型链，因为这相当于重写了原型链
  /* 这段代码中子类的原型被一个对象字面量覆盖了，覆盖后的原型是一个 Object 的实例，而不再是 SuperType 的实例，因此
    之前的原型链就断了，SubType 和 SuperType 之间也就没有联系了 */
  SubType.prototype = { // 通过对象字面量添加新方法，这会导致 28 行无效
    getSubValue() {
      return this.subproperty;
    },
    someOtherMethod() {
      return false;
    }
  };
  instance = new SubType();
  // console.log(instance.getSuperValue()); // TypeError: instance.getSuperValue is not a function
} 

// ? 原型链的问题
/* 原型链的主要问题是原型中包含引用值时会导致引用值会在所有实例间共享，这也是为什么属性通常会在构造函数中定义而不会
  定义在原型上的原因。再使用原型实现继承时，原型实际上变成了另一个类型的实例，这意味着原先的实例属性会摇身一变成为了
  原型属性。 */
if (!true) {
  function SuperType() {
    this.colors = ["red", "blue", "green"];
  };
  function SubType() {};

  // 继承 SuperType
  SubType.prototype = new SuperType();

  let instance1 = new SubType();
  instance1.colors.push("black");
  console.log(instance1.colors); // ['red', 'blue', 'green', 'black']

  let instance2 = new SubType();
  console.log(instance2.colors); // ['red', 'blue', 'green', 'black']

  /* 原型链的第二个问题是，子类行在实例化时不能给父类型的构造函数穿参，事实上，我们无法在不影响所有对象实例的情况下把
    参数传进父类的构造函数。再加上上面的引用值问题，就导致原型链基本不会被单独使用 */
}
  
// ! 盗用构造函数
// TODO

// TODO 组合继承

// TODO 原型式继承

// TODO 寄生式继承

// TODO 寄生式组合继承