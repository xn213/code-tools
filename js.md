### **闲来无事，整理一下JavaScript中那些神乎其神的技巧，假装大牛的样子**

## 1. 字符串转换为数字


```js
var a = "123";
console.log(+a);         // 123
console.log(typeof +a);  // number

// 同样可用于日期转换为数值：
var b = +new Date();     // 1468545682168
```

## 2. 数值向下取整


```js
var a = ~~3.14;   // 3
var b = 3.14>>0;  // 3
var c = 3.14|0;   // 3
```

## 3. 字符串转换为数值并取整<!-- more -->


```js
var a = "3.14"|0;  // 3
var b = "3.14"^0;  // 3
```

> 谢谢 [@开始学习前端](https://segmentfault.com/u/kaishixuexiqianduan) 指正，**该取整直接去除小数点后数字，仅对正数有效**

## 4. 函数设置默认值


```js
function func(arg){
  var arg = arg || "default"; 
  // arg 为 undefined, null, "", 0, false, NaN 时最后都得到"default"
}
```

## 5. 变量值交换


```js
var a = 1,
    b = 2;
a = [b, b = a][0];
console.log(a);  // 2
console.log(b);  // 1
```

## 6. 使用`for in`遍历对象取到属性名与属性


```js
var obj = {
    a: 1,
    b: 2
}
for(var i in obj) {
  console.log("obj." + i + " = " + obj[i]);
}
// output: obj.a = 1
//         obj.b = 2
```

## 7. 截断数组


```js
var arr = [1, 2, 3, 4, 5, 6];
arr.length = 3;
console.log(arr);  // [1, 2, 3]
```

## 8. 提高遍历较大Enumerable数据的性能


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
if(!token) {
  login();
}
// 其实这样也可以
!token && login();
// 或
token || login();
```

## 10. 检测 对象/数组 中是否有指定 属性/元素


```js
var CURD = {
  add: function() {},
  delete: function() {},
  edit: function() {}
}
console.log("add" in CURD);   // true
console.log("find" in CURD);  // false

/* 误 */
// var arr = [1, 2, 3];
// console.log(1 in arr);  // true
// console.log(6 in arr);  // false
```

> 谢谢 [@zaaack](https://segmentfault.com/u/zaaack) 指正，**数组的存在检测实质上是检测的是数组下标**

```js
var arr = ['a', 1, 'b']
console.log(0 in arr);  // true
console.log(1 in arr);  // true
console.log(2 in arr);  // true
console.log(3 in arr);  // false
```

## 11. 通过闭包调用setTimeout

```js
for(var i = 0; i < 10; i++) {
  setTimeout(function(){
    console.log(i);  // 10 10 10 ...
  },500);
}

for(var i = 0; i < 10; i++) {
  (function(i){
    setTimeout(function(){
      console.log(i);  // 0 1 2 3 ...
    },500)
  })(i);
}
```

-----------------------------------------------------------------

# 1 分钟读完 [JavaScript Async/Await Explained in 10 Minutes](https://tutorialzine.com/2017/07/javascript-async-await-explained)

![10 分钟学会 JavaScript 的 Async/Await](https://segmentfault.com/img/bVXJt5?w=1856&h=957 "10 分钟学会 JavaScript 的 Async/Await")

以前我们使用 callback。

后来我们使用 Promise。

现在我们使用 Async/Await。

## 1、什么是 Async/Await？

Async - 定义异步函数(`async function someName(){...}`)

* 自动把函数转换为 Promise
* 当调用异步函数时，函数返回值会被 resolve 处理
* 异步函数内部可以使用 `await`

Await - 暂停异步函数的执行 (`var result = await someAsyncCall();`)

* 当使用在 Promise 前面时，`await` 等待 Promise 完成，并返回 Promise 的结果
* `await` **只能**和 Promise 一起使用，**不能**和 callback 一起使用
* `await` 只能用在 `async` 函数中

## 2、Async/Await 是否会取代 Promise

不会。

* Async/Await 底层依然使用了 Promise。
* 多个异步函数同时执行时，需要借助 `Promise.all`


```javascript
async function getABC() {
  let A = await getValueA(); // getValueA 花费 2 秒
  let B = await getValueB(); // getValueA 花费 4 秒
  let C = await getValueC(); // getValueA 花费 3 秒

  return A*B*C;
}
```

每次遇到 `await` 关键字时，Promise 都会停下在，一直到运行结束，所以总共花费是 2+4+3 = 9 秒。**`await` 把异步变成了同步**。


```javascript
async function getABC() {
  // Promise.all() 允许同时执行所有的异步函数
  let results = await Promise.all([ getValueA, getValueB, getValueC ]); 

  return results.reduce((total,value) => total * value);
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