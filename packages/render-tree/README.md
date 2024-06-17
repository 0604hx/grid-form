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
