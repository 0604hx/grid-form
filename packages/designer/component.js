import { TextWidth, Font, Percent, FolderRegular, MinusSquareRegular, CalendarAlt, Tasks, ToggleOff, CheckSquareRegular, BellRegular, Divide, Star, CheckCircleRegular, Palette, Tags } from '@vicons/fa'

/**
 * 表单属性编辑器的控件类型，尽可能简单
 */
const Types = {
    SWITCH  : "SWITCH",
    INPUT   : "INPUT",
    RADIO   : "RADIO",
    NUMBER  : "NUMBER",
    SELECT  : "SELECT",
}

const buildBasicProperty = (cnName="标签", value, valueLabel="默认值")=>{
    let items = [ { label:"表单编号", id:"_uuid", summary:"表单提交时的参数名称", widget: Types.INPUT, value:"" }]
    if(!!cnName) items.push({ label:"中文名称", id:"_text", widget: cnName===false? undefined: Types.INPUT, value: cnName })
    items.push(
        COL(),
        { label:valueLabel, id:"_value", widget: Types.INPUT, value }
    )
    if(!!cnName){
        items.push(
            { label:"是否禁用", id:"disabled", widget: Types.SWITCH, value: false, summary:"勾选后改组件无法被编辑" },
            { label:"监听值变动", id:"_watch", widget: Types.SWITCH, value: false, summary:"当该项的值变动时触发表单的 onChange 事件（需预先填写代码）" },
            { label:"是否必填", id:"_required", widget: Types.SWITCH, value: false },
            { label:"校验正则", id:"_regex", widget: Types.INPUT, value: "", summary:"请填写正则表达式（仅限勾选必填）" },
            { label:"回显文案", id:"_message", widget: Types.INPUT, value: "", summary:"当校验失败时提示的内容（仅限勾选必填）" }
        )
    }
    return { id:"basic", label:"基本信息", items }
}

const buildProperty = (items, id="special", label="控件属性")=> ({ id, label, items })

const COL           = ()=> ({ label:"所占列数", id:"_col", widget: Types.NUMBER, min:0, max: 24, suffix:"列", value: 1 })
const TEXTAREA      = (label="内容", value="文本内容", rows=3)=> ({ label, id:"_value", widget: Types.INPUT, value, rows })
const PLACEHOLDER   = (value="请输入")=> ({ label:"提示信息", id:"placeholder", widget:Types.INPUT, value})
const CLEARABLE     = (value=false)=> ({ label:"可清空", id:"clearable", summary:"在输入框尾部显示小按钮，点击后清空已输入内容", widget: Types.SWITCH, value })
const CLOSABLE      = (value=false)=> ({ label:"可关闭", id:"closable", summary:"显示关闭按钮，点击后关掉组件", widget:Types.SWITCH, value })
const PREFIX        = (value)=> ({ label:"前缀文本", id:"prefix", summary:"显示在控件首部的文字", widget:Types.INPUT, value })
const SUFFIX        = (value)=> ({ label:"后缀文本", id:"suffix", summary:"显示在控件尾部的文字", widget:Types.INPUT, value })
const MIN           = (value, label="最小值")=> ({ label, id:"min", widget:Types.NUMBER, value })
const MAX           = (value, label="最大值")=> ({ label, id:"max", widget:Types.NUMBER, value })
const MIN_LENGTH    = (value)=> ({ label:"最小字数", id:"minlength", widget:Types.NUMBER, value })
const MAX_LENGTH    = (value)=> ({ label:"最大字数", id:"maxlength", widget:Types.NUMBER, value })
const FILTERABLE    = (value=false)=> ({ label:"可过滤", id:"filterable", widget:Types.SWITCH, value, summary:"是否可以输入关键字进行选项过滤" })
const SHOW_COUNT    = (value=false)=> ({ label:"显示字数", id:"show-count", widget:Types.SWITCH, value, summary:"是否在尾部显示已输入的字数统计" })
const TYPE          = (value, label="配色")=> ({ label:"配色", id:"type", widget:Types.SELECT, value, options:["default|DEFAULT-默认", "success|SUCCESS-成功", "info|INFO-信息", "warning|WARN-警告", "error|ERROR-错误"] })
const ROWS          = (value=1)=> ({ label:"显示行数", id:"rows", widget:Types.NUMBER, value, summary:"当行数大于 1 时显示 TEXTAREA 样式" })
const TITLE         = (value="提示信息")=> ({ label:"标题", id:"title", widget:Types.INPUT, value })
const CONTENT       = (value="")=> ({ label:"内容", id:"content", widget:Types.INPUT, rows: 3, value })
const BORDERED      = (value=true)=> ({ label:"显示边框", id:"bordered", widget:Types.SWITCH, value })
const OPTIONS       = (value="1|选项一,2|选项二", rows=2, label="选项值")=> ({ id:"options", label, widget:Types.INPUT, value, rows })
const USE_HTML      = (label="HTML渲染")=> ({ id:"_html", label, widget:Types.SWITCH, value: false, summary:"以 HTML 格式渲染" })

