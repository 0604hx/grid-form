# 可视化表单设计器

<script setup>
    const npmPkgs = '@grid-form/designer @grid-form/render-naive'
</script>

## 安装依赖
> 设计器需使用到`NaiveUI 渲染器`

::: code-group
```sh-vue [npm]
$ npm i {{ npmPkgs }}
```

```sh-vue [pnpm]
$ pnpm add {{ npmPkgs }}
```

```sh-vue [yarn]
$ yarn add {{ npmPkgs }}
```
:::

::: warning 注意
设计器需要 **naive-ui** 库，并要求全局导入组件：

```js {2}
import naive from 'naive-ui'
app.use(naive)
```
:::

## 创建设计器

```js-vue
<template>
    <Designer :renders="RenderFuncs" :components="Components" :context-menu="true" @save="onSave" :form="form" 
        style="height: 100vh;" debug show-footer />
</template>

<script setup>
    import { reactive } from 'vue'
    import { Designer, Components } from "@grid-form/designer"
    import { RenderFuncs } from "@grid-form/render-naive"
    import { createForm } from "@grid-form/common"

    // 如需扩展 RenderFuncs、Components ，请自行扩写
    let form = reactive{createForm()}

    const onSave = data=> console.debug("表单信息", data)
</script>
```

![设计器](/designer.png)


## 设计器 PROPS

名称|类型|默认值|说明
-|-|-|-
components|Array|[]|可操作的组件合集
renders|Object|{}|组件渲染函数（来自 `@grid-form/render-naive`）
siderWidth|Number,String|360|左右侧边栏的宽度，支持 px、% 单位，建议直接传递数值
gridGap|Number|10|可视化区域栅栏间隔，单位 px
review|Boolean|false|是否对表单项做校验（如id、名称不能为空，不允许重复 id），校验不通过则抛出异常
form|Object|undefined|表单对象
compact|Boolean|false|紧凑的布局，如果设置为true，则左右两侧的属性编辑行距缩短
headerHeight|Number|55|设计器头部高度
showFooter|Boolean|false|是否显示设计器底部
footerHeight|Number|50|设计器底部高度，单位 px
contextMenu|Boolean|false|是否启用右键菜单（方便操控表单项）<Badge>0.0.6</Badge>
enableCtrlS|Boolean|false|是否启用 CTRL+S 保存快捷键 <Badge>0.0.8</Badge>
debug|Boolean|false|开启debug 模式后，会在控制台输入各种信息

## 设计器 SLOTS

名称|参数|说明
-|-|-
title|()|左上角标题
footer|()|设计器底部横幅
