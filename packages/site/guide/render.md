# 表单渲染器

渲染效果（从左到右分别为 NaiveUI、ElementPlus、Vant）

![](/renders.webp)

## PROPS

名称|类型|默认值|说明
-|-|-|-
renders|Object|{}|组件渲染函数
form|Object|{}|表单数据对象
initValue|Object||外部的表单初始值
gridGap|Number|10|栅栏间隔，单位 px <Badge>NaiveUI</Badge><Badge>ElementPlus</Badge>
review|Boolean|true|是否做表单项检验
placeholder|String|^\\${(.*)}$|默认值的占位符检测正则表达式，符合该表达式的默认值将进行运算
valueProvider|Object||表单默认值计算器
lockLabelPlacement|String|-|限定标签位置；顶部标签在手机上视觉效果不佳，可通过此限定标签位于左侧
debug|Boolean|false|开启debug 模式后，会在控制台输入各种信息

## EMITS

名称|参数|说明
-|-|-
inited|()|表单初始化完成后触发
submit|(formObj:Object, action:String)|表单提交时触发，action默认为`post`，可自定义（见额外按钮）
failed|(msgs:Array)|表单校验失败时触发

## Vant4 渲染器
> Vant 是一个**轻量、可定制的移动端组件库**，于 2017 年开源。

![](/screenshot/render-vant.webp)


## Varlet3 渲染器
> Varlet 是一个基于 Vue3 开发的 Material 风格移动端组件库，全面拥抱 Vue3 生态，由社区团队维护。支持 Typescript、按需引入、暗黑模式、主题定制、国际化，并提供 VSCode 插件保障良好的开发体验。

渲染器支持通过全局变量`window.VARLET_VARIANT`设置输入框样式，支持值： `standard`（默认值，只有底部边框），`outlined`（带边框）

standard 示例|outlined 示例
-|-
![](/screenshot/render-varlet.webp)|![](/screenshot/render-varlet-outline.webp)

::: tip 特别说明
1、截至Varlet<Badge>3.2.3</Badge> ，在实际使用中，会有轻微卡顿的感觉。

2、渲染器本身不会自动引入样式文件，请在使用时手动引入：`import '@varlet/ui/es/style'`
:::

## Tree 树形渲染器
> 基于树形结构（原生 HTML 元素）实现渲染器，打包为通用组件（Web Components）

![](/screenshot/render-tree.webp)

::: warning 注意
此渲染器功能极为简单，且不能支持全部的组件，请慎用🙂

不支持组件：`提示信息/ALERT`、`分割线/DIVIDER`、`评分/RATE`
:::

使用方式：

::: code-group
```html [原生/WebComponent]
<!-- 提前安装依赖 -->
<link rel="stylesheet" href="@grid-form/render-tree/dist/render.css">

<script type="module">
    import { register } from '@grid-form/render-tree/dist/render.js'
    
    // 注册自定义元素
    register()

    const render = document.createElement('render-tree')
    // 表单对象
    render.form = {}
    // 是否显示右侧图标            
    render.showIcon = false
    // 开启控制台日志
    render.debug = true

    // 按需增加事件监听
    render.addEventListener("submit", e=> console.debug("表单内容：", ...e.detail))
    render.addEventListener("failed", e=> console.debug("表单失败：", ...e.detail))
    render.addEventListener("inited", e=> console.debug("表单初始化完成 ^.^"))

    // 将元素挂载到 body 下
    document.querySelector("body").appendChild(render)
</script>
```

```js-vue [Vue]
<template>
    <FormRender :form :onSubmit />
</template>

<script setup>
    import { ref } from 'vue'
    import { FormRender } from "@grid-form/render-tree"

    const form = ref({})
    const onSubmit = (formObj,action)=> console.debug("表单提交：", formObj)
</script>
```
:::

### 专属 PROPS

名称|类型|默认值|说明
-|-|-|-
fontSize|String|14px|字体大小
showIcon|Boolean|true|是否显示右侧图标
indent|Number|30|层级缩进宽度，单位 px
indentColor|String|#FFFFFF|层级缩进背景色，默认为白色
labelColor|String|gray|标签字体颜色
labelMarginRight|Number|15|标签右边距，单位 px
