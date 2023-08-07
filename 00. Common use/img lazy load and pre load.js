// ! 图片懒加载
/**
 * 如果 GET 请求图片出现 403，则需要在 <head> 加上
 * <meta name="referrer" content="no-referrer" />
 * 
 * 在 HTML 中，要使用自定义属性 data-img
 * <img data-src="1.gif">
 * 
 * * 浏览器提供的构造函数 IntersectionObserver —— 目标元素与可视窗口产生交叉区域时需要做什么
 */
const images = document.querySelectorAll("img");

const callback = (entries) => { // 当 observer 观察到时触发 callback，观察不到时也会触发
  // entries 是观察对象组成的数组
  entries.forEach(entry => {
    if (entry.isIntersecting) { // isIntersecting 表示目标元素是否与可视窗口交叉
      const image = entry.target; // target 为目标元素
      const data_src = image.getAttribute("data-src");
      image.setAttribute("src", data_src);
      observer.unobserve(image); // 当观察到目标后图片已经加载出来，所以取消对当前目标的观察
    }
  })
};

const observer = new IntersectionObserver(callback); 

images.forEach(image => {
  observer.observe(image); // 观察每个 image 节点
})


// ! 图片预加载
/**
 * 1. 创建一个 Image 对象
 * 2. 设置 src 属性
 * 3. 监听 load 事件
 * 4. 监听 error 事件
 * 5. 将 Image 对象插入到 DOM 中
 */
const image = new Image();
image.src = "1.gif";
image.onload = () => {
  document.body.appendChild(image);
}
image.onerror = () => {
  console.log("图片加载失败");
}
