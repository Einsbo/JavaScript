/**
 * 同步行为对应内存中顺序执行的处理器指令。每条指令都会严格按照它们出现的顺序来执行，而每条指令执行后也能立即获得存储在
 * 系统本地（如寄存器或系统内存）的信息
 * 相对的，异步行为类似于系统中断，即当前进程外部的实体可以触发代码执行。异步操作经常是必要的，因为强制程序等待一个长时
 * 间的操作通常是不可行的（同步操作则必须要等）。如果代码要访问一些高延迟的资源，比如向远程服务器发送请求并等待响应，那
 * 么就会出现长时间的等待
 */

// * 以往的异步编程 —— 会导致回调地狱 
function double(value) {
  setTimeout(() => console.log(value * 2), 1000);
}
double(3);

// * 异步返回值
/* 如果异步操作会返回一个有用的值，有什么办法将这个值传给需要它的地方？广泛接受的一个策略是给异步操作提供一个回调，这个
  回调中包含要使用异步返回值的代码（作为回调的参数）
   ? 这种模式已经不可取了，因为必须在初始化异步操作时定义回调，且异步函数的返回值只在短时间内存在 */
function double2(value, callback) {
  setTimeout(() => callback(value * 2), 1000);
}
double2(3, (x) => console.log(`I wat given: ${x}`));

// * 失败处理 —— 异步操作的失败处理在回调模型中也要考虑，因此就出现了成功回调和失败回调
function double3(value, success, failure) {
  setTimeout(() => {
    try {
      if (typeof value !== "number") {
        throw "Must provide number as first argument";
      }
      success(2 * value);
    } catch(e) {
      failure(e);
    }
  }, 1000);
}

const successCallback = (x) => console.log(`Success: ${x}`);
const failureCallback = (e) => console.log(`Failure: ${e}`);

double3(3, successCallback, failureCallback);
double3("b", successCallback, failureCallback);

/* 显然随着代码越来越复杂，上面的回调策略不具有扩展性，回调地狱因此形成 */