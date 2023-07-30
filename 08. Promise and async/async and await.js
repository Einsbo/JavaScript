/**
 * async/await 让以同步方式写的代码可以异步执行
 */

let example = false;
if (example) {
  // 这个 Promise 会在超时之后解决为一个值，用 then 其实不太方便，因为其他代码必须都塞到 Promise 处理程序中
  let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
  p.then((x) => console.log(x)); // 3

  // 可以把处理程序定义为一个函数
  function handler(x) {
    console.log(x);
  }
  p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
  p.then(handler); // 这个改进也不大，因为任何需要访问该 Promise 所产生值的代码都需要以处理程序的形式来接受这个值
}

// * async —— 永远返回一个 Promise 或 undefined
// * await —— 可以暂停异步代码的执行等待 Promise 解决
/* 使用 async 可以让函数具有异步特征，但总体上代码仍然是同步求值。如果异步函数使用 return 返回了值（没有 return 
  返回 undefined），这个值会被 Promise.resolve() 包装成一个 Promise 对象，在函数外部调用这个函数可以得到它返回
  的 Promise */
async function foo() {
  console.log("1");
  let two = await Promise.resolve("2");
  console.log(two);
  console.log("3");
  return "async function return"; // same as return Promise.resolve(3);
}

foo().then(console.log); // 给返回的 Promise 添加一个解决处理程序
console.log(2);
// "1", 2, "2", "3", "async function return"
