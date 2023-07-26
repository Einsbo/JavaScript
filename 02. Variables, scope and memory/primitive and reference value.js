/* ECMAScript 变量包含两种不同类型的数据：原始值（primitive value）和引用值（reference value）。保存原始值的变
  量是按值（by value）访问的，因为操作的就是存储在变量中的实际值。引用值是保存在内存中的对象，JS 不允许直接访问内存，
  因此操作对象时实际上操作的是该对象的引用（reference）而非对象本身。 */

/* Dynamic attribute —— 对于引用值而言，可以随时添加、修改和删除起属性和方法 */
let person = new Object(); // 只有引用值可以动态添加可以使用的属性
person.name = "Nicholas";
console.log(person.name); // "Nicholas"

// Copy —— 除了存储方式不同，原始值和引用值在变量复制时也有所不同。原始值复制是创建一个独立的新值，而引用值不同。
let num1 = 5;
let num2 = num1; // num1 num2 相互独立互不影响
num1 = 8;
console.log(num1, num2); // 8, 5

let obj1 = new Object();
let obj2 = obj1; // 这里实际上是让 obj2 指向 obj1 指向的堆内存中的对象，它们实际上都指向了同一个对象
obj1.name = "Salohcin";
console.log(obj1.name, obj2.name); // "Salohcin", "Salohcin"

// 传递参数 —— ECMAScript 中所有的函数都是按值传递的，对于引用值来说这个行为类似引用值的复制。在按引用传递参数时，值
//    在内存中的位置会被保存在一个局部变量，这意味着对本地变量的修改会反映到函数外部
function addTen(num) { // num 是局部变量
  num += 10;
  return num;
}
let count = 20;
let result = addTen(count);
console.log(count, result); // 20, 30 -> count 没有任何变化

function setName(obj) {
  obj.name = "Skol"; // obj 与传入进来的对象都指向同一个内存块，即使它是按值传递的，obj 也会通过引用访问对象

  // 为证实 obj 是按值传递的，可以测试以下两行代码
  // obj = new Object(); // 将 obj 定义为一个新对象
  // obj.name = "Greg"; // 如果 obj 是按引用传递的，下面的 player.name 将会是 Greg
}
let player = new Object();
setName(player);
console.log(player.name); // "Skol"

// 确定引用值类型 —— 引用值类型的确定不适合使用 typeof，而使用 instanceof
console.log(person instanceof Object); // 变量 person 是否为 Object
console.log(person instanceof Array);
console.log(person instanceof RegExp);
