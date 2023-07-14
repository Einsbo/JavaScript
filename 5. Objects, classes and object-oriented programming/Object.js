/**
 * ES 将对象定义为一组无序属性的集合。
 */

// ! 创建自定义对象的通常方式是通过对象字面量的方式
let person = {
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName() {
    console.log(this.name);
  }
};

// ! 属性的类型 —— ES 使用一些内部特性来描述属性的特征
// ? 数据属性 —— 包含一个保存数据值的位置。值会从这给值读取，也会写入到这个位置
// * [[Configurable]] —— 属性是否可以通过 delete 删除并重新定义，是否可以修改它的特性以及是否可以把它改成访问器属性
// * 默认为 true
