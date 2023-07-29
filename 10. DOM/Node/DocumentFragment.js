/**
 * 在所有节点类型中，DocumentFragment 类型是唯一一个在标记中没有对应表示的类型。DOM 将 DocumentFragment定义为
 * “轻量级”文档，能够包含操作节点，却没有完整文档那样额外的消耗。
 * 
 * * DocumentFragment 节点有以下特征：
 *    nodeType: 11
 *    nodeName: "#document-fragment"
 *    nodeValue: null
 *    parentNode: null
 *    子节点可以是 Element, ProcessingInstruction, Commit, Text, CDATASection, EntityReference
 * 
 * 不能把 DocumentFragment 添加到文档，因为 DocumentFragment 的作用是充当其他要被添加到文档的节点的仓库。
 */

// 可以使用 document.createDocumentFragment() 创建 DocumentFragment 对象
let fragment = document.createDocumentFragment();

/**
 * DocumentFragment 类型继承了所有文档类型具备的可以执行 DOM 操作的方法
 * 
 * ! 如果文档中的一个节点被添加到一个 DocumentFragment，则该节点会从文档树中删除，不会再被浏览器渲染
 * ! 添加到 DocumentFragment 的新节点同样不属于文档树，不会被浏览器渲染
 * 
 * 可以通过 appendChild() 或 insertBefore() 方法将 DocumentFragment 的内容添加到文档，在把 
 * DocumentFragment 作为参数题传给这些方法时，这个 DocumentFragment 的所有子节点都会被添加到文档中的相应位置
 * ! DocumentFragment 本身永远不会被添加到文档树
 */

/* 以下面这个 HTML 为例
    <ul id="myList"></ul>
   假设想给这个 ul 元素添加 3 个列表项，如果分 3 次给这个元素添加列表项，浏览器就要重新渲染 3 次页面以反映新添加的内
  容。为避免多次渲染，下面的代码示例使用 DocumentFragment 创建了所有列表项，然后一次性将它们添加到 ul 元素
*/
let ul = document.getElementById("myList"); // 取得 ul 元素的饮用

for (let i = 0; i < 3; i++) {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(`Item ${i + 1}`));
  fragment.appendChild(li);
}

ul.appendChild(fragment);