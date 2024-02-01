# 高级功能/Advance
> 诸如表单回调函数、数据联动等

<script setup>
    const time = Date.now()
</script>

## 🪝 回调函数 / HOOK
> 表单回调函数帮助用户在不同的时间节点处理业务逻辑，若无特殊注明，回调均采用非 `Promise` 形式执行。

### 初始化 / onLoad
在表单加载完成后触发，参数：
* `form` 当前表单值（Object，响应式），可以修改对应值
* `items` 表单定义（Array），支持动态修改表单项（如下拉框的选项内容）

```js
console.debug("表单值", form)
// 更新 _uuid 为 type 的下拉框选项
items.$('type').options = '个人,企业'
```

### 提交时 / onSubmit <Badge>Promise</Badge>
表单提交前触发，以 **Promise** 形式调用，一旦定义了此回调，若不返回`true`则会中断表单的提交，参数：

* `form` 当前表单值（Object，响应式）
* `items` 表单定义（Array），支持动态修改表单项（如下拉框的选项内容）
* `resolve` Promise 回调
* `reject` Promise 回调

```js
//判断字段格式
if(!form.name || form.name.length < 2)  return reject(`用户名长度必须大于2`)

//返回 true 继续提交
resolve(true)
```

### 提交后 / afterSubmit
表单成功提交后触发，参数：
* `form` 当前表单值（Object，响应式）

此回调并不由`GRID-FORM`触发，而是需要配合渲染器的事件使用：

```vue
<template>
    <FormRender :renders="RenderFuncs" @submit="submitDo" />
</template>

<script setup>
    import { reactive } from 'vue'

    import { triggerAfterSubmit } from '@grid-form/common'
    import { FormRender, RenderFuncs } from "@grid-form/render-naive" // [!code highlight]

    let form = reactive({})

    const submitDo = (formObj, action='post')=>{
        //处理提交
        
        //触发 afterSubmit 事件
        if(form.afterSubmit)
            triggerAfterSubmit(form.afterSubmit, formBean)           // [!code highlight]
    }
</script>
```

### 数据变化时 / onChange
表单值变动时触发（表单项需勾选`监听变动`），参数：
* `form` 当前表单值（Object，响应式）
* `agent` 当前变动的表单项详情（key=表单项ID、from=旧值、to=新值）
* `items` 表单定义（Array），支持动态修改表单项（如下拉框的选项内容）


```js
console.debug("表单值变动：", agent.key, "从 "+agent.from+" 变更为 "+agent.to)
```

## 😎 表单进阶玩法

### 隐藏值

表单的`hides`属性（Array）为隐藏值，在初始化时将注入到表单对象

```json-vue
[
    { "id": "token", "value": "123" },
    { "id": "expire", "value": {{ time }} },
]
```

则初始化的表单值为：
```js-vue
{ token: "123", expire: {{ time }} }
```

### 额外的按钮
> 排布在`提交按钮`后的普通按钮，支持脚本交互

![](/extra-btns.png)

属性详见：[额外按钮](./data-structure.md#额外按钮)

### 数据联动

要启用联动需要满足以下条件：

1. 填写表单的`onChange`事件代码
2. 至少一个表单项勾选了`监听值变动`

```js
/**
 * 通过修改 items 下元素的 disabled（为 true 时禁用表单项）、_hide（为 true 时隐藏）
 * 可实现表单项的禁用与隐藏
 */ 
if(agent.key=='企业类型'){
    if(agent.to=='个体工商户'){
        items.$('规模').disabled=true
        form.scale = 1
    }
    else{
        items.$('规模').disabled=false
    }
}
```

::: info 设计初衷
其实常规的做法是在`输入类表单项`增加事件（如 onChange、onBlur、onFocus 等），但是这样操（实）作（现）繁（困）琐（难）😂😂，我的做法只需要填写一处代码（直观）
:::

## 🏳️‍🌈 辅助函数
> 为方便用户定义回调函数，我们封装一些常用的方法

### 表单项寻找:$

```js
// items 扩展 $ 方法，便于按指定条件递归找到表单项
// 注意，上述方法只返回符合条件的第一个表单项
// 示例：找到编号(_uuid)为 name 的表单项，并禁用
items.$("name").disabled = true
items.$({_uuid:"name", "_text":"名称"}).disabled = true
```
