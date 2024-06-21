# # GRID-FORM-RENDER-TREE
> 基于树形结构实现的[格子表单](https://github.com/0604hx/grid-form)渲染器，打包为通用组件（Web Components）

![](../site/public/screenshot/render-tree.webp)

~~~
此渲染器功能极为简单，且不能支持全部的组件，慎用🙂
~~~

## 技术选型经历
> 最后没有用树形结构展示😂

* [jsoneditor](https://github.com/josdejong/jsoneditor)
* [fancytree](https://github.com/mar10/fancytree)：JavaScript tree view / tree grid plugin with support for keyboard, inline editing, filtering, checkboxes, drag'n'drop, and lazy loading


## 使用 Vue3 构建 WebComponents

### SFC 构建
> 注意，需要以后缀`.ce.vue`结尾，否则无法正确编译内联的 css

### 如何使用 demo.html
> `demo.html`为原生演示文件

1. 构建包`pnpm build:tree`，成功则在 `dist` 生成 js、css 两个文件
2. 启动本地静态资源服务（如 [live-server](https://github.com/tapio/live-server)、`python -m http.sever`），用浏览器访问 demo.html

```shell
 grid-form >> pnpm build:tree

vite v5.2.8 building for production...
✓ 25 modules transformed.
dist/style.css         0.33 kB │ gzip:  0.21 kB
dist/render-tree.js  142.81 kB │ gzip: 46.08 kB
✓ built in 908ms
```
