 /** 
  * Set 是一种 ES6 的新集合类型，为 ECMAScript 带来集合类数据结构。
  */
//* 使用 new 关键字和 Set 创建空集合
const s = new Set();

// * 使用数组初始化集合
const s1 = new Set(["val1", "val2", "val3"]);
console.log(s1, s1.size); // 3

// * 使用自定义迭代器初始化集合
const s2 = new Set({
  [Symbol.iterator]: function*() {
    yield "val1";
    yield "val2";
    yield "val3";
  }
});
console.log(s2.size); // 3

// * add(), has(), delete(), clear()
/* 初始化之后可以使用 add() 增加值，has() 查询，delete() 和 clear() 删除元素 */
console.log(s.has("Matt"), s.size); // false 0
s.add("Matt").add("Frisbie");
console.log(s.has("Matt"), s.size); // true 2
s.delete("Matt");
console.log(s.has("Matt"), s.has("Frisbie"), s.size); // false true 1
s.clear(); // 销毁集合实例中所有的值
console.log(s.has("Matt"), s.has("Frisbie"), s.size); // false false 0

// ? 与 Map 类似，Set 可以包含任何 JS 数据类型作为值
const functionVal = function() {};
const symbolVal = Symbol();
const objectVal = new Object();

s.add(functionVal).add(symbolVal).add(objectVal);
console.log(s.has(functionVal), s.has(symbolVal), s.has(objectVal)); // true * 3
console.log(s.has(function() {})); // false, Set 也适用 SameValueZero 来检查

s.clear();
const objVal = {}, arrVal = [];
s.add(objVal).add(arrVal);
console.log(s.has(objVal), s.has(arrVal)); // true * 2

// * add() 和 delete() 是幂等的。delete() 返回一个布尔值，表示集合中是否存在要删除的值
s.clear();
s.add('foo');
console.log(s.size); // 1
s.add('foo');
console.log(s.size); // 1
console.log(s.delete('foo')); // true
console.log(s.delete('foo')); // false

// ! 顺序与迭代 —— Set 会维护值插入时的顺序，因此支持按顺序迭代
/* 集合实例可以提供一个迭代器（Iterator），能以插入顺序生成集合内容。可以通过 values() 方法及其别名方法 keys()（
  或者 Symbol.iterator 属性，它引用 values()）取得这个迭代器 */
s.clear();
s.add("val1").add("val2").add("val3");
console.log(s.values === s[Symbol.iterator]); // true
console.log(s.keys === s[Symbol.iterator]); // true

for (const value of s.values()) {
  console.log(value); // val1 val2 val3
}

for (const value of s[Symbol.iterator]()) {
  console.log(value); // 同上
}

// * 把集合转换为数组
console.log([...s]); // ['val1', 'val2', 'val3']

// * entries()
/* 集合的 entries() 返回一个迭代器，可以按照插入顺序产生包含两个元素的数组，这两个元素是集合中每个值的重复出现 */
for (const pair of s.entries()) {
  console.log(pair); // ['val1', 'val1'], ['val2', 'val2'], ['val3', 'val3']
}

// 如果不使用迭代器，可以调用集合的 forEach() 方法并传入回调。回调接收可选的第二个参数，用于重写内部 this 的值
s.forEach((val, dupVal) => console.log(`${val} -> ${dupVal}`)) // valn -> valn * 3

// * 修改集合中值的属性不会影响其作为集合值的身份
for (let value of s.values()) {
  value  = "newVal";
  console.log(value, s1.has("val1"), s1.has("newVal")); // newVal, true, false
}

const valObj = {id: 1};
s.clear();
s.add(valObj);
for (let value of s.values()) {
  value.id = "newVal";
  console.log(value, s.has(valObj)); // {id: "newVal"}, true
}
console.log(valObj); // {id: "newVal"}

// ! 定义正式集合操作
// 很多开发者都喜欢使用 Set 操作，但需要手动实现：或者是子类化 Set 或是定义一个使用的函数库。这些操作需要考虑：
// 1. 某些 Set 操作是有关联性的，最好让实现的方法能支持处理多个集合实例
// 2. Set 保留插入顺序，所有方法返回的集合必须保证顺序
// 3. 尽可能高效的使用内存，尽可能避免集合和数组间的相互转换能够节省对象初始化成本
// 4. 不要修改已有的集合实例。union(a, b) 或 a.union(b) 应该返回包含结果的新集合实例
class XSet extends Set {
  union(...sets) {
    return XSet.union(this, ...sets);
  }

  intersection(...sets) {
    return XSet.intersection(this, ...sets);
  }

  difference(set) {
    return XSet.difference(this, set);
  }

  cartesianProduct(set) {
    return XSet.cartesianProduct(this, set);
  }

  powerSet() {
    return XSet.powerSet(this);
  }

  // 返回两个或更多集合的并集
  static union(a, ...bSets) {
    const unionSet = new XSet(a);
    for (const b of bSets) {
      for (const bValue of b) {
        unionSet.add(bValue);
      }
    }
    return unionSet;
  }

  // 返回两个或更多集合的交集
  static intersection(a, ...bSets) {
    const intersectionSet = new XSet(a);
    for (const aValue of intersectionSet) {
      for (const b of bSets) {
        if (!b.has(aValue)) {
          intersectionSet.delete(aValue);
        }
      }
    }
    return intersectionSet;
  }

  // 返回两个集合的差集
  static difference(a, b) {
    const differenceSet = new XSet(a);
    for (const bValue of b) {
      if (a.has(bValue)) {
        differenceSet.delete(bValue);
      }
    }
    return differenceSet;
  }

  // 返回两个集合的对称差集
  static symmetricDifference(a, b) {
    // 按照定义，对称差集可以表示为
    return a.union(b).difference(a.intersection(b));
  }

  // 返回两个集合（数组对称形式）的笛卡尔积。必须返回数组集合，因为笛卡尔积可能包含相同值的对
  static cartesianProduct(a, b) {
    const cartesianProductSet = new XSet();
    for (const aValue of a) {
      for (const bValue of b) {
        cartesianProductSet.add([aValue, bValue]);
      }
    }
    return cartesianProductSet;
  }

  // 返回一个集合的幂集
  static powerSet(a) {
    const powerSet = new XSet().add(new XSet());
    for (const aValue of a) {
      for (const set of new XSet(powerSet)) {
        powerSet.add(new XSet(set).add(aValue));
      }
    }
    return powerSet;
  }
}