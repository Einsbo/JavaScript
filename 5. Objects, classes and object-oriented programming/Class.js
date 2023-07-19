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
if (!true) {
  /* 类可以包含构造函数方法、实例方法、获取函数、设置函数和静态类方法，但这些都不是必须的。空的类定义照样有效，默认情况
    下类定义中的代码都在严格模式下进行 */
  class Foo {}; // 空类定义

  class Bar { // 有构造函数的类
    constructor() {};
  }

  class Baz { // 有获取函数的类
    get myBaz() {};
  }

  class Qux { // 有静态方法的类
    static myQux() {};
  }

  // * 类构造函数
  /* constructor 关键字用于在类定义块内部创建类的构造函数。它会告诉解释器在使用 new 操作符创建类的新实例时，应该调
    用这个函数。构造函数的定义不是必须的，不定义构造函数相当于将构造函数定义为空函数。*/
  
  /* 使用 new 操作符实例化 Person 的操作等同于使用 new 调用起构造函数，唯一可感知的不同之处就是 JS 解释器知道使用
    new 和类意味着应该使用 constructor 函数进行实例化。
     使用 new 调用类的构造函数会执行如下操作：
     1. 在内存中创建一个新对象
     2. 这个新对象内部的 [[Prototype]] 指针被赋值为构造函数的 prototype 属性
     3. 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）
     4. 执行构造函数内部的代码（给新对象添加属性）
     5. 如果构造函数返回非空对象，则返回该对象；否则返回刚创建的新对象
  */
 class Animal {}

 class Person {
  constructor(name) {
    console.log(arguments.length);
    this.name = name || null;
  };
 }

 class Vegetable {
  constructor() {
    this.color = 'orange';
  }
 };

 let a = new Animal();
 let p = new Person(); // 0
 let v = new Vegetable();
 console.log(v.color); // "orange"
 
 // * 类实例化时传入的参数会用作构造函数的参数，如果不需要参数，则类名后面的括号也是可选的
 let p1 = new Person; // 0, 这里没有使用括号
 console.log(p1.name); // null
 let p2 = new Person('Jake'); //1
 console.log(p2.name); // 'Jake'

 /* 默认情况下，类构造函数会在执行之后返回 this 对象，构造函数返回的对象会被用作实例化的对象，如果没有什么引用新创建的
  this 对象，那么这个对象会被销毁。不过如果返回的不是 this 对象，而是其他对象，那么这个对象不会通过 instanceof 操作
  符检测出跟类有关联，因为这个对象的原型指针并没有被修改 */
  class Person2 {
    constructor(override) {
      this.foo = 'foo';
      if (override) {
        return {bae: 'bar'};
      }
    }
  }
  p1 = new Person2(), p2 = new Person2(true);
  console.log(p1, p1 instanceof Person2); // Person2 {foo: 'foo'}, true
  console.log(p2, p2 instanceof Person2); // {bae: 'bar'}, false

  /* 类构造函数与构造函数的主要区别是调用类构造函数必须使用 new 操作符，普通构造函数如果不使用 new 调用就会以全局的
    this（通常是 window）作为内部对象。调用类构造函数时如果忘了使用 new 则会抛出错误 */
  
  // * 把类看成特殊的函数 —— ES 中没有正式的类这个类型，从各方面看，ES 类就是一个特殊的函数
  console.log(Person); // class Person {}
  console.log(typeof Person); // function

  /* 类标识符有 prototype 属性，而这个原型也有一个 constructor 属性指向自身 */
  console.log(Person.prototype); // {constructor: f}
  console.log(Person === Person.prototype.constructor); // true
  console.log(p instanceof Person); // true, 与普通构造函数一样可以检查函数原型是否存在于实例的原型链中

  // ? 类中定义的 constructor 方法不会被当成构造函数，在对它使用 instanceof 操作符时会返回 false
  // 但是如果在创建实例时直接将类构造函数当成普通构造函数来使用，那么 instanceof 操作符的返回值会反转
  p1 = new Person();
  console.log(p1.constructor === Person, p1 instanceof Person); // true true
  console.log(p1 instanceof Person.constructor); // false
  p2 = new Person.constructor();
  console.log(p2.constructor === Person, p2 instanceof Person); // false false
  console.log(p2 instanceof Person.constructor); // true

  let classList = [ // 类是 JS 的一等公民，可以像其他对象或函数引用一样把类作为参数传递
    class { // 类可以像函数一样在任何地方定义，比如在数组中
      constructor(id) {
        this.id_ = id;
        console.log(`instance ${this.id_}`);
      }
    }
  ];
  function createInstance(classDefinition, id) {
    return new classDefinition(id);
  }
  let foo = createInstance(classList[0], 3141); // "instance 3141"

  p = new class { // 与立即调用函数表达式类似，类也可以立即实例化。因为是一个类表达式，所以类名是可选的
    constructor(x) {
      console.log(x);
    }
  }('bar'); // 'bar'
  console.log(p); // {}
} 

