/**
 * ES 将对象定义为一组无序属性的集合。
 */

// ! 创建自定义对象的通常方式是通过对象字面量的方式
if (false) {
  let person = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
      console.log(this.name);
    },
  };
}

// ! 属性的类型 —— ES 使用一些内部特性来描述属性的特征
// ? 数据属性 —— 包含一个保存数据值的位置。值会从这给值读取，也会写入到这个位置
// * [[Configurable]] —— 属性是否可以通过 delete 删除并重新定义，是否可以修改它的特性以及是否可以把它改成访问器属性
// * 默认为 true
// * [[Enumerable]] —— 属性是否可以通过 for-of 循环返回，默认为 true
// * [[Writable]] —— 属性是否可以被修改，默认为 true
// * [[Value]] —— 属性实际的值，默认为 undefined

// * Object.defineProperty() —— 修改属性的默认特性
/* 接收三个参数：要添加属性的对象、属性名和描述符对象 */
if (false) {
  let person = {};
  Object.defineProperty(person, "name", {
    writable: false,
    value: "Nicholas",
    configurable: true,
    enumerable: true,
  });
  console.log(person.name); // "Nicholas"
  person.name = "Greg";
  console.log(person.name); // "Nicholas"
}

// ? 访问器属性 —— 包含一个 getter 函数和一个 setter 函数
// * [[Get]] —— 获取函数，在读取属性时调用，默认值为 undefined
// * [[Set]] —— 设置函数，在写入属性时使用，默认值为 undefined
// TODO 代码片段

// TODO 定义多个属性 defineProperties

// TODO 混入对象

// TODO 对象标识及相等判定

// ! 增强的对象语法
// ? 属性值简写
if (false) {
  let name = "Matt";
  person = {
    name: name,
  };
  console.log(person); // {name: 'Matt'}
}
// * 给对象添加变量时，如果属性名和变量名相同，则可使用简写语法
if (false) {
  person = {
    name,
  };
  console.log(person); // {name: 'Matt'}
}

// * 代码压缩程序会在不同作用域间保留属性名以防找不到引用
if (false) {
  function makePerson(name) {
    return { name }; // 即使标识符只限定于函数作用域，编译器也会保留初始的标识符
  }
  person = makePerson("Matt");
  console.log(person.name); // Matt
}
/* 如果使用 Google Closure 编译器压缩，那么函数参数会被缩短，而属性名不变： */
if (false) {
  function makePerson(a) {
    return { name: a };
  }
  person = makePerson("Matt");
  console.log(person.name); // Matt
}

// ? 可计算属性
/* 在引入可计算属性之前，如果想使用变量的值作为属性，必须先声明对象，然后使用中括号语法来添加属性。换句话说，不能再对象
  字面量中直接动态命名属性。 */
if (false) {
  const nameKey = "name";
  const ageKey = "age";
  const jobKey = "job";

  let person = {};
  person[nameKey] = "Matt";
  person[ageKey] = 27;
  person[jobKey] = "Software engineer";
  console.log(person); // {name: 'Matt', age: 27, job: 'Software engineer'}
}

// * 有了可计算属性，就可以在对象字面量中完成动态属性赋值。JS 将中括号包围的内容当作表达式求值
if (false) {
  const nameKey = "name";
  const ageKey = "age";
  const jobKey = "job";

  let person = {
    [nameKey]: "Does",
    [ageKey]: 28,
    [jobKey]: "Software engineer",
  };
  console.log(person); // {name: 'Does', age: 28, job: 'Software engineer'}
}

// * 因为被当作 JS 表达式求值，所以可计算属性本身可以是复杂的表达式，在实例化时求值
if (false) {
  let uniqueToken = 0;
  function getUniqueKey(key) {
    return `${key}_${uniqueToken++}`;
  }
  let person = {
    [getUniqueKey(nameKey)]: "Matt",
    [getUniqueKey(ageKey)]: 27,
    [getUniqueKey(jobKey)]: "Software engineer",
  };
  console.log(person); // {name_0: 'Matt', age_1: 27, job_2: 'Software engineer'}
}

// ? 简写方法名
/* 再给对象定义方法时，通常都要写一个方法，以前的写法时这样的 */
if (false) {
  let person = {
    sayName: function (name) {
      console.log(`My name is ${name}`);
    },
  };
  person.sayName("Matt"); // My name is Matt
}

// * 简写的方法语法遵循同样的模式
if (false) {
  let person = {
    sayName(name) {
      console.log(`My new name is ${name}`);
    },
  };
  person.sayName("Matt"); // My new name is Matt
}

// * 简写方法名对 getter 函数和 setter 函数也适用
if (false) {
  let person = {
    name_: "",
    get name() {
      return this.name_;
    },
    set name(name) {
      this.name_ = name;
    },
    sayName() {
      console.log(`My name is ${this.name_}`);
    },
  };
  person.name = "Matt";
  person.sayName(); // My name is Matt
}

