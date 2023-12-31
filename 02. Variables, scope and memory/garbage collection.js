/**
 * JavaScript 中，每隔一段时间就会自动执行一次垃圾回收：确定哪个变量不会再使用，然后释放它的内存。垃圾回收是一个近似
 * 且不完美的方案，因为某块内存是否还有用，属于“不可判定的”问题，无法靠算法解决。
 * 垃圾回收程序必须跟踪记录哪个变量还会使用，以及哪个变量不会再使用，以便回收内存。如何标记未使用的变量有多种不同的方式。
 * 主要的两种标记策略为标记清理和引用计数。
 * 
 * 1. 标记清理
 * JavaScript 最常用的垃圾回收策略，当变量进入上下文，比如在函数内部声明一个变量时，这个变量会被加上存在于上下文中的
 * 标记，当变量离开上下文时，也会被加上离开上下文的标记。逻辑上讲，在上下文中的变量永远不应该释放它的内存，因为只要上下
 * 文中的代码在运行，就有可能用到它们。给变量加标记的方式有很多种，这个实现并不重要，关键是策略。
 * 
 * 垃圾回收程序运行的时候，会标记内存中存储的所有变量。然后他会将所有在上下文中的变量以及被在上下文中的变量引用的变量大
 * 标记去掉。在此之后再被加上标记的变量就是待删除的了。
 * 
 * 2. 引用计数
 * 这种方式存在很大的问题，现在已经被弃用。
 * 
 * 
 * 内存管理
 * JavaScript 运行在一个内存管理与垃圾回收都很特殊的环境，分配给浏览器的内存通常比分配给桌面软件的要少很多。将内存占用
 * 量保存在一个较小的值可以让页面性能更好。
 */

/* 优化内存 —— 最佳手段是保证在执行代码时只保存必要的数据，如果数据不再必要，那么把它设置为 null 从而释放其引用。这个
  建议最适合全局变量和全局对象的属性。
   局部变量在超出作用域后会被自动解除引用，如下，变量 globalPerson 保存着 createPerson() 调用返回的值。在函数内部，
  localPerson 创建了一个对象并添加了一个 name 属性。然后 localPerson 作为函数值被返回并被赋值给 globalPerson，
  localPerson 在函数执行完后超出上下文后会自动被解除引用，不需要显式处理，但 globalPerson 是一个全局变量，需要在不
  再使用时手动解除其引用。 */
function createPerson(name) {
  let localPerson = new Object();
  localPerson.name = name;
  return localPerson;
}

let globalPerson = createPerson("Nicholas");

globalPerson = null; // 解除 globalPerson 对值的引用


// 通过 const 和 let 提升性能

/* 隐藏类和删除操作 —— V8 引擎将解释后的 JS 代码编译为实际的机器码时会利用“隐藏类”，运行期间，V8 会将创建的对象与隐
  藏类关联起来以跟踪它们的属性特征。能够共享相同隐藏类的对象性能会更好，V8 会针对这种情况进行优化，胆不一定总能做到：*/
function Article() {
  this.title = "Inauguration Ceremony Features Kazoo Band";
}

// V8 会在后台配置让这两个类共享相同的隐藏类，因为这两个实例共享同一个构造函数和原型
let a1 = new Article();
let a2 = new Article();

// 假设之后又添加了下面这行代码，两个 Article 实例就会对应两个不同的隐藏类
a2.author = "Jake";

/* 解决方法就是避免 JS 的动态属性赋值，并在构造函数中一次性声明所有属性，如下所示，这样两个实例基本上就一样，可以共享
  一个隐藏类，从而带来潜在的性能提升 */
// function Article(out_author) {
//   this.title = "Inauguration Ceremony Features Kazoo Band";
//   this.author = out_author;
// }

// let a1 = new Article;
// let a2 = new Article("Jake");

