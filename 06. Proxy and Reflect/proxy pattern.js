// ! 跟踪属性访问
/* 通过捕获 get, set 和 has 等操作可以知道对象属性什么时候被访问、被查询。把实现相应捕获器等某个对象代理放到应用中，
  可以监控这个对象何时何处被访问过 */
if (!true) {
  const user = {name: 'Jake'};
  const proxy = new Proxy(user, {
    get(target, property, receiver) {
      console.log(`Getting ${property}`);
      return Reflect.get(...arguments);
    },
    set(target, property, value, receiver) {
      console.log(`Setting ${property} = ${value}`);
      return Reflect.set(...arguments);
    }
  });
  proxy.name; // 'Getting name'
  proxy.age = 27; // 'Setting age = 27'
}

// ! 隐藏属性
/* 代理内部实现对外部代码是不可见的，所以要隐藏目标对象上的属性也轻而易举 */
if (!true) {
  const hiddenProperties = ['foo', 'bar'];
  const targetObject = {
    foo: 1,
    bar: 2,
    baz: 3
  };
  const proxy = new Proxy(targetObject, {
    get (target, property) {
      if (hiddenProperties.includes(property)) {
        return undefined;
      } else {
        return Reflect.get(...arguments);
      }
    },
    has (target, property) {
      if (hiddenProperties.includes(property)) {
        return false;
      } else {
        return Reflect.has(...arguments);
      }
    }
  });

  // get()
  console.log(proxy.foo, proxy.bar, proxy.baz); // undefined undefined 3
  // has()
  console.log('foo' in proxy, 'bar' in proxy, 'baz' in proxy); // false false true
}

// ! 属性验证
/* 因为所有赋值操作都会触发 set() 捕获器，所以可以根据所赋的值决定允许还是拒绝赋值 */
if (!true) {
  const target = {onlyNumbersGoHere: 0};
  const proxy = new Proxy(target, {
    set(target, property, value) {
      if (typeof value !== 'number') {
        return false;
      } else {
        return Reflect.set(...arguments);
      }
    }
  });
  proxy.onlyNumbersGoHere = 1;
  console.log(proxy.onlyNumbersGoHere); // 1
  proxy.onlyNumbersGoHere = '2';
  console.log(proxy.onlyNumbersGoHere); // 1
}

// ! 函数与构造函数参数验证
/* 跟保护和验证对象属性类似，也可以对函数和构造函数参数进行审查 */
if (!true) {
  // 比如可以让函数只接收某种类型的值 
  function median(...nums) {
    return nums.sort()[Math.floor(nums.length / 2)];
  }
  const proxy = new Proxy(median, {
    apply(target, thisArg, argumentsList) {
      for (const arg of argumentsList) {
        if (typeof arg !== 'number') {
          throw 'Non-number argument provided';
        }
      }
      return Reflect.apply(...arguments);
    }
  });

  console.log(proxy(4, 7, 1)); // 4

  // 类似的，可以要求实例化时必须给构造函数传参
  class User {
    constructor(id) {
      this.id_ = id;
    }
  }
  const userProxy = new Proxy(User, {
    construct(target, argumentsList, newTarget) {
      if (argumentsList[0] === undefined) {
        throw 'User cannot be instantiated without id';
      } else {
        return Reflect.construct(...arguments);
      }
    }
  });
  new userProxy(1);
  // new userProxy(); // Uncaught User cannot be instantiated without id
}

// ! 数据绑定与可观察对象
/* 通过代理可以把运行时中原本不相关的部分联系到一起，这样就可以实现各种模式从而让不同的代码互相操作 */
if (true) {
  // 比如可以讲被代理的类绑定到一个全局实例集合，让所有创建的实例都被添加到这个集合中
  const userList = [];
  class User {
    constructor(name) {
      this.name_ = name;
    }
  }
  const proxy = new Proxy(User, {
    construct() {
      const newUser = Reflect.construct(...arguments);
      userList.push(newUser);
      return newUser;
    }
  });

  new proxy('John');
  new proxy('Jacob');
  new proxy('Jingleheimerschmidt');
  console.log(userList); // [User {name_: 'John'}, User {name_: 'Jacob'}, User] {name_: 'Jingleheimerschmidt'}

  // 还可以把集合绑定到一个事件分派程序，每次插入新实例时都会发送消息
  function emit(newValue) {
    console.log(newValue);
  }
  const emitProxy = new Proxy(userList, {
    set(target, property, value, receiver) {
      const result = Reflect.set(...arguments);
      if (result) {
        emit(Reflect.get(target, property, receiver));
      }
      return result;
    }
  });
  emitProxy.push('John');
  emitProxy.push('Jacob'); 
}