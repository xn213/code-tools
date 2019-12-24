### **闲来无事，整理一下 JavaScript 中那些神乎其神的技巧，假装大牛的样子**

## 1. 字符串转换为数字

```js
var a = '123'
console.log(+a) // 123
console.log(typeof +a) // number

// 同样可用于日期转换为数值：
var b = +new Date() // 1468545682168
```

## 2. 数值向下取整

```js
var a = ~~3.14 // 3
var b = 3.14 >> 0 // 3
var c = 3.14 | 0 // 3
```

## 3. 字符串转换为数值并取整<!-- more -->

```js
var a = '3.14' | 0 // 3
var b = '3.14' ^ 0 // 3
```

> 谢谢 [@开始学习前端](https://segmentfault.com/u/kaishixuexiqianduan) 指正，**该取整直接去除小数点后数字，仅对正数有效**

## 4. 函数设置默认值

```js
function func(arg) {
  var arg = arg || 'default'
  // arg 为 undefined, null, "", 0, false, NaN 时最后都得到"default"
}
```

## 5. 变量值交换

```js
var a = 1,
  b = 2
a = [b, (b = a)][0]
console.log(a) // 2
console.log(b) // 1
```

## 6. 使用`for in`遍历对象取到属性名与属性

```js
var obj = {
  a: 1,
  b: 2
}
for (var i in obj) {
  console.log('obj.' + i + ' = ' + obj[i])
}
// output: obj.a = 1
//         obj.b = 2
```

## 7. 截断数组

```js
var arr = [1, 2, 3, 4, 5, 6]
arr.length = 3
console.log(arr) // [1, 2, 3]
```

## 8. 提高遍历较大 Enumerable 数据的性能

```js
var arr = [1, 2, 3, 4, 5, 6, ...];
var len = arr.length;  // 缓存arr.length
for(var i = 0; i < len; i++) {
  console.log(arr[i]);
}

// 也可将缓存写在for的声明中
for(var i = 0, len = a.length; i < len; i++) {
  console.log(arr[i]);
}

// 或者（！注意：若数组中键值存在undefined、null、0、false等数据时会中断遍历）
for(var i = 0, a; a = arr[i++];) {
  console.log(a);
}
```

## 9. 使用 `&&` 替代单一条件判断

```js
// 你可能这样写过
if (!token) {
  login()
}
// 其实这样也可以
!token && login()
// 或
token || login()
```

## 10. 检测 对象/数组 中是否有指定 属性/元素

```js
var CURD = {
  add: function() {},
  delete: function() {},
  edit: function() {}
}
console.log('add' in CURD) // true
console.log('find' in CURD) // false

/* 误 */
// var arr = [1, 2, 3];
// console.log(1 in arr);  // true
// console.log(6 in arr);  // false
```

> 谢谢 [@zaaack](https://segmentfault.com/u/zaaack) 指正，**数组的存在检测实质上是检测的是数组下标**

```js
var arr = ['a', 1, 'b']
console.log(0 in arr) // true
console.log(1 in arr) // true
console.log(2 in arr) // true
console.log(3 in arr) // false
```

## 11. 通过闭包调用 setTimeout

```js
for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i) // 10 10 10 ...
  }, 500)
}

for (var i = 0; i < 10; i++) {
  ;(function(i) {
    setTimeout(function() {
      console.log(i) // 0 1 2 3 ...
    }, 500)
  })(i)
}
```

---

# 1 分钟读完 [JavaScript Async/Await Explained in 10 Minutes](https://tutorialzine.com/2017/07/javascript-async-await-explained)

![10 分钟学会 JavaScript 的 Async/Await](https://segmentfault.com/img/bVXJt5?w=1856&h=957 '10 分钟学会 JavaScript 的 Async/Await')

以前我们使用 callback。

后来我们使用 Promise。

现在我们使用 Async/Await。

## 1、什么是 Async/Await？

Async - 定义异步函数(`async function someName(){...}`)

- 自动把函数转换为 Promise
- 当调用异步函数时，函数返回值会被 resolve 处理
- 异步函数内部可以使用 `await`

Await - 暂停异步函数的执行 (`var result = await someAsyncCall();`)

- 当使用在 Promise 前面时，`await` 等待 Promise 完成，并返回 Promise 的结果
- `await` **只能**和 Promise 一起使用，**不能**和 callback 一起使用
- `await` 只能用在 `async` 函数中

## 2、Async/Await 是否会取代 Promise

不会。

- Async/Await 底层依然使用了 Promise。
- 多个异步函数同时执行时，需要借助 `Promise.all`

```javascript
async function getABC() {
  let A = await getValueA() // getValueA 花费 2 秒
  let B = await getValueB() // getValueA 花费 4 秒
  let C = await getValueC() // getValueA 花费 3 秒

  return A * B * C
}
```

每次遇到 `await` 关键字时，Promise 都会停下在，一直到运行结束，所以总共花费是 2+4+3 = 9 秒。**`await` 把异步变成了同步**。

```javascript
async function getABC() {
  // Promise.all() 允许同时执行所有的异步函数
  let results = await Promise.all([getValueA, getValueB, getValueC])

  return results.reduce((total, value) => total * value)
}
```

函数总耗时为 4 秒（`getValueB` 的耗时）。

## 3、Async/Await 的错误处理

在 Async/Await 语法中，我们可以使用 try/catch 进行错误处理。在 Promise 中的 `.catch()` 分支会进入 `catch` 语句。

---

> 阅读原文：[JavaScript Async/Await Explained in 10 Minutes](https://tutorialzine.com/2017/07/javascript-async-await-explained)
>
> 讨论地址：[10 分钟学会 JavaScript 的 Async/Await](https://github.com/dev-reading/fe/issues/3)
>
> 如果你想参与讨论，请[点击这里](https://github.com/dev-reading/fe)

---

---

# JS 操作小技巧，工作简单了

## 一、Optional Chaining

> 在 javaScript 中，对象的属性链访问，很容易因为某一个属性不存在出现
> Cannot read property 'xxx' of undefined 的问题，那么 Optional Chaining 就添加了?.操作符，它会先判断前面的值，如果 undefined 或者 null，就结束后面的调用，直接返回 undefined;

### 1.1 访问深度嵌套的属性

```js
const obj = {
  foo: {
    bar: {
      baz: 42
    }
  }
}

const baz = obj?.foo?.bar?.baz // 42

const safe = obj?.qux?.baz // undefined

// Optional chaining and normal chaining can be intermixed
obj?.foo.bar?.baz // Only access `foo` if `obj` exists, and `baz` if
// `bar` exists

// Example usage with bracket notation:
obj?.['foo']?.bar?.baz // 42
```

### 1.2 调用深层嵌套的函数

```js
const obj = {
  foo: {
    bar: {
      baz() {
        return 42
      }
    }
  }
}

const baz = obj?.foo?.bar?.baz() // 42

const safe = obj?.qux?.baz() // undefined
const safe2 = obj?.foo.bar.qux?.() // undefined

const willThrow = obj?.foo.bar.qux() // Error: not a function

// Top function can be called directly, too.
function test() {
  return 42
}
test?.() // 42

exists?.() // undefined
```

### 1.3 构造深层嵌套的类

```js
const obj = {
  foo: {
    bar: {
      baz: class {}
    }
  }
}

const baz = new obj?.foo?.bar?.baz() // baz instance

const safe = new obj?.qux?.baz() // undefined
const safe2 = new obj?.foo.bar.qux()?.() // undefined

const willThrow = new obj?.foo.bar.qux() // Error: not a constructor

// Top classes can be called directly, too.
class Test {}
new Test() // test instance

new exists() // undefined
```

### 1.4 安装使用

- 安装：

```js
npm install --save-dev @babel/plugin-proposal-optional-chaining
yarn add @babel/plugin-proposal-optional-chaining --dev
```

- 配置.babelrc：

```js
{
  "plugins": ["@babel/plugin-proposal-optional-chaining"]
}
```

## 二、随机生成字母和数组的组合

```js
Math.random()
  .toString(36)
  .substr(2)
```

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="946" height="119"></svg>)

## 三、转换布尔值

```js
const isTrue = !0
const isFalse = !1
const alsoFalse = !!0
console.log(isTrue) // Result: true
console.log(typeof true) // Result: "boolean"
```

## 四、转换数字

```js
const number = '10'
number = +number
console.log(number) // 10
```

```js
const number = '10'
number = ~~number
console.log(number) // 10
```

## 五、替代 Math.pow

```js
console.log(Math.pow(2, 3))
// 替代1
console.log(2 ** 3)
// 替代二，只能以二作为基数
console.log(2 << (3 - 1))
```

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1063" height="224"></svg>)

## 六、快速浮点数转整数

```js
console.log(10.9 | 0) // 10
console.log(-10.9 | 0) // 10
```

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="156"></svg>)

```js
console.log(~~10.9)
console.log(~~-10.9)
```

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="124"></svg>)

## 七、数组降维度

二维数组

```js
let arr = [[1], [2], [3]]
arr = Array.prototype.concat.apply([], arr)
console.log(arr) // [1, 2, 3]

let array = [[1], [2], [3]]
array = array.flat(2)
console.log(array) // [1, 2, 3]
```

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="164"></svg>)

多维数组

```js
let arrMore = [1, 2, [3], [[4]]]
arrMore = arrMore.flat(Infinity)
console.log(arrMore)
```

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1138" height="165"></svg>)

## 八、判断小数是否相等

```js
console.log(0.1 + 0.2 === 0.3) // false
```

```js
function equal(number1, number2) {
  return Math.abs(number1 - number2) < Math.pow(2, -52)
}
console.log(equal(0.1 + 0.2, 0.3))
```

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="998" height="87"></svg>)

## 九、判断变量是否是数组

```js
1. instanceof
2. array.__proto__.constructor === Array
3. array.constructor === Array
4. Array.isArray（兼容性问题）
5. Object.prototype.toString.call([]) === "[object Array]"（最通用）
```

> ## PS：instanceof 和 constructor 判断的变量，必须在当前页面声明。例如：父页面是一个框架，框架中引入一个页面（子页面），在子页面中申明的 array，并将其复制给父元素的一个变量，这时 instanceof 和 constructor 判断该变量，将返回 false。
>
> 原因：
> array 是复合类型。在传递的过程中，仅仅是引用地址的传递。
> 每个页面的 array 原生对象引用的地址是不一样的，在子页面中声明的 array，所对应的构造函数，是子页面的 array 对象，在父页面进行判断时，使用的并不是子页面的 array。

## 十、数组占位

```js
let array = Array(3).fill('')
console.log(array) //["", "", ""]
```

## 十一、数组去重多重方式

### 11.1 Set(最常用)

```js
Array.prototype.unique = function() {
  return [...new Set(this)]
}
var array = [1, 2, 3, 43, 45, 1, 2, 2, 4, 5]
array.unique()
```

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="985" height="157"></svg>)

