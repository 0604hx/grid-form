# 组件

<script setup>
    const type = "配色，默认（default）、成功（success）、信息（info）、警告（warning）、错误（error）；不同 `UI 库`展示效果有所差异"
    const trigger = `脚本代码的触发方式，可选：click（单击）、dblclick（双击）`
</script>

:::tip 总览
本章节为内置组件清单，代码详见`packages\designer\component.js`

![](/com/components.webp)
:::


## 🔠 输入类
> 输入类组件通常有通用的基础属性（以`_`开头）

属性|类型|默认值|说明
-|-|-|-
_uuid|String||表单项ID（提交时的参数名称）
_text|String||中文名称
_widget|String|<Badge>同章节标题</Badge>|组件编号（按此定位渲染函数）
_col|Number|1|组件所占格子数
_value|String||默认值（支持占位符）
_watch|Boolean|false|是否监听值变动
_required|Boolean|false|是否必填
_regex|String||检验正则表达式
_message|String||校验不通过时回显的文字
disabled|Boolean|false|是否禁用状态

### 文本输入 / INPUT

属性|类型|默认值|说明
-|-|-|-
placeholder|String|请输入|提醒内容
clearable|Boolean|false|右边显示清空内容的按钮
prefix|String||显示在控件首部的文字
suffix|String||显示在控件尾部的文字
show-count|Boolean|false|在尾部显示已输入字数
minlength|Number||最小输入字数
maxlength|Number||最大输入字数
rows|Number|1|输入框行数，大于 1 时等同于 `TEXTAREA`

:::details 属性编辑图
![](/com/attr-input.webp)
:::

### 数值输入 / NUMBER

属性|类型|默认值|说明
-|-|-|-
placeholder|String|请输入|提醒内容
clearable|Boolean|false|右边显示清空内容的按钮
prefix|String||显示在控件首部的文字
suffix|String||显示在控件尾部的文字
show-count|Boolean|false|在尾部显示已输入字数
min|Number||最小数值
max|Number||最大数值

:::details 属性编辑图
![](/com/attr-number.webp)
:::

### 动态标签 / TAGS

属性|类型|默认值|说明
-|-|-|-
closable|Boolean|true|显示关闭按钮，点击后关闭或者删除内容
max|Number||最大标签数
type|String||{{type}}
round|Boolean|false|标签项使用圆角显示

:::details 属性编辑图
![](/com/attr-tags.webp)
:::

### 按钮 / BUTTON

属性|类型|默认值|说明
-|-|-|-
label|String|交互按钮|显示的按钮文本
tip|String||鼠标移动到上方后显示的信息
type|String||{{type}}
text|Boolean|false|纯文本样式
round|Boolean|false|标签项使用圆角显示
scriptTrigger|String|click|{{trigger}}
script|String||脚本代码（仅支持原生 JS 语法）

:::details 属性编辑图
![](/com/attr-button.webp)
:::

## ☑ 选择类

### 日期选择 / DATE

### 下拉选择 / SELECT

### 单选框 / RADIO

### 复选框 / CHECK_BOX

### 开关 / SWITCH

### 评分 / RATE

### 颜色选取 / COLOR

### 文件选择 / FILE

## 📈 展示类

### 文本 / TEXT

### 图片 / IMAGE

### 提示信息 / TIP

### 静态表格 / TABLE

### 分割线 / DIVIDER

### 卡片（子表单） / CARD
