/**
 * 使用 Object 构造函数或对象字面量创建对象有个明显的缺点：创建具有同样接口的多个对象需要重复便携很多代码
 */

// ! 工厂模式 —— 解决了创建多个类似对象的问题，但没有解决对象标识问题（即新创建的对象是什么类型）
if (!true) {
  /* createPerson() 接收 3 个参数并构建了一个包含 Person 信息的对象。可以用不同的参数多次调用这个函数，每次都会
    返回包含 3 个属性和 1 个方法的对象。*/
  function createPerson(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
      console.log(this.name);
    };
    return o;
  }

  let person1 = createPerson("Nicholas", 29, "Software engineer");
  let person2 = createPerson("Greg", 27, "Doctor");

  console.log(person1);
}

// ! 构造函数模式 —— 以函数的形式为自己的对象类型定义属性和方法，可以确保实例被标识为特定类型
if (!true) {
  /* 这里 Person() 构造函数代替了 createPerson() 工厂函数，内部的代码和上面基本一样，只是有如下区别：
    1. 没有显示的创建
    2. 属性和方法直接赋值给了 this
    3. 没有 return
     要创建 Person 实例应该使用 new 操作符，以这种方式调用构造函数会执行如下操作：
    1. 在内存中创建一个新对象
    2. 这个新对象内部的 [[Prototype]] 特性被赋值为构造函数的 prototype 属性
    3. 构造函数内部的 this 被赋值为这个新对象
    4. 执行构造函数内部的代码（给新对象添加属性）
    5. 如果构造函数返回非空对象，则返回该对象；否则返回刚创建的新对象
  */
  function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
      console.log(this.name);
    };
  }

  let person1 = new Person("Nicholas", 29, "Software Engineer");
  let person2 = new Person("Greg", 27, "Doctor");
  // * person1 和 person2 分别保存着 Person 的不同实例，这两个对象的 constructor 都指向 Person
  console.log(person1.constructor == Person); // true

  //* constructor 本来适用于标识对象类型的，不过一般认为 instanceof 操作符是确定对象类型更可靠的方式
  console.log(person1 instanceof Object); // true
  console.log(person1 instanceof Person); // true

  person1.sayName(); // "Nicholas"
  person2.sayName(); // "Greg"

  // * 构造函数也是函数
  /* 构造函数与普通函数唯一的区别就是调用方式不同。并没有把某个函数定义为构造函数的特殊语法。任何函数只要使用 new 操作
    符调用就是构造函数，而不使用 new 操作符调用的函数就是普通函数。 */
  // 作为构造函数
  let person = new Person("Nicholas", 29, "Software Engineer");
  person1.sayName(); // "Nicholas"

  // 作为函数调用
  Person("Killer", 27, "Doctor"); // 添加到 window 对象
  window.sayName(); // "killer"

  // 在另一个对象的作用域中调用
  let o = new Object();
  Person.call(o, "Kristen", 25, "Nurse"); // 将 o 指定为 Person() 内部的 this 值
  o.sayName(); // "Kristen"

  // ? 构造函数的问题
  /* 构造函数的主要问题在于其定义的方法会在每个实例上都创建一遍，因此对前面的例子而言，person1 和 person2 都有名为
    sayName() 的方法，但这两个方法不是同一个 Function 实例。ES 中的函数是对象，因此每次定义函数时都会初始化一个对
    象。逻辑上讲这个构造函数实际上是这样的：
      function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = new Function("console.log(this.name)"); // 逻辑等价
      } 
  */
  // 这代表实例上的函数虽然同名但不相等
  console.log(person1.sayName === person2.sayName); // false

  /* 因为都是做同样的事，所以没必要定义两个不同的 Function 实例，况且 this 对象可以把函数与对象的绑定推迟到运行时。
    要解决这个问题，可以把函数定义转移到构造函数外部： */
  function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
  }
  // sayName() 在构造外部定义，这解决了函数重复问题，但是弄乱了全局作用域，这个问题可以通过原型模式来解决
  function sayName() {
    console.log("new name is " + this.name);
  }
  person1 = new Person("Nicholas", 29, "Software Engineer");
  person2 = new Person("Greg", 27, "Doctor");

  person1.sayName(); // "new name is Nicholas"
  person2.sayName(); // "new name is Greg"
}

