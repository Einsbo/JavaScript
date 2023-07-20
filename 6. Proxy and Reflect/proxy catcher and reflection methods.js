// ! get(target, property, receiver) —— 在获取属性值的操作中被调用，反射 API 为 Reflect.get()
/**
 * * 返回值：无限制
 * * 拦截的操作：
 *    proxy.property
 *    proxy[property]
 *    Object.create(proxy)[property]
 *    Reflect.get(proxy, property, receiver)
 * * 捕获器处理程序参数
 *    target: 目标对象
 *    property: 引用的目标对象上的字符串健属性
 *    receiver: 代理对象或继承代理对象的对象
 * * 捕获不变式
 *    如果 target.property 不可写且不可配置，则处理程序返回的值必须与 target.property 匹配
 *    如果 target.property 不可配置且 [[Get]] 特性为 undefined，则返回值必须是 undefined
 */
if (!true) {
  const myTarget = {};
  const proxy = new Proxy(myTarget, {
    get(target, property, receiver) {
      console.log('get()');
      return Reflect.get(...arguments);
    }
  });
  proxy.foo; // 'get()'
}

// ! set(target, property, value, receiver) —— 在设置属性值的操作中被调用，反射 API 为 Reflect.set()
/**
 * * 返回值：true 表示成功；false 表示失败，严格模式下会抛出 TypeError
 * * 拦截的操作
 *    proxy.property = value
 *    proxy[property] = value
 *    Object.create(proxy)[property] = value
 *    Reflect.set(proxy, property, value, receiver)
 * * 捕获器处理程序参数
 *    target: 目标对象
 *    property: 引用的目标对象上的字符串健属性
 *    value: 要赋给属性的值
 *    receiver: 接收最初赋值的对象
 * * 捕获器不变器
 *    如果 target.property 不可写且不可配置，则不能修改目标属性的值
 *    如果 target.property 不可配置且 [[Set]] 为 undefined，则不能修改目标属性的值
 *    在严格模式下处理程序中返回 false 会抛出 TypeError
 */
if (!true) {
  const myTarget = {};
  const proxy = new Proxy(myTarget, {
    set(target, property, value, receiver) {
      console.log('set()');
      return Reflect.set(...arguments);
    }
  });
  proxy.foo = 'bar'; // 'set'
  console.log(myTarget);
}

// ! has(target, property) —— 在 in 操作符中被调用，反射 API 为 Reflect.has()
/**
 * * 返回值：has() 必须返回布尔值，表示属性是否存在，非布尔值会被转型为布尔值
 * * 拦截的操作
 *    property in proxy
 *    property in Object.create(proxy)
 *    with(proxy) {(property)}
 *    Reflect.has(proxy, property)
 * * 捕获器处理器程序参数
 *    target: 目标对象
 *    property: 引用的目标对象上的字符串健属性
 * * 捕获器不变式
 *    如果 target.property 存在且不可配置，则处理程序必须返回 true
 *    如果 target.property 存在且目标对象不可扩展，则处理程序必须返回 true
 */
if (!true) {
  const myTarget = {};
  const proxy = new Proxy(myTarget,  {
    has(target, property) {
      console.log('has()');
      return Reflect.has(...arguments)
    }
  });
  console.log('foo' in proxy); // 'has()', false
}

// ! defineProperty(target, property, descriptor) —— 在 Object.defineProperty() 中被调用，反射 API 为 Reflect.defineProperty()
/**
 * * 返回值：defineProperty() 必须返回布尔值，表示属性是否存在，非布尔值会被转型为布尔值
 * * 拦截的操作
 *    Object.defineProperty(proxy, property, descriptor)
 *    Reflect.defineProperty(proxy, property, descriptor)
 * * 捕获器处理程序参数
 *    target: 目标对象
 *    property: 引用的目标对象上的字符串健属性
 *    descriptor: 包含可选的 enumerable, configurable, writable, value, get, set 定义的对象
 * * 捕获器不变式
 *    如果目标对象不可扩展，则无法定义属性
 *    如果目标对象有一个可配置的属性，则不能添加同名的不可配置属性
 *    如果目标对象有一个不可配置的属性，则不能添加同名的可配置属性
 */
if (!true) {
  const myTarget = {};
  const proxy = new Proxy(myTarget, {
    defineProperty(target, property, descriptor) {
      console.log('defineProperty()');
      return Reflect.defineProperty(...arguments);
    }
  });

  Object.defineProperty(proxy, 'foo', {value: 'bar'}); // 'defineProperty()'
  console.log(myTarget);
}

// TODO getOwnPropertyDescriptor()

// TODO deleteProperty()

// TODO ownKeys()

// TODO getPrototypeOf()

// TODO setPrototypeOf()

// TODO isExtensible()

// TODO preventExtensions() 9.2.11

// TODO apply() 9.2.12

// TODO construct()