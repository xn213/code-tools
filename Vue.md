### 定义全局函数或变量

许多时候我们需要定义一些全局函数或变量，来处理一些频繁的操作（这里拿 `AJAX` 的异常处理举例说明）。但是在 `Vue` 中，每一个单文件组件都有一个独立的上下文（`this`）。通常在异常处理中，需要在视图上有所体现，这个时候我们就需要访问 `this` 对象，但是全局函数的上下文通常是 `window`，这时候就需要一些特殊处理了。

#### 简单粗暴型

最简单的方法就是直接在 `window` 对象上定义一个全局方法，在组件内使用的时候用 `bind`、`call` 或 `apply` 来改变上下文。

定义一个全局异常处理方法：

```js
// errHandler.js
window.errHandler = function() {
  // 不能使用箭头函数
  if (err.code && err.code !== 200) {
    this.$store.commit('err', true)
  } else {
    // ...
  }
}
```

在入口文件中导入：

```js
// src/main.js
import 'errHandler.js'
```

在组件中使用：

```js
// xxx.vue
export default {
  created() {
    this.errHandler = window.errHandler.bind(this)
  },
  method: {
    getXXX() {
      this.$http
        .get('xxx/xx')
        .then(({ body: result }) => {
          if (result.code === 200) {
            // ...
          } else {
            this.errHandler(result)
          }
        })
        .catch(this.errHandler)
    }
  }
}
```

#### 优雅安全型

在大型多人协作的项目中，污染 `window` 对象还是不太妥当的。特别是一些比较有个人特色的全局方法（可能在你写的组件中几乎处处用到，但是对于其他人来说可能并不需要）。这时候推荐写一个模块，更优雅安全，也比较自然，唯一不足之处就是每个需要使用该函数或方法的组件都需要进行导入。

使用方法与前一种大同小异，就不多作介绍了。￣ ω ￣=

### Moment.js 与 Webpack

在使用 `Moment.js` 遇到一些问题，发现最终打包的文件中将 `Moment.js` 的全部语言包都打包了，导致最终文件徒然增加 100+kB。查了一下，发现可能是 `webpack` 打包或是 `Moment.js` 资源引用问题（?），目前该问题还未被妥善处理，需要通过一些 `trick` 来解决这个问题。

