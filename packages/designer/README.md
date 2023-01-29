# GRID-FORM-DESIGNER / 表单设计器
> 基于[Naive UI](https://www.naiveui.com)实现的[栅栏表单](https://github.com/0604hx/grid-form)可视化设计器


## 使用方式

① 引入依赖

```javascript
import { reactive, onMounted, onUnmounted } from 'vue'
import { Designer, Components } from "@grid-form/designer"
import { RenderFuncs } from "@grid-form/render-naive"
import { createForm } from "@grid-form/common"

// 如需扩展 RenderFuncs、Components ，请自行扩写

let form = reactive(createForm())
```

② 配置组件
```html
<template>
    <Designer :renders="RenderFuncs" :components="Components" :compact="false" :form="form" style="height: 100vh;" debug show-footer :footer-height="45"></Designer>
</template>
```

Enjoy!

## 设计器 API

### Props

名称|类型|默认值|说明|版本
-|-|-|-|-
components|Array|[]|组件库|
renders|Object|{}|组件渲染函数|
siderWidth|Number,String|360|左右侧边栏的宽度，支持 px、% 单位，建议直接传递数值
gridGap|Number|10|可视化区域栅栏间隔，单位 px|
review|Boolean|false|是否对表单项做校验|
form|Object|undefined|表单对象|
compact|Boolean|false|紧凑的布局，如果设置为true，则左右两侧的属性编辑行距缩短|
headerHeight|Number|55|设计器头部高度|
showFooter|Boolean|false|是否显示设计器底部|
footerHeight|Number|50|设计器底部高度，单位 px|
debug|Boolean|false|开启debug 模式后，会在控制台输入各种信息|

### Slots

名称|说明
-|-
title|设计器头部标题内容
footer|设计器底部内容
