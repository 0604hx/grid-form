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