在 `webpack` 的生产配置文件中的 `plugins` 字段中添加一个插件，使用内置的方法类 [ContextReplacementPlugin](https://webpack.js.org/plugins/context-replacement-plugin/) 过滤掉 `Moment.js` 中那些用不到的语言包：

```js
// build/webpack.prod.conf.js
new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(zh-cn)$/)
```

> 解决方案采自 [oleg-nogin@webpack/webpack#3128](https://github.com/webpack/webpack/issues/3128#issuecomment-291790964)。  
> 问题讨论详见 GitHub Issue: [moment/moment#2373](https://github.com/moment/moment/issues/2373)、[webpack/webpack#3128](https://github.com/webpack/webpack/issues/3128)。

### 自定义路径别名

可能有些人注意到了，在 `vue-cli` 生成的模板中在导入组件时使用了这样的语法：

```js
import Index from '@/components/Index'
```

这个 `@` 是什么东西？后来改配置文件的时候发现这个是 `webpack` 的配置选项之一：路径别名。

我们也可以在基础配置文件中添加自己的路径别名，比如下面这个就把 `~` 设置为路径 `src/components` 的别名：

```js
// vue-cli 2.x build/webpack.base.js
{
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '~': resolve('src/components')
    }
  }
}
```

```js
// vue-cli 3.0 <proName>/vue.config.js
module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        utils: resolve('src/utils'),
        api: resolve('src/api'),
        components: resolve('src/components')
      }
    },
    devServer: {
      proxy: {
        'api/': {
          changeOrigin: true,
          target: 'https://targetUrl.net',
          headers: {
            origin: 'targetUrl.net'
          }
        }
      }
    }
  }
}
```

然后我们导入组件的时候就可以这样写：

```js
// import YourComponent from 'YourComponent'
// import YourComponent from './YourComponent'
// import YourComponent from '../YourComponent'
// import YourComponent from '/src/components/YourComponent'
import YourComponent from '~/YourComponent'
```

### 获取表单控件值

通常我们可以直接使用 `v-model` 将表单控件与数据进行绑定，但是有时候我们也会需要在用户输入的时候获取当前值（比如：实时验证当前输入控件内容的有效性）。

这时我们可以使用 `@input` 或 `@change` 事件绑定我们自己的处理函数，并传入 `$event` 对象以获取当前控件的输入值：

```html
<input type="text" @change="change($event)" />
```

```js
change (e) {
  let curVal = e.target.value
  if (/^\d+$/.test(curVal)) {
    this.num = +curVal
  } else {
    console.error('%s is not a number!', curVal)
  }
}
```

> 当然，如果 UI 框架采用 `Element` 会更简单，它的事件回调会直接传入当前值。

### 响应式数据失效

#### 数组

由于 `Vue.js` 响应式数据依赖于**对象方法** `Object.defineProperty`。但很明显，数组这个特殊的“对象”并没有这个方法，自然也无法设置对象属性的 `descriptor`，从而也就没有 `getter()` 和 `setter()` 方法。所以在使用数组索引角标的形式更改元素数据时（`arr[index] = newVal`），视图往往无法响应式更新。  
为解决这个问题，`Vue.js` 中提供了 `$set()` 方法：

```js
vm.arr.$set(0, 'newVal')
// vm.arr[0] = 'newVal'
```

#### 对象

> 受现代 `JavaScript` 的限制（以及废弃 `Object.observe`），`Vue` **不能检测到对象属性的添加或删除**。由于 `Vue` 会在初始化实例时对属性执行 `getter/setter` 转化过程，所以属性必须在 `data` 对象上存在才能让 `Vue` 转换它，这样才能让它是响应的。  
> Ref: [深入响应式原理 - Vue.js](https://cn.vuejs.org/v2/guide/reactivity.html#)

```js
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 是响应的
vm.b = 2
// `vm.b` 是非响应的
```

### 静态类型检测

推荐在开发较复杂的组件时使用 `props` 静态类型检测，提高组件的健壮性，多数情况下可以在转码阶段提前发现错误。

```js
// before
prop: ['id', 'multiple', 'callback']
```

```js
// after
props: {
  id: {
    type: [ Number, Array ],
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  callback : Function,
}
```

### 异步组件

使用处于 `Stage.3` 阶段的动态导入函数 `import()`，同时借助 `webpack` 的代码分割功能，在 `Vue.js` 中我们可以很轻松地实现一个异步组件。

#### 异步路由组件

```js
const AsyncComponent = () => import('./AsyncComponent')
```

#### 异步组件工厂

```js
Vue.component('async-webpack-example', () => import('./my-async-component'))
```

> 相比于异步路由组建，异步组件工厂一般适用于组件内进一步小颗粒度的拆分处理，如：大体量组件内初次加载时的非必要组件（组件内嵌套的弹窗组件或 `Popover` 组件等）。

---

## camelClass & kebab-case

HTML 标签中的属性名不区分大小写。设置 prop 名字为 camelClass 形式的时候，需要转换为 kebab-case 形式（短横线）在 HTML 中使用。

```js
Vue.component('child', {
  //这里可以是camelClass形式
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
});
<!-- 对应在HTML中必须是短横线分隔 -->
<child my-message="hello"></child>
```

## 字面量语法 & 动态语法

这个问题比较绕，也算是一个笔记常犯的一个错误吧，使用字面量语法传递数值：

```html
<!-- 传递了一个字符串“1” -->
<comp some-prop="1"></comp>
```

因为他是一个字面 prop，它的值是字符串“1”，而不是以实际的数字传递下去。如果想传递一个真实的 JavaScript 类型的数字，则需要使用动态语法，从而让它的值被当做 JavaScript 表达式计算。

```html
<!-- 传递实际的数字 -->
<comp :some-prop="1"></comp>
```

## 模板解析

Vue 的模板是 DOM 模板，使用浏览器原生的解析器而不是自己实现一个。相比字符串模板，DOM 模板有一些好处，但是也有问题，它必须是有效的 HTML 片段。一些 HTML 元素对什么元素可以放在它里面有限制。常见的限制有：

- a 不能包行其他的交互元素（如按钮、链接）

- ul 和 ol 只能直接包含 li。

- select 只能包含 option 和 optgroup。

- table 只能直接包含 thead、tbody、ftoot、tr、caption、col、colgroup。

- tr 只能直接包含 th 和 td。

在实际应用中，这些限制会导致意外的结果。尽管再简单的情况下它可能可以工作，但是我们不能依赖自定义组件在浏览器验证之前展开结果。例如`<my-select><option>....</option></my-select>`不是有效的模板，即使`my-select`组件最终展开为`<select>...</select>`。

另一个结果是，自定义标签（包括自定义元素和特殊标签，如`<component>`、`<template>`、`<partial>`）不能用在 ul、select、table 等对内部元素有限制的标签内。放在这些元素内的自定义标签将被提到元素的外面，因而渲染不正确。

自定义元素应当使用`is`特性，如

```html
<table>
  <tr is="my-component"></tr>
</table>
```

`<template>`不能用在`<table>`内，这时应该使用`<tbody>`，`<table>`可以有多个`<tbody>`。如下：

```html
<table>
  <tbody v-for="item in items">
    <tr>
      Even row
    </tr>
    <tr>
      Odd row
    </tr>
  </tbody>
</table>
```

## 如何解决数据层级结构太深的问题

在开发业务的时候，经常会出现异步获取数据的情况，有时候数据层次比较深。如：

```html
<span
  class="airport"
  v-text="ticketInfo.flight.fromSegments[ticketInfo.flight.fromSegment - 1].depAirportZh"
></span>
```

我们可以使用 `vm.$set` 手动定义一层数据。

```js
vm.$set(
  'depAirportZh',
  ticketInfo.flight.fromSegments[ticketInfo.flight.fromSegments - 1]
    .depAirportZh
)
```

## data 中没有定义计算属性，它是如何被使用的

如下代码：

```js
;<div id="example">
  a = {{ a }}, b = {{ b }}
</div>

var vm = new Vue({
  el: '#example',
  data: {
    a: 1
  },
  computed: {
    b: function() {
      return this.a + 1
    }
  }
})
```

对于上面计算属性 b 是怎么被使用的？实际上它并没有把计算数据放到`$data`里，而是通过`Object.defineProperty(this, key, def)`直接定义到了实例上。
