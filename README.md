---
/*
 * @Author: xn213 
 * @Date: 2019-09-13 20:40:01 
 * @Last Modified by: xn213
 * @Last Modified time: 2019-10-13 00:00:50
 */
---

# 开发技巧和工具

## 开发技巧

### Vue

- 全局安装vue-cli3

```
cnpm install -g @vue/cli

vue -V // 查看版本是否为3.x
```

- 启动单个vue文件
```
// 安装扩展，此后可以快速启动单个vue文件

cnpm install -g @vue/cli-service-global

vue serve demo.vue
```
> 快速启动demo文件
> // 如果style中lang='scss' 则需要安装sass依赖sass-loader

- 使用 vue 2.x 的模板

```
cnpm install -g @vue/cli-init // 安装这个模块
// 就可以使用2.x的模板：vue init webpack my-project
```

------------------------------------------------------------
  
## 开发工具

### 命令行 `Terminal Emulator`

- 本地生成秘钥 SSH: `ssh-keygen -t rsa -C "yourEmail"`

1. [Cmder.exe](https://cmder.net/) win 集成 git/ 部分linux命令 [官方下载](https://github.com/cmderdev/cmder/releases/download/v1.3.12/cmder.zip) / [静态下载](http://xn213-img.test.upcdn.net/res/codetools/cmder.zip)

- 添加到鼠标右键 命令行: `Cmder.exe /REGISTER ALL`

2. 命令行翻译小工具: 
  - `cnpm i fanyi -g`
  - Useage: `fanyi <要翻译的内容>`

------------------------------------------------------------

### Chrome

1. 插件: 

- [Vimium: ](https://vimium.github.io/) 超级方便的[快捷键](http://xn213-img.test.upcdn.net/res/img/Chrome-Vimium快捷键.jpg)操作

- [FeHelper](https://www.baidufe.com/fehelper) → [github](https://github.com/zxlie/FeHelper)

- [下载+: ]()管理下载文件

- [掘金: new标签页]()

- [画词翻译]()

- [JSON Viewer]()

- [Clear Cache]()

- [crxMouse](https://crxmouse.com/zh-hans/)

- [ADblock Plus]()

- [Vue.js devtools]()

- [Octotree: github目录]()

- [Git History Browser Extension]()

- [Allow-Control-Allow-Origin]()

------------------------------------------------------------

### VSCode

1. 插件

- [Vetur]()

- [Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets)

- [Auto Close Tag]()

- [Auto Rename Tag]()

- [AutoFileName]()

- [Beautify]()

- [样式追踪: CSS Peek]()

- [路径提示: Path Intellisense]()

- [ESLint]()

- [AutoFileName]()

- [AutoFileName]()

- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

- [github插件同步: Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)

- [中文 Chinese (Simplified) Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans)

- [编译sass: Live Sass Compiler]()

- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

- [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)

- [浏览器打开 open in browser](https://marketplace.visualstudio.com/items?itemName=techer.open-in-browser)

- [开头注释: vscode-fileheader](https://marketplace.visualstudio.com/items?itemName=mikey.vscode-fileheader)

2. 主题

- [完美主题: Dracula Official](https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula)

- [红黑系: Monokai Pro](https://marketplace.visualstudio.com/items?itemName=monokai.theme-monokai-pro-vscode)

- [Material Theme](https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme)

- [设置背景: background]()

------------------------------------------------------------

### 其他工具

- [win按键回显工具: KeyCastOW](https://brookhong.github.io/2014/04/28/keycast-on-windows-cn.html) | [下载](https://www.ugmfree.it/Forum/messages.aspx?TopicID=513)

- [mac: KeyCastr](https://github.com/keycastr/keycastr)