// ! 原型模式 —— 每个函数都会创建一个 prototype 属性，该属性是一个包含特定引用类型的实例共享的属性和方法的对象
/* 这个对象就是通过构造函数创建的对象的原型。使用原型对象的好处是在它上面定义的属性和方法可以被对象实例共享。 */
if (!true) {
  function Person() {} // or let Person = function() {};

  /* 使用原型模式定义的属性和方法是所有实例共享的。 */
  // * prototype
  Person.prototype.name = "Nicholas";
  Person.prototype.age = 29;
  Person.prototype.job = "Software Engineer";
  Person.prototype.sayName = function () {
    console.log(this.name);
  };

  // 上面的代码可以像下面这样写
  /* 这样写 Person.prototype 的 constructor 属性就不指向 Person 了，在创建函数时，也会创建它的 prototype 
    对象，同时会自动给这个原型的 constructor 属性赋值。但这里的写法完全重写了默认的 prototype 对象，因此它的
    constructor 属性也指向了完全不同的新对象（Object 构造函数），不再指向原来的构造函数，虽然 instanceof 操作
    符还能可靠的返回值，但是不能再依靠 constructor 属性来识别类型了 */
  // Person.prototype = {
  // //   constructor: Person, // 单独设置 constructor
  //   name: "Nicholas",    
  //   aage: 29,
  //   job: "Software Engineer",
  //   sayName() {
  //     console.log(this.name);
  //   },
  // };

  /* 如果 constructor 很重要，可以像上面那样在重写原型时专门设置一下它的值，但是要注意以那种方式恢复 constructor
    属性会创建一个 [[Enumerable]] 为 true 的属性，而原生的 constructor 属性默认是不可枚举的，因此应该使用
    Object.defineProperty() 来定义 constructor 属性 */
  Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person
  })

  let person1 = new Person();
  let person2 = new Person();
  person1.sayName(); // "Nicholas"
  person2.sayName(); // "Nicholas"
  console.log(person1.sayName === person2.sayName); // true
}

// ? 理解原型 —— 只要创建一个函数，就会按照特定的规则为这个函数创建一个 prototype 属性（指向原型对象）
/* 默认情况下，所有原型对象自动获得一个名为 constructor 的属性，指回与之关联的构造函数。对前面的例子而言，
  Person.prototype.constructor 指向 Person。因构造函数而异可能会给原型对象添加其他属性和方法。
   在自定义构造函数时，原型对象默认只会获得 constructor 属性，其他的所有方法都继承自 Object。每次调用构造函数创建
  一个新实例，这个实例的内部 [[Prototype]] 指针就会被赋值为构造函数的原型对象。脚本中没有访问这个 [[Prototype]]
  特性的标准方式，但 Firefox、Safari 和 Chrome 会在每个对象实例上暴露 __proto__ 属性，可以通过它访问对象的原
  型。
  */
