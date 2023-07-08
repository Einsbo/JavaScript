/**
 * 变量或函数的上下文决定了它们可以访问那些数据以及它们的行为。每个上下文都有一个关联的变量对象（variable object），
 * 这个上下文中定义的所有变量和函数都存在于这个对象上。
 * 
 * 全局上下文是最外层的上下文，在浏览器中为 window 对象，因此所有通过 var 定义的全局变量都会成为 window 对象的属性
 * 和方法。使用 let 和 const 的顶级声明不会定义在全局上下文中，但在作用域链解析上效果相同。上下文在其所有代码都执行完
 * 毕后会被销毁，包括定义在它上面的所有变量和函数。
 * 
 * 每个函数调用都有自己的上下文。打给你代码执行流进入函数时，函数的上下文被推倒一个上下文栈中，函数执行完后，上下文栈会
 * 弹出该函数上下文，将控制权还给之前的执行上下文。ECMAScript程序的执行流就是通过上下文栈进行控制的。
 * 
 * 上下文中的代码在执行的时候会创建变量对象的一个作用域链（scope chain）。这个作用域链决定了各级上下文中的代码在访问
 * 变量和函数时的顺序。代码正在执行的上下文的变量对象始终位于作用域链的最前端。如果上下文是函数，则其活动对象
 * （activation object）用作变量对象。活动对象最初只有一个定义变量：arguments。（全局上下文中没有这个变量。）作用域
 * 链中的下一个变量对象来自包含上下文，再下一个对象来自再下一个包含上下文。以此类推直至全局上下文；全局上下文的变量对象
 * 始终是作用域链的最后一个变量对象。 
 */

/* 代码执行时的标识符解析是通过沿作用域链逐级搜索标识符名称完成的，搜索过程始终从作用域链的最前端开始，然后逐级往后，直
  到找到标识符。
   对于下面的例子，函数 changeColor() 的作用域链包含两个对象：一个是它自己的变量对象（定义 arguments 对象的那个），
  另一个是全局上下文的变量对象。这个函数内部之所以能够访问变量 color 就是因为可以在作用域链中找到它。 */
// var color = "blue";

// function changeColor() {
//   if (color === "blue") {
//     color = "red";
//   } else {
//     color = "blue";
//   }
// }
// changeColor();

/* 局部作用域中定义的变量可用于在局部上下文中替换全局变量。
   以下这段代码设计三个上下文：全局上下文、changeColor() 的局部上下文和 swapColors() 的局部上下文。内部上下文可以
  访问外部上下文中的一切，但外部上下文无法访问内部上下文中的任何东西。
   window
     |--- color
     |--- changeColor()
              |--- anotherColor
              |--- swapColors()
                       |--- tempColor
   */
var color = "blue";

function changeColor() {
  let anotherColor = "red";

  function swapColors() {
    let tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;

    // 这里可以访问 color, anotherColor, tempColor
  }
  // 这里可以访问 color, anotherColor 但访问不到 tempColor
  swapColors();
}

// 只能访问 color
changeColor();
console.log(color);


/* 作用域链增强 —— try/catch 语句的 catch 块、with 语句会导致在作用域链前端临时添加一个上下文，这个上下文会在代码
  执行后被删除。对于 catch 语句而言，会创建一个新的变量对象，这个变量对象会包含要抛出的错误对象的声明。 */
  

/* 标识符查找，开始于作用域链前端，以给定的名称搜索对应的标识符。如果在局部上下文找到，则停止搜索，如果没有找到则沿作用
  域链搜索直到搜索至全局上下文的变量对象，如果仍没找到，则为未声明。 
   下面的例子中，getColor() 会引用变量 findColor，为确定 findColor 值会进行一步搜索。第一步就是搜索 getColor() 
  的变量对象，查找名为 findColor 的标识符。找到后停止搜索直接返回该标识符。 */
let findColor = "blue";

function getColor() {
  let findColor = "red"; // 去掉这一行则下面打印 blue
  return findColor;
}
console.log(getColor()); // "red"