// ! 实例、原型和类成员
/* 类可以非常方便的定义应该存在于实例上的成员、原型上的成员，以及存在于类本身的成员 */
// * 实例成员 —— 通过 new 调用类标识符时会执行类构造函数，这个函数内部可以为新创建的实例（this）添加“自有”属性
if (!true) {
  /* 构造函数执行完毕后，仍然可以为实例继续添加新成员。每个实例都对应一个唯一的成员对象，这意味着所有成员都不会在原型上
    共享 */
  class Person {
    // 使用对象类型定义一个字符串是因为在下面测试两个对象的相等性
    constructor() {
      this.name = new String('Jake');
      this.sayName = () => console.log(this.name);
      this.nicknames = ['Jake', 'J-Dog'];
    }
  }
  let p1 = new Person(), p2 = new Person();
  p1.sayName(); // String {'Jake'}
  p2.sayName(); // String {'Jake'}
  console.log(p1.name === p2.name, p1.sayName === p2.sayName); // false * 2
  console.log(p1.nicknames === p2.nicknames); // false
  p1.name = p1.nicknames[0];
  p2.name = p2.nicknames[1];
  p1.sayName(); // 'Jake'
  p2.sayName(); // 'J-Dog'
}

// * 原型方法与访问器
/* 为了在实例间共享方法，类定义语法把在类块中定义的方法作为原型方法 */
if (!true) {
  class Person {
    constructor() {
      this.locate = () => console.log('instance'); // 添加到 this 上的所有内容都会存在于不同的实例上
    };
    locate() { // 在类块中定义的所有内容都会定义在类的原型上
      console.log('prototype');
    };
    /* 可以把方法定义在类构造函数中或者类块中，但不能在类块中给原型添加原始值或对象作为成员数据。 */
    // name: 'Jake'; // Uncaught  SyntaxError: Unexpected token

    // 类定义也支持获取和设置访问器，语法与行为和普通函数一样
    set name(newName) {
      this.name_ = newName;
    }
    get name() {
      return this.name_;
    }
    sayName() {
      console.log(`${Person.greeting} ${this.name}`);
    }
  }

  // 虽然类定义并不显示支持在原型或类傻姑娘添加成员数据，但在类定义外部可以手动添加
  Person.greeting = 'My name is'; // 在类上定义数据成员
  Person.prototype.name = 'Jake'; // 在原型上定义数据成员

  let p = new Person();
  p.locate(); // instance
  Person.prototype.locate(); // prototype
  p.sayName(); // 'My name is Jake'
}

// * 静态类方法
// TODO

// * 迭代器与生成器方法
// TODO

// ! 继承 —— 使用 extends 就可以继承任何拥有 [[Construct]] 和原型的对象
if (!true) {
  class Vehicle {
    identifyPrototype(id) {
      console.log(id, this);
    }

    static identifyClass(id) {
      console.log(id, this);
    }
  }

  // 继承类 —— 派生类会通过原型链访问到类和原型上定义的方法，this 的值会反映调用相应方法的实例或类
  class Bus extends Vehicle {}

  let v = new Vehicle();
  let b = new Bus();
  console.log(b instanceof Bus, b instanceof Vehicle); // true * 2

  function Person() {}

  // 继承普通构造函数
  class Engineer extends Person {}
  let e = new Engineer();
  console.log(e instanceof Engineer, e instanceof Person); // true * 2

  b.identifyPrototype('bus'); // 'bus', Bus{}
  v.identifyPrototype('vehicle'); // 'vehicle', Vehicle {}
  Bus.identifyClass('bus'); // 'bus', class Bus extends Vehicle {}
  Vehicle.identifyClass('vehicle'); // 'vehicle', class Vehicle {...}
}

// * 构造函数、HomeObject 和 super()
// TODO

// * 抽象基类
// TODO

// * 继承内置类型
// TODO

// * 类混入
// TODO



