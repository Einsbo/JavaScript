/**
 * Math 对象上提供的计算要比直接在 JS 上计算的快得多，因为 Math 对象上的计算使用了 JS 引擎中更高效的实现和处理器指
 * 令。但使用 Math 的问题是精度会因为浏览器、操作系统、指令集和硬件而异。 
 */

// ! Math 对象属性 —— ECMAScript 规范定义了以下值
console.log(Math.E); // 自然对数的基数 e
console.log(Math.ln10); // 10 为底的自然对数
console.log(Math.LN2); // 2 为底的自然对数
console.log(Math.LOG2E); // 以 2 为底 e 的对数
console.log(Math.LOG10E); // 以 10 为底 e 的对数
console.log(Math.PI); 
console.log(Math.SQRT1_2); // 1/2 的平方根
console.log(Math.SQRT2); // 2 的平方根

// ! min() max()
let max = Math.max(3, 54, 32, 16);
let min = Math.min(3, 54, 32, 16);
console.log(max, min); // 54, 3

let values = [1, 2, 3, 4, 5, 6, 7, 8]; // 也可以用在数组上
console.log(Math.max(...values)); // 8

// ! 舍入方法 ceil() floor() round() fround()
console.log(Math.ceil(25.9), Math.ceil(25.5), Math.ceil(25.1)); // 26, 26, 26 向上舍入最接近的整数
console.log(Math.floor(25.9), Math.floor(25.5), Math.floor(25.1)); // 25, 25, 25 向下舍入最接近的整数
console.log(Math.round(25.9), Math.round(25.5), Math.round(25.1)); // 26, 26, 25 四舍五入舍入
// 0.4000000059604645, 0.5, 25.899999618530273 返回数值最接近的单精度（32位）浮点值
console.log(Math.fround(0.4), Math.fround(0.5), Math.fround(25.9)); // 

// ! random() —— 返回 [0, 1) 内的随机数，可以基于以下公式从一组整树中随机选择一个数
// number = Math.floor(Math.random() * total_number_of_choices + first_possible_value);
console.log(Math.floor(Math.random() * 10 + 1)); // [1, 10] 内的随机整数

function selectForm(lowerValue, upperValue) { // 返回 [lowerValue, upperValue] 内的随机整数
  let choices = upperValue - lowerValue + 1;
  return Math.floor(Math.random() * choices + lowerValue);
}

let num = selectForm(2, 10);
console.log(num); 

/* 使用上面的函数从一组数组中随机选择一个元素就很容易，比如 */
let colors = ["red", "green", "blue", "yellow", "black", "purple", "brown"];
let color = colors[selectForm(0, colors.length - 1)];
console.log(color);

// TODO 其他方法
