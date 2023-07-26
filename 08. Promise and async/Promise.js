/**
 * ! ES6 新增的引用类型 Promise 可以通过 new 操作符来实例化
 * 创建一个新的 Promise 需要传入执行器函数作为参数
 * * Promise 是一个有状态的对象，它可能处于如下三种状态之一：
 *    待定（pending）     
 *    兑现（fulfilled，有时也称为“解决”，resolved）
 *    拒绝（rejected）
 * * pending 是 Promise 的最初始状态，Promise 可以落定为代表成功的 fulfilled 状态或者代表失败的 rejected 状态
 * 
 * 无论落定为哪种状态都是不可逆的，只要从 pending 状态转换为另一种状态，就无法逆转了，另外 Promise 的状态是私有的，
 * 无法被 JS 检测到，这主要是为了避免读取到 Promise 状态以同步到方式处理 Promise 对象
 * 
 * * Promise 有两大用途：一个是抽象地表示异步操作，状态表示 Promise 是否完成，在某种情况下，状态机就是 Promise 可
 * * 以提供到最有用的信息，知道一段异步代码已经完成对于其他代码而言已经足够了；另一个情况是 Promise 封装的异步操作会
 * * 产生一个值，而程序期待 Promise 状态改变时可以访问这个值。
 * 
 * * 为了支持上述两个用例，每个 Promise 只要状态切换为 fulfilled 就会有一个私有的内部值，状态切换为 rejected 就
 * * 会有一个私有的内部理由（reason）
 */

// ! resolve(), reject() —— 通过执行函数控制 Promise 状态
/* 因为 Promise 状态是私有的，所以只能在内部进行操作。执行器函数主要有两项职责：初始化 Promise 的异步行为和控制状态
  的最终转换。其中控制 Promise 状态的转换是通过调用它的两个参数实现的，这两个参数通常命名为 resolve 和 reject，调
  用 resolve() 会把状态切换为 fulfilled，调用 reject() 会把状态切换为 rejected 并抛出错误 */

// ? 为避免 Promise 卡在 pending 可以添加一个定时退出功能
/* 这里可以通过 setTimeout 设置一个 10 秒钟后无论如何都会让状态变为 rejected 的回调 */
if (!true) {
  let p = new Promise((resolve, rejected) => {
    /* 因为 Promise 的状态只能改变一次，所以这里的超时拒绝逻辑可以放心的设置让 Promise 处于 pending 状态的最长
      时间，如果执行器中的代码在超市之前已经解决或拒绝，那么超时回调再尝试让状态转变为拒绝时会失败 */
    setTimeout(rejected, 10000); // 10 秒后调用 reject()
  })
  setTimeout(console.log, 0, p); // Promise {<pending>}
  setTimeout(console.log, 11000, p); 
  // (After 10 seconds) Uncaught error
  // (After 11 seconds) Promise {<rejected>: undefined}
}

// * resolve(), reject()
if (!true) {
  // 使用 Promise.resolve() 可以让任何值都转换为一个 Promise
  let p1 = new Promise((resolve, rejected) => resolve()); // 这两行一样
  let p2 = Promise.resolve(); // 调用 Promise.resolve() 可以实例化一个解决的 Promise

  setTimeout(console.log, 0, Promise.resolve()); // Promise {<fulfilled>: undefined}
  setTimeout(console.log, 0, Promise.resolve(3)); // Promise {<fulfilled>: 3}

  // 对于这个 resolve() 来说，如果传入的参数本身是 Promise，那么它的行为就相当于空包装，因此它可以说是一个幂等方法
  setTimeout(console.log, 0, p1 === Promise.resolve(p1)); // true
  setTimeout(console.log, 0, p1 === Promise.resolve(Promise.resolve(p1))); // true

  // Promise.reject() 与 resolve() 类似，它会实例化一个 rejected 的 Promise 并抛出一个异步错误

  // Promise 的设计会导致一种完全不同的 JS 计算模式，下面包含了两种模式下抛出错误的情况
  /* 第一个 try/catch 抛出并捕获了错误，第二个却没有，这是因为第二个 try/catch 没有通过异步模式捕获错误，Promise
    的异步特性是：它们是同步对象，但也是异步执行模式的媒介。代码一旦开始以异步模式执行，唯一与之交互的方式就是使用异步
    结构——Promise 方法 */
  try {
    throw new Error("foo");
  } catch(e) {
    console.log(e); // Error: foo
  }

  try {
    Promise.reject(new Error("bar"));
  } catch(e) {
    console.log(e); // Uncaught (in promise) Error: bar
  }
}

// ! Promise 的实例方法
// * Promise.prototype.then() —— 接受最多两个参数：onResolved 和 onRejected
/* 两个参数都是可选的，如果提供的话，则会在 Promise 分别进入 fulfilled 和 rejected 状态时执行，因为 Promise 只
  能转换为最终状态一次，所以这两个操作一定是互斥的 */
function onResolved(id) {
  setTimeout(console.log, 0, id, "resolved");
}
function onRejected(id) {
  setTimeout(console.log, 0, id, "rejected");
}
if (true) {
  let p1 = new Promise((resolve, reject) => setTimeout(resolve, 3000));
  let p2 = new Promise((resolve, reject) => setTimeout(reject, 3000));

  p1.then(() => onResolved("p1"), () => onRejected("p1"));
  p2.then(() => onResolved("p2"), () => onRejected("p2"));

  // (3 秒后) p1 resolved, p2 rejected
  /* 如果只提供 obRejected 参数，那就要在 onResolved 参数的位置上传入 undefined，这样有助于避免在内存中创建多余
    的对象，对期待函数的类型系统也是一个交代
        p2.then(null, () => onRejected("p2")); // 不传 onResolved 处理程序的规范写法
  */

  // * Promise.prototype.then() 返回一个新的 Promise 实例
  /* 这个新 Promise 实例基于 onResovled 处理程序的返回值构建，换句话说，它会通过 Promise.resolve() 来生成新的
    Promise */
  let p3 = new Promise(() => {}); 
  let p4 = p1.then();
  setTimeout(console.log, 0, p3); // Promise {<pending>}
  setTimeout(console.log, 0, p4); // Promise {<pending>}
  setTimeout(console.log, 0, p3 === p4); // false
}