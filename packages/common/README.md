# GRID-FORM-COMMON
> [栅栏表单](https://github.com/0604hx/grid-form)通用模块

名称|参数|说明
-|-|-
createForm||创建用于表单设计器、渲染器的数据对象
createFormItem|(widget)|创建表单项
buildOptions|(text, valueField="value")|生成适用于 naive-ui 的选项列表
buildComponent|(item, widget, track=true)|渲染表单组件
withHtmlNode|(html)|创建 div 包含指定的 html 代码
lifeCycles|`常量`|表单事件定义
formValueProvider|Object|根据占位符计算表单项的默认值
triggerLoaded|(body, form)|用于表单加载完成后触发 onLoad 事件
triggerBeforeSubmit|(body, form, items)|用于表单加载完成后触发 onSubmit 事件
triggerExtraButtonClick|(body, form)|自定义按钮点击后触发的事件

文档请查阅：[grid-form in Github](https://github.com/0604hx/grid-form)
