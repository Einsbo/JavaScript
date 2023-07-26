/* 创建日期对象 */
let now = new Date();
console.log(now);

/* 在不给 Date 构造函数传递参数的情况下，该对象保存当前日期和时间。要基于其他日期和时间创建对象，必须传入其毫秒表示。
  ECMAScript 提供了两个辅助方法：Date.parse() 和 Date.UTC()。
   Date.parse() 接受一个表示日期的字符串参数，尝试将这个字符串转换为表示该日期的毫秒数。它支持的日期格式为：
  "5/23/2019" "May 23, 2019" "Tue May 23 2019 00:00:00 GMT-0700" "2019-05-23T00:00:00" 如果传入的字符
  串不表示日期，该方法会返回 NaN，如果直接把表示日期的字符串传给 Date 构造函数，那么构造函数会在后台调用 
  Date.parse() 
   Date.UTC() 也返回日期的毫秒表示，传递给它的参数是年、零起点月数（1月是0）、日（1～31）、时（0～23）、分、秒和毫秒。
  这些参数中，只有前两个是必须的，如果不提供日则默认为1，其他默认为0 */
let someDate = new Date("May 23, 2019");
let y2k = new Date(2000, 0);

console.log(someDate, y2k);

// ECMAScript 提供了 Date.now() 方法，返回表示方法执行时日期和时间的毫秒数，该方法可以方便的用于代码调试
function doSomething() {};
let start = Date.now(); // 起始时间
doSomething(); // 调用函数
let stop = Date.now(); // 结束时间
result = stop - start; // 中间花费时间

/* Date 类型重写了 toLocaleString()、toString() 和 valueOf() 方法。
   toLocaleString() 返回与浏览器本地环境一致的日期和时间，格式中包含针对时间的 AM/PM，但不包含时区信息
   toString() 返回带时区信息的日期和时间，时间以 24 小时制（0～23）表示
   valueOf() 返回的是日期的毫秒表示，因此可以用操作符（大于号或小于号）直接比较它的返回值 */
console.log(someDate.toLocaleString());
console.log(someDate.toString());
console.log(someDate.valueOf());

