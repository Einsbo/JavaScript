// * if-else
let i = 26;
if (i > 25) {
  console.log("Greater than 25.");
} else {
  console.log("Less than or equal to 25.");
}

// * do-while 
let s = 0;
do {
  s += 2;
} while (s < 10);
console.log(s); // 10

// * while 
let k = 0;
while (k < 10) {
  k += 2;
}
console.log(k); // 10

// * for 
let count = 10;
for (let i = 0; i < count; i++) {
  console.log(i);
} // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

// * for-in —— 枚举对象中的非符号键属性 
// 每次循环都会给变量 propName 赋予一个 window 对象中的属性作为值，直到 window 的所有属性都被枚举一遍
// 如果 for-in 迭代的对象为 null 或 undefined 则不执行循环体
for (const propName in window) {
  document.write(propName + "<br>");
}

// * for-of —— 遍历可迭代对象的元素，按照可迭代对象的 next() 方法产生值的顺序迭代元素 
for (const el of [2, 4, 6, 8]) {
  document.write(el + "<br>");
}

// * break and continue
let num = 0;
for (let i = 1; i < 10; i++) {
  if (i % 5 === 0) {
    break;
    // continue;
  }
  num++;
}
console.log(num); // break: 4, continue: 8

// * switch
// JS 中的 switch 语句可以用于所有数据类型，比如字符串甚至对象。条件的值不需要是常量，也可以是变量或表达式
switch ("hello world") {
  case "hello" + " world":
    console.log("Greetign was found");
    break;
  case "goodbye":
    console.log("Closing was found.");
    break;
  default:
    console.log("Unexpected message was found.");
}