// * 关键在于理解一点：实例与构造函数原型之间有直接的联系，但实例与构造函数之间没有
if (!true) {
  /**
   * 构造函数可以是函数表达式也可以是函数声明，因此以下两种形式都可以：
   *      function Person() {};
   *      let Person = function() {};
   */
  function Person() {}

  // 声明之后，构造函数就有了一个与之关联的原型对象，这个对象是一个 Object 的实例
  console.log(typeof Person.prototype, Person.prototype); // object, {constructor: ƒ}

  // * prototype, constructor
  // 构造函数有一个 prototype 属性引用其原型对象，而这个原型对象也有一个 constructor 属性引用这个构造函数
  console.log(Person.prototype.constructor === Person); // true

  // 正常的原型链都会终止于 Object 的原型对象，Object 原型的原型是 null
  console.log(Person.prototype.__proto__ === Object.prototype); // true
  console.log(Person.prototype.__proto__.constructor === Object); // true
  console.log(Person.prototype.__proto__.__proto__ === null); // true

  console.log(Person.prototype.__proto__); // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}

  let person1 = new Person(),
    person2 = new Person();

  /* 构造函数、原型对象和实例是 3 个完全不同的对象 */
  console.log(person1 !== Person, person1 !== Person.prototype); // true, true
  console.log(Person.prototype !== Person); // true

  // * __proto__
  /**
   * 实例通过 __proto__ 链接到原型对象，它实际上指向隐藏特性 [[Prototype]] 构造函数
   * 构造函数通过 prototype 属性链接到原型对象
   * 实例与构造函数没有直接联系，与原型对象有直接联系
   */
  console.log(person1.__proto__ === Person.prototype); // true
  console.log(person1.__proto__.constructor === Person); // true

  // 同一个构造函数的两个实例共享同一个原型对象
  console.log(person1.__proto__ === person2.__proto__); // true

  // * instanceof —— 检查实例的原型链中是否包含指定构造函数的原型
  console.log(person1 instanceof Person, person1 instanceof Object); // true, true
  console.log(Person.prototype instanceof Object); // true

  /**
   * Person.prototype 指向原型对象，而 Person.prototype.constructor 指回 Person 构造函数。原型对象包含
   * constructor 属性和其他后来添加的属性。Person 的两个实例 person1 和 person2 都只有一个内部属性指回
   * Person.prototype，而且两者都与构造函数没有直接联系。虽然这两个实例都没有属性和方法，但 person1.sayName()
   * 可以正常调用，这是因为对象属性查找机制的原因。
   *
   *          <--------------------------------------------------------
   *          ⬇                                                      |
   *        Person            |--------->  Person Prototype           |
   *      prototype  -------->|         constructor    --------------->
   *                          |         name          "Nicholas"
   *                          |         age           29
   *                          |         job           "Software Engineer"
   *                          |         sayName       (function)
   *                          |
   *                          |<---------------------------------------
   *        person1           |                                       |
   *      [[Prototype]] ------>                     person2           |
   *                                      [[Prototype]] -------------->
   */

  // * isPrototypeOf() —— 确定两个对象之间的关系
  /* 本质上，isPrototypeOf() 会在传入参数的 [[Prototype]] 指向调用它的对象时返回 true，如下所示 */
  console.log(Person.prototype.isPrototypeOf(person1)); // true

  // * Object.getPrototypeOf() —— 返回参数的内部特性 [[Prototype]] 的值
  console.log(Object.getPrototypeOf(person1) === Person.prototype); // true
  Person.prototype.name = "Prototype name";
  console.log(Object.getPrototypeOf(person1).name); // "Prototype name"

  // * Object.create() —— 创建一个新对象并为其制定原型
  let biped = { numLegs: 2 };
  let person = Object.create(biped);
  person.name = "Matt";
  console.log(person.name, person.numLegs); // 'Matt' 2
  console.log(Object.getPrototypeOf(person) === biped); // true
}

// ? 原型层级
/* 在通过对象访问属性时，会按照这个属性的名称开始搜索。搜索开始于对象实例本身，如果在这个实例上发现了给定的名称，则返回
  该名称对应的值。如果没有找到这个属性，则搜索会沿着指针进入原型对象，然后在原型对象上找到属性后，再返回对应的值。
   虽然可以通过实例读取原型对象上的值，但不可能通过实例重写这个值，如果在实例上添加了一个与原型对象中同名的属性，那就会
  在实例上创建这个属性，这个属性会遮住原型对象上的属性。*/
if (!true) {
  function Person() {}

  Person.prototype.name = "Nicholas";
  Person.prototype.age = 29;
  Person.prototype.job = "Software engineer";
  Person.prototype.sayName = function () {
    console.log(this.name);
  };

  let person1 = new Person();
  let person2 = new Person();

  // * delete
  /* 只要给对象实例添加一个属性，这个属性就会遮蔽原型对象上的同名属性，也就是虽然不会修改它，但会屏蔽对它的访问。即使
    在实例上把这个属性设置为 null 也不会恢复它和原型的联系。不过使用 delete 操作符可以完全删除实例上的这个属性从而
    让标识符解析过程能够继续搜索原型对象 */
  person1.name = "Greg"; // 在实例上
  console.log(person1.name, person2.name); // Greg Nicholas

  delete person1.name;
  console.log(person1.name); // "Nicholas"

  // * hasOwnProperty() —— 确定某个属性是在实例上还是在原型对象上
  /* 该方法继承自 Object，会在属性存在于调用它的对象实例上时返回 true */
  console.log(person1.hasOwnProperty("name")); // false
  person1.name = "Greg";
  console.log(person1.name, person1.hasOwnProperty("name")); // "Greg" true
  console.log(person2.name, person2.hasOwnProperty("name")); // "Nicholas" false
  delete person1.name;
  console.log(person1.name, person1.hasOwnProperty("name")); // "Nicholas" false
}

