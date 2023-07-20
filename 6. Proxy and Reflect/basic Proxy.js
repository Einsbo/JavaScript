/**
 * 代理是目标对象的抽象，它可以用作目标对象的替身，但又完全独立于目标对象。目标对象既可以直接被操作，也可以通过代理来
 * 操作，直接操作会绕过代理的行为。
 */
// ! 创建空代理 —— 最简单的代理，除了作为一个抽象的目标对象什么也不做
/* 代理使用 Proxy 构造函数创建，这个构造函数接收两个参数：目标对象和处理程序对象。缺少其中任何一个都会抛出 TypeError，
  要创建空代理，可以传一个简单的对象字面量作为处理程序对象，从而让所有操作顺畅无阻的抵达目标对象 */
if (!true) {
  const target = {
    id: 'target'
  };
  const handler = {};
  const proxy = new Proxy(target, handler);

  console.log(target.id, proxy.id); // 'target' * 2, id 属性会访问同一个值
  target.id = 'foo'; // 给目标属性赋值会反映在两个对象上，因为两个对象访问的是同一个值
  console.log(target.id, proxy.id); // 'foo' * 2
  proxy.id = 'bar'; // 给代理属性赋值会反映在两个对象上，因为这个赋值会转移到目标对象
  console.log(target.id, proxy.id); // 'bar' * 2
  console.log(target.hasOwnProperty('id'), proxy.hasOwnProperty('id')); // true * 2
  // Proxy.prototype 是 undefined，因此不能使用 instanceof 操作符
  // console.log(target instanceof Proxy);  // TypeError: Function has non-object prototype 'undefined' in instanceof check
  // console.log(proxy instanceof Proxy); // TypeError: Function has non-object prototype 'undefined' in instanceof check
  console.log(target === proxy); // false, 严格相等可以区分代理和目标
} 

// * 捕获器 —— 使用代理的主要目的是可以定义捕获器
/* 捕获器就是在处理程序对象中定义的“基本操作的拦截器”。每个处理程序对象可以包含零个或多个捕获器，每个捕获器都对应一种
  基本操作，可以直接或间接在代理对象上调用。每次在代理对象上调用这些基本操作时，代理可以在这些操作传播到目标对象之前先
  调用捕获器函数，从而拦截并修改相应的行为 */
if (!true) {
  const target = {
    foo: 'bar'
  };

  const handler = {
    // 捕获器在处理程序中给你以访问方法名为健
    // get() 捕获器会接收到目标对象、要查询的属性和代理对象三个参数
    get(trapTarget, property, receiver) {
      console.log(trapTarget === target);
      console.log(property);
      console.log(receiver === proxy);
      return 'handler override';
    }
  };
  
  const proxy = new Proxy(target, handler);

  console.log(proxy.foo); // 通过代理对象执行 get() 会触发定义的 get() 捕获器
}

/* 所有的捕获器都可以基于自己的参数重建原始操作，但并非所有捕获器行为都像 get() 那么简单，因此手动写代码的方式时不现实
  的，实际上开发者不需要手动重建原始行为，而可以通过调用全局 Reflect 对象上（封装了原始行为）的同名方法来轻松重建。
   处理程序对象中所有可以捕获的方法都有对应的反射（Reflect）API 方法，这些方法与捕获器拦截的方法具有相同的名称和函数
  签名，而且也具有与被拦截方法相同的行为 */
if (!true) {
  // 使用反射 API 可以像下面这样定义出空代理对象
  const target = {
    foo: 'bar'
  };
  const handler = {
    get() {
      return Reflect.get(...arguments);
    }
    // 或者可以写的更简洁：
    // get: Reflect.get
  }

  const proxy = new Proxy(target, handler);
  console.log(proxy.foo, target.foo); // 'bar' * 2

  // 如果想创建一个可以捕获所有方法，然后将每个方法转发给对应反射 API 的空代理，甚至不需要定义处理程序对象
  const proxyAll = new Proxy(target, Reflect);
  console.log(proxy.foo, proxyAll.foo); // 'bar' * 2

  // * 反射 API 为开发者准备好了样板代码，在此基础上可以用最少的代码修改捕获的方法
  // const handler = {
  //   get(trapTarget, property, receiver) {
  //     let decoration = '';
  //     if (property === 'foo') {
  //       decoration = '!!!';
  //     }
  //     return Reflect.get(...arguments) + decoration;
  //   };
  // }
  // const proxy = new Proxy(target, handler);
  // console.log(proxy.foo, target.foo); // 'bar!!!', 'bar'
  // console.log(proxy.baz, target.baz); // 'qux' * 2
}