### 11.2 Map

```js
Array.prototype.unique = function() {
  const tmp = new Map()
  return this.filter(item => {
    return !tmp.has(item) && tmp.set(item, 1)
  })
}
var array = [1, 2, 3, 43, 45, 1, 2, 2, 4, 5]
array.unique()
```

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1235" height="163"></svg>)

### 11.3 Array.prototype.indexOf()

```js
Array.prototype.unique = function() {
  return this.filter((item, index) => {
    return this.indexOf(item) === index
  })
}
var array = [1, 2, 3, 43, 45, 1, 2, 2, 4, 5]
array.unique()
```

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="872" height="144"></svg>)

### 11.4 Array.prototype.includes()

```js
Array.prototype.unique = function() {
  const newArray = []
  this.forEach(item => {
    if (!newArray.includes(item)) {
      newArray.push(item)
    }
  })
  return newArray
}
var array = [1, 2, 3, 43, 45, 1, 2, 2, 4, 5]
array.unique()
```

![](https://user-gold-cdn.xitu.io/2019/11/20/16e86e81547b7be9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 11.5 Array.prototype.reduce()

```js
Array.prototype.unique = function() {
  return this.sort().reduce((init, current) => {
    if (init.length === 0 || init[init.length - 1] !== current) {
      init.push(current)
    }
    return init
  }, [])
}
var array = [1, 2, 3, 43, 45, 1, 2, 2, 4, 5]
array.unique()
```

![](https://user-gold-cdn.xitu.io/2019/11/20/16e86eacf545fb4b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 十二、短路运算(&& ||)

使用&&将返回第一个条件为假的值。如果每个操作数的计算值都为 true，则返回最后一个计算过的表达式。

```js
let one = 1,
  two = 2,
  three = 3
console.log(one && two && three) // 3
console.log(0 && null) // 0
```

使用||将返回第一个条件为真的值。如果每个操作数的计算结果都为 false，则返回最后一个计算过的表达式。

```js
let one = 1,
  two = 2,
  three = 3
console.log(one || two || three) // 1
console.log(0 || null) // null
```

## 十三、过滤空值

```js
let result1 = [1, 2, 0, undefined, null, false, ''].filter(Boolean)
console.log(result1)
```

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="134"></svg>)

## 十四、创建空对象

```js
let dict = Object.create(null)
```

## 十五、合并对象

```js
const person = { name: 'David Walsh', gender: 'Male' }
const tools = { computer: 'Mac', editor: 'Atom' }
const attributes = { handsomeness: 'Extreme', hair: 'Brown', eyes: 'Blue' }
const summary = { ...person, ...tools, ...attributes }
console.log(summary)
```

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1241" height="183"></svg>)

## 十六、字符串去空格

```js
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '')
}
```

## 十七、对象转换为数组

```js
var argArray = Array.prototype.slice.call(arguments)
```

## 十八、逗号操作符

```js
var a = 0
var b = (a++, 99)
console.log(a)
console.log(b)
```

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1026" height="178"></svg>)

## 十九、 localStorage.getItem('key') === localStorage.key

来源: [沉末\_](https://juejin.im/user/5b7c1be9e51d4538b35bfc32)评论。

```js
localStorage.setItem('item', 1)
localStorage.getItem('item') === localStorage.item
```

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="123"></svg>)

## 二十、从一堆文本中获取手机号

来源: [飞蛾扑火](https://juejin.im/user/5bf7abd9e51d450c487d07f6)评论。

```js
([\s,，、]*)?((手机|联系方式|电话|联系人)号?)?(号码)?([、:：\s]*)?(?:[\s(（]*?\+?(86)?[\s)）]*)(1\d{2})(?:[-\s]*)(\d{4})(?:[-\s]*)(\d{4})(?=\D|$)
```

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="94"></svg>)

![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="137"></svg>)

## 二十一、整数变量交换

来源: [快乐的仲子](https://juejin.im/user/571dc56071cfe4006b558696)评论。

```js
let a = 10
let b = 50
a = a ^ b
b = a ^ b
a = a ^ b
console.log(a, b) // 50 10
```

![](https://user-gold-cdn.xitu.io/2019/11/21/16e8e12bd865fb83?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 二十二、整数变量交换

```js
var a = 2
var b = 4
a = a + b
b = a - b
a = a - b
console.log(a, b) // 4 2
```

![](https://user-gold-cdn.xitu.io/2019/11/21/16e8e1630bbeb86c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 评论出你的“奇人异巧”，让大家都学习。

参考：

- [@ babel / plugin-proposal-optional-chaining](https://babeljs.io/docs/en/next/babel-plugin-proposal-optional-chaining)
- [解锁多种 JavaScript 数组去重姿势](https://juejin.im/post/5b0284ac51882542ad774c45#heading-1)
- [大部分学习视频都不会教的 11 个 JS 技巧](https://mp.weixin.qq.com/s/8LXs6UxNlRNarWTuD3Kr7g)
- [8 个实用的 JavaScript 技巧](https://juejin.im/post/5cff97276fb9a07ea420749f)
