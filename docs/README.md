# 欢迎使用

## 表单联动

要启用联动需要满足以下条件：

1. 填写表单的`onChange`事件代码
2. 至少一个表单项勾选了`监听值变动`

`onChange`回调会传递三个参数：

参数名|类型|是否响应式|说明
-|-|-|-
form|Object|✅|当前表单的全部值
agent|Object||当前变动的表单项详情（`key`表单项ID、`from`旧值、`to`新值）
items|Array|✅|表单项定义数组（修改里面的值可重绘整个表单）

**示例**

```js
/**
 * 通过修改 items 下元素的 disabled（为 true 时禁用表单项）、_hide（为 true 时隐藏）
 * 可实现表单项的禁用与隐藏
 */ 
if(agent.key=='nature'){
    if(agent.to=='个体工商户'){
        items.filter(v=>v._uuid=='scale')[0].disabled=true
        form.scale = 1
    }
    else{
        items.filter(v=>v._uuid=='scale')[0].disabled=false
    }
}
```

### 设计初衷

其实常规的做法是输入类表单项增加事件（如 onChange、onBlur、onFocus 等），但是这样操（实）作（现）繁（困）琐（难）😂😂，我的做法只需要填写一处代码（直观）。