// * 简写方法名可与计算属性健相互兼容
if (false) {
  const methodKey = "sayName";
  let person = {
    [methodKey](name) {
      console.log(`My name is ${name}`);
    },
  };
  person.sayName("Matt"); // Myu name is Matt
}

// ! 对象解构
/* ES6 的对象解构语法可以在一条语句中使用嵌套数据实现一个或多个赋值操作。简单的说，对象解构就是使用与对象匹配的结构来
  实现对象属性赋值 */

/* 不使用对象解构 */
if (!true) {
  let person = {
  name: "Matt",
  age: 27,
  };
  let personName = person.name,
    personAge = person.age;
  console.log(personName, personAge); // Matt 27
}

// ? 使用对象解构
if (!true) {
  let person = {
    name: 'Matt',
    age: 27
  };
  let { name: personName, age: personAge } = person;
  console.log(personName, personAge); // Matt 27
}

// * 如果想让变量直接使用属性名，则可以使用简写语法 
if (!true) {
  let person = {
    name: 'Matt',
    age: 27
  };
  let {name, age} = person;
  console.log(name, age); // Matt 27
}

// * 解构赋值不一定与对象的属性匹配，赋值的时候可以忽略某些属性，而如果引用的属性不存在，则该变量的值就是 undefined 
if (!true) {
  let person = {
    name: 'Matt',
    age: 27
  };
  let {name, job} = person;
  console.log(name, job); // Matt undefined
}

// *  也可以在解构赋值的同时定义默认值，适用于上面引用的属性不存在于源对象的情况
if (!true) {
  let person = {
    name: 'Matt',
    age: 27
  };
  let {name, job = 'Software engineer'} = person;
  console.log(name, job); // 'Matt', 'Softwaare engineer'
}

// ? 解构在内部使用函数 ToObject()（无法在运行时环境中访问）把源数据结构转换为对象。
/* 这意味着在对象解构的上下文中，原始值会被当成对象。根据 ToObject() 定义，null 和 undefined 不能被解构 */
if (!true) {
  let {length} = 'foobar';
  let {constructor: c} = 4;
  console.log(length, c === Number); // 6 true

  let { _ } = null; // TypeError
}

// * 解构时如果给之前声明的变量赋值，则赋值表达式必须包含在一对括号中
if (!true) {
  let personName, personAge;
  let person = {
    name: 'Matt',
    age: 27
  };
  ({name: personName, age: personAge} = person);
  console.log(personName, personAge); // Matt 27
}

// ! 嵌套解构
/* 解构对于引用嵌套的属性或赋值目标没有限制，因此可以通过解构来复制对象属性 */
if (!true) {
  let person = {
    name: 'Matt',
    age: 27,
    job: {
      title: 'Software engineer'
    }
  };
  let personCopy = {};
  ({
    name: personCopy.name,
    age: personCopy.age,
    job: personCopy.job
  } = person);

  /* 因为一个对象的引用被赋值给 personCopy，所以修改 person.job 对象的属性也会影响 personCopy */
  person.job.title = 'Hacker';

  console.log(person, personCopy); // {name: 'Matt', age: 27, job: {{title: 'Hacker'}}} * 2

  let {job: {title}} = person; // 声明 title 变量并将 person.job.title 的值赋给它
  console.log(title); // Hacker
}

// ! 部分解构
/* 涉及多个属性的解构赋值是一个输出无关的顺序化操作，如果一个解构表达式涉及多个赋值，开始的赋值成功而后面的赋值出错，则
  整个解构赋值只会完成一部分 */
if (!true) {
  let person = {
    name: 'Matt',
    age: 27
  };
  let personName, personBar, personAge;
  try {
    // person.foo 是 undefined，因此会抛出错误
    ({name: personName, foo: {bar: personBar}, age: personAge} = person);
  } catch(e) {};

  console.log(personName, personBar, personAge); // Matt, undefined, undefined
}

// ! 参数上下文匹配
/* 在函数参数列表中也可以进行解构赋值，这不会影响 arguments 对象 */
if (!true) {
  let person = {
    name: 'Matt',
    age: 27
  };

  function printPerson(foo, {name, age}, bar) {
    console.log(arguments);
    console.log(name, age);
  }

  function printPerson2(foo, {name: personName, age: personAge}, bar) {
    console.log(arguments);
    console.log(personName, personAge);
  }

  printPerson('1st', person, '2nd');
  // Arguments(3) ['1st', {…}, '2nd', callee: (...), Symbol(Symbol.iterator): ƒ]
  // 'Matt' 27

  printPerson2('1st', person, '2nd');
  // Arguments(3) ['1st', {…}, '2nd', callee: (...), Symbol(Symbol.iterator): ƒ]
  // 'Matt' 27
}