// ----------------------------- START 控件清单 START -----------------------------
const _INPUT = {
    id:"INPUT", label:"文本输入", icon:TextWidth, value:"",
    items:[
        buildBasicProperty("文本框"),
        buildProperty([PLACEHOLDER(), CLEARABLE(), PREFIX(), SUFFIX(), SHOW_COUNT(), MIN_LENGTH(), MAX_LENGTH(), ROWS()])
    ]
}
const _NUMBER = {
    id:"NUMBER", label:"数值输入", icon:Percent,
    items:[
        buildBasicProperty("数字框"),
        buildProperty([PLACEHOLDER(), CLEARABLE(), PREFIX(), SUFFIX(), MIN(), MAX()])
    ]
}
const _TAGS = {
    id:"TAGS", label:"动态标签", icon: Tags,
    items:[
        buildBasicProperty(),
        buildProperty([
            CLOSABLE(true), MAX(undefined, "最大标签数"), TYPE(),
            { id:"round", label:"使用圆角", widget:Types.SWITCH, value: false, summary:"标签圆角显示" }
        ])
    ]
}
const _DATE = {
    id:"DATE", label:"日期选择", icon: CalendarAlt,
    items: [
        buildBasicProperty("日期选择"),
        buildProperty([
            PLACEHOLDER(), CLEARABLE(),
            { id:"type", label:"日期类型", widget:Types.SELECT, value:"date", options:["date|日期（年月日）", "datetime|日期时间", "month|仅月份", "year|仅年份", "quarter|年份和季度"] },
            { id:"format", label:"格式化", widget:Types.INPUT, value:"yyyy-MM-dd", summary:"日期显示格式，默认为 yyyy-MM-dd（示例 2023-01-01）"}
        ])
    ]
}
const _SELECT = {
    id:"SELECT", label:"下拉选择", icon: Tasks,
    items:[
        buildBasicProperty(),
        buildProperty([
            PLACEHOLDER(), CLEARABLE(), FILTERABLE(),
            { id:"multiple", label:"可多选", widget:Types.SWITCH, value: false },
            { id:"options", label:"选项值", widget:Types.INPUT, value:"", rows: 3 }
        ])
    ]
}
const _SWITCH = {
    id:"SWITCH", label:"开关项框", icon: ToggleOff,
    items:[
        buildBasicProperty(),
        buildProperty([
            { id:"round", label:"圆形按钮", widget:Types.SWITCH, value: true, summary:"不勾选时显示为方形" }
        ])
    ]
}
const _RADIO = {
    id:"RADIO", label:"单选项框", icon: CheckCircleRegular,
    items: [
        buildBasicProperty(),
        buildProperty([
            { id:"button", label:"按钮模式", widget:Types.SWITCH, value:false, summary:"使用按钮组展示，显得更优雅一点"},
            OPTIONS()
        ])
    ]
}
const _CHECK_BOX = {
    id:"CHECKBOX", label:"多选项框", icon: CheckSquareRegular,
    items:[
        buildBasicProperty(),
        buildProperty([ OPTIONS(), MIN(undefined, "最小选择数"), MAX(undefined, "最大选择数") ])
    ]
}
const _RATE = {
    id:"RATE", label:"星级评分", icon:Star,
    items:[
        buildBasicProperty(),
        buildProperty([
            CLEARABLE(),
            { id:"count",label:"星星个数", widget:Types.NUMBER, value:5, min:1, max:10, summary:"显示的星星格式（1-10之间）" },
            { id:"allow-half",label:"允许半个",widget:Types.SWITCH, value:false, summary:"允许只激活一半图标（如 4.5 ）" }
        ])
    ]
}
const _COLOR = {
    id:"COLOR", label:"颜色选择", icon: Palette,
    items:[
        buildBasicProperty(),
        buildProperty([
            CLEARABLE(),
            { id:"swatches", label:"预设颜色", widget:Types.INPUT, rows:4, summary:"一行一个颜色，支持 RGB、RGBA、HEX 格式" }
        ])
    ]
}
const _TEXT = {
    id:"TEXT", label:"静态文本", icon: Font,
    items: [
        {
            id:"basic", label:"基本信息",
            items:[
                COL(),
                TEXTAREA()
            ]
        },
        buildProperty([
            TYPE(), USE_HTML(),
            { id:"strong", label:"加粗", widget:Types.SWITCH, value:false },
            { id:"underline", label:"下划线", widget:Types.SWITCH, value:false },
            { id:"code", label:"代码模式", widget:Types.SWITCH, value:false },
            { id:"font-size", label:"字体大小", widget:Types.NUMBER, value: 14, suffix:"px" }
        ])
    ]
}
const _ALERT = {
    id:"ALERT", label:"提示信息", icon: BellRegular,
    items:[
        {
            id:"basic", label:"基本信息",
            items:[ COL() ]
        },
        buildProperty([TITLE(), CONTENT("提示内容"),USE_HTML(), TYPE("info"), BORDERED(), CLOSABLE()])
    ]
}
const _DIVIDER = {
    id:"DIVIDER", label:"分割直线", icon: Divide, //MinusSquareRegular
    items:[
        {
            id:"basic", label:"基本信息",
            items:[
                COL(),
                TEXTAREA("内容", "我是分割线", 1)
            ]
        },
        buildProperty([
            { id:"dashed", label:"使用虚线", widget:Types.SWITCH, value:false },
            { id:"title-placement", label:"标题位置", widget:Types.RADIO, value:"center", options:"left|靠左,center|居中,right|靠右" }
        ])
    ]
}

