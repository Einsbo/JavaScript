/**
 * RegExp 实例的主要方法是 exec()，主要用于配合捕获组使用，这个方法只接收一个参数，即要应用模式的字符串。如果找到了
 * 匹配项，则返回包含第一个匹配信息的数组；如果没找到匹配项，则返回 null。返回的数组虽然是 Array 的实例，但包含两个
 * 额外的属性：index 和 input。index 是字符串中匹配模式的起始位置，input 是要查找的字符串。这个数组的第一个元素是
 * 匹配整个模式的字符串，其他元素是与表达式中的捕获组匹配的字符串。如果模式中没有捕获组，则数组只包含一个元素。
 */

/* 下方的例子中，pattern 包含两个捕获组：最内部的捕获项 " and baby" 以及外部的匹配项 " and dad and baby"。调用
  exec() 后找到了一个匹配项，index 属性为 0。数组的第一个元素是匹配的字符串，第二个元素是匹配第一个捕获组的字符串，
  第三个元素是匹配第二个捕获组的字符串。 */
let text = "mom and dad and baby";
let pattern = /mom( and dad( and baby)?)?/gi;

let matches = pattern.exec(text);
console.log(matches.index); // 0
console.log(matches.input); // "mom and dad and baby"
console.log(matches[0]); // "mom and dad and baby"
console.log(matches[1]); // " and dad and baby"
console.log(matches[2]); // " and baby"


/* exec() */
/* 如果模式设置了全局标记，则每次调用 exec() 方法会返回一个匹配的信息。如果没有设置全局标记，则无论对同一个字符串调用
  多少次 exec() 也只能返回第一个匹配的信息。 */
let text1 = "cat, bat, sat, fat";
let pattern1 = /.at/;

let matches1 = pattern1.exec(text1);
console.log(matches1.index, matches1[0], pattern1.lastIndex); // 0 "cat" 0

/* 上面例子中的 pattern1 没有设置全局标记，因此调用 exec() 只返回第一个匹配项。lastIndex 在非全局模式下始终不变，
  如果在 pattern 上设置了 g 标记，则每次调用 exec() 都会在字符串中向前搜索下一个匹配项： */
let text2 = "cat, bat, sat, fat";
let pattern2 = /.at/g;
let matches2 = pattern2.exec(text2);
console.log(matches2.index, matches[0], pattern2.lastIndex);
matches2 = pattern2.exec(text2);
console.log(matches2.index, matches[0], pattern2.lastIndex);

/* test() */
/* 接受一个字符串参数，如果输入的文本与模式匹配，则返回 true，否则返回 false。此方法通常用于验证用户输入，此时我们只
  在乎输入是否有效，不关心为什么有效。 */
let text3 = "000-00-0000";
let pattern3 = /\d{3}-\d{2}-\d{4}/;

if (pattern3.test(text3)) {
  console.log("The pattern3 was matched.");
}

/* 无论正则表达式是怎么创建的，继承的方法 toLocalString() 和 toString() 都返回正则表达式的字面量表示。 */
console.log(pattern3.toString(), pattern3.toLocaleString());