// ? 原型和 in 操作符
/* 有两种方式使用 in 操作符：单独使用和在 for-in 循环中使用。在单独使用时，in 操作符会在可以通过对象访问指定属性时
  返回 true，无论该属性是在实例上还是在原型上。 */
if (!true) {
  function Person() {}

  Person.prototype.name = "Nicholas";
  Person.prototype.age = 29;
  Person.prototype.job = "Software engineer";
  Person.prototype.sayName = function () {
    console.log(this.name);
  };

  // * hasOwnProperty()
  let person1 = new Person(),
    person2 = new Person();
  console.log(person1.hasOwnProperty("name"), "name" in person1); // false true
  person1.name = "Greg";
  console.log(person1.name); // "Greg" 来自实例
  console.log(person1.hasOwnProperty("name"), "name" in person1); // true true
  delete person1.name;
  console.log(person1.name); // "Nicholas" 来自原型
  console.log(person1.hasOwnProperty("name"), "name" in person1); // false true

  /* 上面 name 随时可以通过实例或通过原型访问到，因此调用 "name" in person1 始终返回 true，无论这个属性是否在实
    例上，如果要确定某个属性是否存在于原型上，则可以像下面这样同时使用 hasOwnProperty() 和 in 操作符 */
  function hasPrototypeProperty(object, name) {
    /* 只要通过对象可以访问，in 操作符就返回 true，而 hasOwnProperty() 只有属性存在于实例上才返回 true。因此只要
      in 返回 true 且 hasOwnProperty() 返回 false，就说明该属性是一个原型属性 */
    return !object.hasOwnProperty(name) && name in object;
  }
  let person = new Person();
  console.log(hasPrototypeProperty(person, "name")); // true
  person.name = "Greg";
  console.log(hasPrototypeProperty(person, "name")); // false

  // * 在 for-in 中使用 in 操作符时，可以通过对象访问且可以被枚举的属性都会返回，包括实例属性和原型属性
  /* 遮蔽原型中不可枚举（[[Enumerable]]）属性的实例属性也会在 for-in 循环中返回，因为默认情况下开发者定义的属性都
    是可枚举的。要获得对象上所有可枚举的实例属性，可以使用 Object.keys() 方法，这个方法接收一个对象作为参数，返回包
    含该对象所有可枚举属性名称的字符串数组 */
  // * Object.keys(), Object.getOwnPropertyNames()
  let keys = Object.keys(Person.prototype);
  console.log(keys); // ['name', 'age', 'job', 'sayName']
  let p1 = new Person();
  p1.name = "Rob";
  p1.age = 31;
  let p1keys = Object.keys(p1);
  console.log(p1keys); // ['name', 'age']
  // 如果想列出 p1 所有的实例属性，无论是否可以枚举，都可以使用 Object.getOwnPropertyNames()
  keys = Object.getOwnPropertyNames(Person.prototype);
  console.log(keys); // ['constructor', 'name', 'age', 'job', 'sayName']

  // ? 属性枚举顺序
  /* for-in 循环、Object.keys()、Object.getOwnPropertyNames()、Object.getOwnpropertySymbols() 以及
    Object.assign() 在属性枚举顺序方面有很大区别。for-in 循环和 Object.keys() 的枚举顺序是不确定的，取决于 JS
    引擎。
     Object.getOwnPropertyNames()、Object.getOwnPropertySymbols() 和 Object.assign() 的枚举顺序是确定的，
    先以升序枚举数值健，然后以插入顺序枚举字符串和符号健。在对象字面量中定义的健以它们逗号分隔的顺序插入 */
  let k1 = Symbol("k1"),
    k2 = Symbol("k2");
  let o = {
    1: 1,
    first: "first",
    [k1]: "sym2",
    second: "second",
    0: 0,
  };
  o[k2] = "sym2";
  o[3] = 3;
  o.third = "third";
  o[2] = 2;
  console.log(Object.getOwnPropertyNames(o)); // ['0', '1', '2', '3', 'first', 'second', 'third']
  console.log(Object.getOwnPropertySymbols(o)); // [Symbol(k1), Symbol(k2)]
}

