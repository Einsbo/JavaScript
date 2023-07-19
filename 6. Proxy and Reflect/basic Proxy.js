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
if (true) {
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