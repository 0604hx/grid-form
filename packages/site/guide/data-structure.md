# 数据结构

## 表单结构

属性|类型|默认值|说明
-|-|-|-
id|String|undefined|表单ID（由业务系统自行填充）
size|String|medium|整体表单尺寸，其他值：`small`、`large`
width|String,Number|100%|表单宽度（支持 px、% 格式）
grid|Number|3|栅栏格数（1 到 24 之间）
labelWidth|Number|120|标签宽度（单位 px）
labelShow|Boolean|true|全局设置标签是否显示
labelPlacement|String|top|标签位置，其他值：`left`（左边），`Vant`渲染器不适用
labelAlign|String|left|标签对齐方式，其他值：`right`（靠右）
submitText|String|提交数据|默认按钮的文本（若为空，则不显示该按钮）
okText|String||提交完成后回显文案（由业务系统进行回显）
url|String||后端接口地址（由业务系统完成数据提交）
onLoad|String|undefined|<Badge>JS Code</Badge>表单初始化后调用
onSubmit|String|undefined|<Badge>JS Code</Badge>表单提交前调用钩子，用于进行数据预处理，也可以中断表单（返回 Promise）
onChange|String|undefined|<Badge>JS Code</Badge>表单值变动时调用钩子，通常用于表单联动
afterSubmit|String|undefined|<Badge>JS Code</Badge>表单提交完成后调用钩子（注意：需要由业务系统自行调用）
hides|Array|[]|表单默认值（隐藏项），包含`id`、`value`两个属性
items|Array|[]|表单项
buttons|Array|[]|自定义按钮

## 表单项结构
> 表单项属性分两类：控件属性、基本信息（以`_`开头），分别对应了组件渲染函数的两个参数：`props`、`attrs`

属性|类型|默认值|说明
-|-|-|-
_uuid|String||表单项ID（对于显示类组件不存在该属性）
_text|String||标签内容
_widget|String||组件编号（按此定位渲染函数）
_col|Number|1|组件所占格子数
_value|String||默认值（支持占位符）
_required|Boolean|false|是否必填
_regex|String||检验正则表达式
_message|String||校验不通过时回显的文字

## 额外按钮

属性|类型|默认值|说明
-|-|-|-
text|String|按钮|文本信息
theme|String|default|按钮配色，其他值：`success`（绿色）、`warning`（橙色）、`error`（红色）
type|String|post|触发事件类型，`post`（与`默认按钮`一致，表单提交）、`download`（下载操作）、`script`（仅执行代码）
code|String|undefined|若脚本返回`false`则中断后续流程