// ? 对象迭代
// * Object.values(), Object.entries() —— 接收一个对象，返回它们内容的数组
/* Object.values() 返回对象值的数组，Object.entries() 返回健/值对的数组 */
if (!true) {
  let o = {
    foo: "bar",
    baz: 1,
    qux: {},
  };
  console.log(Object.values(o)); // ['bar', 1, {…}]
  console.log(Object.entries(o)); // [['foo', 'bar'], ['baz', 1], ['qux', {}]]

  // 非字符串属性会被转换为字符串输出，且这两个方法执行对象的浅复制
  const t = {
    qux: {},
  };
  console.log(Object.values(t)[0] === t.qux); // true
  console.log(Object.entries(t)[0][1] === t.qux); // true
  Object.values(t)[0].name = "new name";
  console.log(t.qux); // {name: "new name"}

  // 符号属性会被忽略
  const sym = Symbol();
  const k = {
    [sym]: "foo",
  };
  console.log(Object.values(k), Object.entries(k)); // [] []
}

// ? 原型的动态性
/* 从原型上搜索值的过程是动态的，即使实例在修改原型之前已经存在，任何时候对原型对象所做的修改也会在实例上反映出来 */
if (!true) {
  function Person() {};
  let friend = new Person(); // friend 实例是在添加 sayHi() 方法之前创建的，但它仍然可以访问这个方法
  Person.prototype.sayHi = function() {
    console.log("hi");
  };
  friend.sayHi(); // "hi"
  /* 会这样的原因是实例与原型之间松散的关系，在调用 friend.SayHi() 时，首先会从这个实例中搜索名为 sayHi 的属性，
    在没有找到的情况下，运行时会继续搜索原型对象。因为实例和原型之间的链接就是简单的指针，而不是保存的副本，所以会在
    原型上找到 sayHi 属性并返回这个属性保存的函数。
     虽然随时能给原型添加属性和方法，并能够立即反应在所有对象实例上，但这跟重写整个原型是两回事。实例的 [[Prototype]]
    指针是在调用构造函数时自动赋值的，这个指针即使把原型修改为不同的对象也不会变。重写整个原型会切断最初原型与构造函数
    的联系，但实例引用的仍然是最初的原型。 */
  // * 实例只有指向原型的指针，没有指向构造函数的指针
  Person.prototype = {
    constructor: Person,
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
      console.log(this.name);
    }
  };
  // friend.sayName(); // TypeError: friend.sayName is not a function
  /* 出现这个错误的原因是因为 friend 指向的原型还是最初的原型，而这个原型上没有 sayName 属性。重写构造函数上的原型
    之后再创建的实例才会引用新的原型，而在此之前创建的实例仍然会引用最初的原型。 */
}

// ? 原生对象模型
/* 原型模式之所以重要，不仅体现在自定义类型上，还因为它是实现所有原生引用类型的模式。所有原生引用类型的构造函数（
  Object、Array、String 等）都在原型上定义了实例方法。比如数组实例等 sort() 方法就是 Array.prototype 上定义的，
  而字符串包装对象的 substring() 方法也是在 String.prototype 上定义的 */
if (!true) {
  console.log(typeof Array.prototype.sort); // function
  console.log(typeof String.prototype.substring); // function

  /* 可以像修改自定义对象原型一样修改原生对象类型，但不推荐这样做 */
  String.prototype.startWith = function(text) {
    return this.indexOf(text) === 0;
  }
  let msg = "Hello world!";
  console.log(msg.startsWith("Hello")); // true
}

// ? 原型的问题
/* 原型模式的一个问题是弱化了向构造函数传递初始化参数的能力，会导致所有实例默认都取得相同的默认值，这还不是原型的最大问
  题。原型的最大问题是它的共享特性——来自包含引用值的属性 */
if (true) {
  function Person() {};
  Person.prototype = {
    constructor: Person,
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    friends: ["Shelby", "Court"],
    sayName() {
      console.log(this.name);
    }
  };
  let person1 = new Person(), person2 = new Person();
  person1.friends.push("Van");
  console.log(person1.friends, person2.friends); // ['Shelby', 'Court', 'Van'] * 2
  console.log(person1.friends === person2.friends); // true
}