// delete a1.author; // 使用 delete 会导致不在共享一个隐藏类，最佳方法是吧不想要的属性设置为 null，这样可以保持
                     // 类不变和继续共享，同时也能达到删除引用值以提供垃圾回收的效果，如下
// a1.author = null;


// 内存泄漏
/* 定时器可能会悄悄地引起内存泄漏，下方代码定时器的回调通过闭包引用了外部变量，只要定时器一直运行，回调函数中引用的 
  name 就会一直占用内存。 */
let name = "Jake";
setInterval(() => {
  console.log(name);
}, 100); 

/* 闭包也很容易造成内存泄漏，下面的 outer() 会导致分配给 name 的内存被泄露，代码执行后创建了一个内部闭包，只要返回的
  函数存在就不能清理 name，因为闭包一直在引用着它。如果 name 内容很大就是一个问题。*/
let outer = function() {
  let name = "jake";
  return function() {
    return name;
  };
};

// 静态分配与对象池
/* 考虑如何减少浏览器执行垃圾回收的次数，理论上，如果能够合理使用分配的内存，同时避免多余的垃圾回收，就可以保住因为释放
  内存而损失的性能。
   浏览器决定如何运行垃圾回收程序的一个标准就是对象更替的速度。如果有很多对象被初始化，然后一下子又都超出了作用域，那么
  浏览器就会采用更激进的方式调度垃圾回收程序运行，这样当然会影响性能。调用下方的函数时，会在堆上创建一个新对象然后修改它，
  最后再把它返回给调用者。如果这个矢量对象的生命周期很短，那么它会很快失去所有对它的引用，成为可以被回收的值。加入这个矢
  量加法函数频繁被调用，那么垃圾回收调度程序会发现这里对象更替的速度更快，从而更频繁的安排垃圾回收。*/
function addVector(a, b) {
  let resultant = new addVector();
  resultant.x = a.x + b.x;
  resultant.y = a.y + b.y;
  return resultant;
}

/* 该问题的解决方案是不要动态创建矢量对象，比如可以将上方的函数修改如下。这需要在其他地方实例化适量参数 resultant，但
  这个函数的行为没变。
   如何创建矢量不让垃圾回收程序盯上，一个策略是使用对象池，在初始化的某一时刻，可以创建一个对象池用来管理一组可回收的对
  象。应用程序可以向这个对象池请求一个对象、设置其属性、使用它，然后在操作完成后再把它还给对象池。由于没有发生对象初始化，
  垃圾回收就不会发现有对象更替，因此垃圾回收程序就不会那么频繁的运行。下面是一个对象池的伪实现 */
// vectorPool 是已有的对象池
let v1 = vectorPool.allocate();
let v2 = vectorPool.allocate();
let v3 = vectorPool.allocate();

v1.x = 10;
v1.y = 5;
v2.x = -3;
v2.y = -6;

addVector(v1, v2, v3);

console.log([v3.x, v3.y]); // [7, -1]

vectorPool.free(v1);
vectorPool.free(v2);
vectorPool.free(v3);

// 如果对象有属性引用了其他对象，则这里也需要把这些属性设置为 null
v1 = null;
v2 = null;
v3 = null;

/* 如果对象池只按需分配矢量（在对象不存在时创建新的，存在时则复用存在的，那么这个实现本质上是一种贪婪算法，有单调增长但
  为静态的内存。这个对象池必须使用某种结构维护所有对象，数组是比较好的选择，不过如果使用数组则需要留意不要导致额外的垃圾
  回收，如下： */
let vectorList = new Array(100);
let vector = new addVector();
vectorList.push(vector);

/* 由于 JS 数组的大小是动态可变的，引擎会删除大小为 100 的数组，再创建一个新的大小为 200 的数组，垃圾回收程序会看到这
  个删除操作，说不定因此很快就会跑来收一次垃圾。要避免这个行为就需要在初始化数组时创建一个大小够用的数组，从而避免上述先
  删除再创建的操作。注意静态分配时优化的一种极端形式，很少会用到。 */