const _FILE = {
    id:"FILE", label:"文件上传", icon: FolderRegular,
    items: [
        buildBasicProperty(),
        buildProperty([
            { id:"maxSize", label:"文件大小限制", widget:Types.NUMBER, min:1, max:50, value:2, suffix:"兆(MB)", summary:"超过该值的文件将不允许提交" },
            // 参考 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
            {
                id:"accept", label:"允许文件类型", widget:Types.SELECT, value:"image/*",
                options:{
                    "*":"不限",
                    "image/*":"图片格式",
                    "image/png,image/jpeg":"PNG或JPG",".doc,.docx,.xls,.xlsx,.ppt,.pptx":"OFFICE 文档",
                    ".pdf": "PDF 文档",
                    ".zip,.7z,.rar,.tar":"常用压缩包",
                    ".txt": "TXT 纯文本",
                    ".csv": "CSV 文档"
                }
            },
            { id:"acceptCustom", label:"自定义类型", summary:"⌈允许文件类型⌋与⌈自定义类型⌋同时存在时，优先使用后者", widget:Types.INPUT, placeholder:"自定义文件类型" },
            { id:"dataType", label:"读取方式", widget:Types.SELECT, value:"", options:"|默认,base64|BASE64,text|纯文本", summary:"提交到服务器的数据形式" }
        ])
    ]
}
// ----------------------------- END 控件清单 END -----------------------------

export default [
    { label:"输入组件", items: [ _INPUT, _NUMBER, _TAGS ] },
    { label:"选择组件", items: [ _DATE, _SELECT, _RADIO, _CHECK_BOX, _SWITCH, _RATE, _COLOR, _FILE ]},
    { label:"展示组件", items: [ _TEXT, _ALERT, _DIVIDER] },
]
