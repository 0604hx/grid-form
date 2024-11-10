---
layout: doc
---

# ⚡ 快速开始

## 功能总览

`格子表单/GRID-FORM`包含以下模块：

包名|说明|版本
-|-|-
@grid-form/common|通用工具（内置组件）|![common](https://img.shields.io/npm/v/%40grid-form%2Fcommon)
@grid-form/designer|可视化表单设计器（基于 Naive UI）|![designer](https://img.shields.io/npm/v/%40grid-form%2Fdesigner)
@grid-form/render-naive|基于[Naive UI](https://www.naiveui.com)实现的渲染器|![render-naive](https://img.shields.io/npm/v/%40grid-form%2Frender-naive?color=5fbc21)
@grid-form/render-element|基于[Element Plus](https://element-plus.org/zh-CN/)实现的渲染器|![render-element](https://img.shields.io/npm/v/%40grid-form%2Frender-element?color=49a2fe)
@grid-form/render-vant|基于[Vant4](https://vant-ui.github.io)实现的渲染器（适配移动端）|![render-vant](https://img.shields.io/npm/v/%40grid-form%2Frender-vant?color=36d7b7)
@grid-form/render-varlet|基于[varlet](https://github.com/varletjs/varlet)实现的渲染器|![render-vant](https://img.shields.io/npm/v/%40grid-form%2Frender-varlet?color=6750a4)

:::tip 提示
设计器与渲染器可单独使用，按需引入包即可😄
:::

## 渲染器简单示例
> 此处使用 `render-naive`，其他渲染器类似

::: code-group
```sh [npm]
$ npm i @grid-form/render-naive
```

```sh [pnpm]
$ pnpm add @grid-form/render-naive
```

```sh [yarn]
$ yarn add @grid-form/render-naive
```
:::

接着，我们可以在页面引入渲染器并使用它。

<script setup>
import RenderSimple from '../components/RenderSimple.vue'

const demoFormBean = `({
        "size":"medium",            //表单尺寸
        "width":"100%",             //表单整体宽度
        "grid":3,                   //每行的列数
        "labelWidth":120,           //标签宽度
        "labelPlacement":"top",     //标签位置，可选：top（默认）、left
        items:[
            { _widget:"INPUT", _uuid:"name", _text:"您的姓名", _required:true },
            { _widget:"INPUT", _uuid:"origin", _text:"籍贯" },
            { _widget:"NUMBER", _uuid:"age", _text:"年龄", suffix:"岁" }
        ]
    })`
const form = eval(demoFormBean)
</script>

```js-vue
<template>
    <FormRender :renders="RenderFuncs" :form="form" debug  @submit="onSubmit" />
</template>

<script setup>
    import { FormRender, RenderFuncs } from "@grid-form/render-naive"

    // 如需扩展 RenderFuncs 请自行扩写
    // 表单对象通常来自后端，详细数据结构请查看 packages/example/src/views/渲染器.vue
    let form = reactive{{ demoFormBean }}

    const onSubmit = (formData,action)=>console.debug(`表单值：`, action, formData)
</script>
```

<NaiveWrapper>
    <RenderSimple :bean="form" />
</NaiveWrapper>



## 内置组件 <Badge type="info">18+</Badge>
> 我们内置了常用的输入、选择、展示组件，并支持扩展自定义组件

<!-- :::details 目前支持的组件 -->

组件名称|说明|Naive UI|Element Plus|Vant4
-|-|-|-|-
文本输入|支持TEXTAREA|✅|✅|✅
数值输入|仅限数字|✅|✅|✅
动态标签|标签组输入（Array）|✅|✅|
`按钮`|可用于交互操作|✅|✅|✅
日期选择||✅|✅|✅
下拉选择（Select）|支持多选|✅|✅|✅
单选框（Radio）||✅|✅|✅
开关（Switch）|布尔值|✅|✅|✅
多选框（Checkbox）||✅|✅|✅
星级评分（Rate）|数值|✅|✅|✅
颜色选择器||✅|✅|
文件上传|按指定格式读取内容|✅|✅|✅
静态文本|支持HTML|✅|✅|✅
信息框|标题+正文，支持HTML|✅|✅|✅
分割线||✅|✅|✅
`图片展示`||✅|✅|✅
静态表格|简单的二维数据展示表格|✅|✅|✅
子容器（Card）|嵌套容器|✅|✅|✅

注意：上述组件`特殊标注`则表示支持自定义脚本
<!-- ::: -->