// * 捕获器不变式 —— 捕获器不变式因方法不同而异，但通常都会防止捕获器定义出现过于反常的行为
// * 可撤销代理 —— 中断代理对象与目标对象之间的联系
if (!true) {
  // 比如，如果目标对象有一个不可配置且不可写的数据属性，那么在捕获器返回一个与该属性不同的值时会抛出 TypeError
  const target = {};
  Object.defineProperty(target, 'foo', {
    configurable: false,
    writable: false,
    value: 'bar'
  });
  const handler = {
    get() {
      return 'qux';
    }
  };

  /* 对于使用 new Proxy() 创建的普通代理来说，联系会在代理对象的生命周期内一直持续存在，Proxy() 暴露了 
    revocable() 方法，这个方法支持撤销代理对象与目标对象之间的关联，撤销代理的操作时不可逆的，而且撤销函数
    （revoke()）调用多少次的结果都一样。撤销代理之后再调用代理会抛出 TypeError */
  // 撤销函数和代理对象是在实例化时同时生成的

  const {proxy, revoke} = Proxy.revocable(target, handler);
  // console.log(proxy.foo); // TypeError: 'get' on proxy: property 'foo' is a read-only and ...
  revoke();
  console.log(proxy.foo); // TypeError: Cannot perform 'get' on a proxy that has been revoked
}

// * 实用反射 API
/* 反射 API 并不限于捕获处理程序，大多数反射 API 方法在 Object 类型上有对应的方法。通常，Object 上的方法适用于通用
  程序，而反射方法适用于细粒度的对象控制与操作
   很多反射方法返回称作“状态标记”的布尔值，表示意图执行的操作是否车个能够给你，有时候状态标记比那些返回修改后的对象或者
  抛出错误（取决于方法）的反射 API 方法更有用。以下反射方法都会提供状态标记
    Reflect.defineProperty()
    Reflect.preventExtensions()
    Reflect.setPrototypeOf()
    Reflect.set()
    Reflect.deleteProperty()

   用一等函数替代操作符——以下反射方法提供只有操作符才能完成的操作
    Reflect.get()：替代对象属性访问操作符
    Reflect.set()：替代 = 赋值操作符
    Reflect.has()：替代 in 操作符或 with()
    Reflect.deleteProperty()：替代 delete 操作符
    Reflect.construct()：替代 new 操作符
*/
if (!true) {
  const o = {};
  // 可以使用反射 API 对下面的代码进行重构
  // 初始代码
  try {
    Object.defineProperty(o, 'foo', 'bar');
    console.log('success');
  } catch(e) {
    console.log(e, 'failure');
  }
  console.log(o);

  // 重构后的代码
  if (Reflect.defineProperty(o, 'foo', {value: 'bar'})) {
    // 在定义新属性时如果发生问题，Reflect.defineProperty() 会返回 false 而不是抛出错误
    console.log('success');
  } else {
    console.log('failure');
  }
  console.log(o);

  // * 安全的应用函数
  /* 在通过 apply 方法调用函数时，被调用的函数可能也定义了自己的 apply 属性（虽然可能性极小），为绕过这个问题，可以
    使用定义在 Function 原型上的 apply 方法，比如 */
  Function.prototype.apply.call(myFunc, thisVal, argumentList);
  // 可以使用 Reflect.apply 来避免
  Reflect.apply(myFunc, thisVal, argumentList);
}

// * 代理另一个代理 —— 可以在一个目标对象上构建多层拦截网
if (!true) {
  const target = {
    foo: 'bar'
  };

  const firstProxy = new Proxy(target, {
    get() {
      console.log('first proxy');
      return Reflect.get(...arguments);
    }
  });

  const secondProxy = new Proxy(firstProxy, {
    get() {
      console.log('second proxy');
      return Reflect.get(...arguments);
    }
  });

  console.log(secondProxy.foo); // 'second proxy', 'first proxy', 'bar'
}

// TODO 代理的问题与不足 —— 9.1.8

