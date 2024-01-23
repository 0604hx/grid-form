import { h } from 'vue'
import { NIcon } from 'naive-ui'
import { Image, TextWidth, Font, Percent, FolderRegular, CalendarAlt, Tasks, ToggleOff, CheckSquareRegular, BellRegular, Divide, Star, CheckCircleRegular, Palette, Tags, SquareRegular, Square, Table } from '@vicons/fa'

/**
 * @typedef {Object} Attribute
 * @property {String} label - 属性名称
 */

/**
 * @typedef {Object} Container - 组件容器
 * @property {Function} add - 添加组件，参数：item（组件对象）、position（位置，默认-1）
 * @property {Function} copy - 复制组件，参数：index
 * @property {Function} remove - 删除组件，参数：index
 */


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

const BASIC = "basic"

const basicProperty = (cnName="标签", value, valueLabel="默认值")=>{
    let items = [ { label:"表单编号", id:"_uuid", summary:"表单提交时的参数名称", widget: Types.INPUT, value:"" }]
    if(!!cnName) items.push({ label:"中文名称", id:"_text", widget: cnName===false? undefined: Types.INPUT, value: cnName })
    items.push(
        COL(),
        { label:valueLabel, id:"_value", widget: Types.INPUT, value }
    )
    if(!!cnName){
        items.push(
            DISABLED(),
            { label:"监听值变动", id:"_watch", widget: Types.SWITCH, value: false, summary:"当该项的值变动时触发表单的 onChange 事件（需预先填写代码）" },
            { label:"是否必填", id:"_required", widget: Types.SWITCH, value: false },
            { label:"校验正则", id:"_regex", widget: Types.INPUT, value: "", summary:"请填写正则表达式（仅限勾选必填）" },
            { label:"回显文案", id:"_message", widget: Types.INPUT, value: "", summary:"当校验失败时提示的内容（仅限勾选必填）" }
        )
    }
    return { id: BASIC, label:"基本信息", items }
}

/**
 * 构建简单的【基本信息】面板属性
 * @param {Array<Attribute>} extra
 * @returns
 */
const basicSimpleProperty = (...extra)=>({
    id: BASIC, label:"基本信息",
    items:[ COL(), ...extra ]
})

const specialProperty = (items, label="控件属性", id="special")=> ({ id, label, items })

const DISABLED      = ()=>({ label:"是否禁用", id:"disabled", widget: Types.SWITCH, value: false, summary:"勾选后改组件无法操作" })
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
const TYPE          = (value, label="配色")=> ({ label, id:"type", widget:Types.SELECT, value, options:["default|DEFAULT-默认", "success|SUCCESS-成功", "info|INFO-信息", "warning|WARN-警告", "error|ERROR-错误"] })
const ROWS          = (value=1)=> ({ label:"显示行数", id:"rows", widget:Types.NUMBER, value, summary:"当行数大于 1 时显示 TEXTAREA 样式" })
const TITLE         = (value="提示信息", label="标题")=> ({ label, id:"title", widget:Types.INPUT, value })
const CONTENT       = (value="")=> ({ label:"内容", id:"content", widget:Types.INPUT, rows: 3, value })
const BORDERED      = (value=true)=> ({ label:"显示边框", id:"bordered", widget:Types.SWITCH, value })
const OPTIONS       = (value="1|选项一,2|选项二", rows=2, label="选项值")=> ({ id:"options", label, widget:Types.INPUT, value, rows })
const USE_HTML      = (label="HTML渲染")=> ({ id:"_html", label, widget:Types.SWITCH, value: false, summary:"以 HTML 格式渲染" })
const TIP           = (label="提示信息")=> ({id:"tip", label, widget:Types.INPUT, summary:"鼠标移动到上方后显示的信息"})
const SCRIPT        = (label="脚本代码", value="")=> ({id:"script", label, widget:Types.INPUT, rows:4, value, placeholder:"请填写脚本（为空不生效）"})
const SCRIPT_TRIGGER= (label="脚本触发方式", value="click")=>({id:"scriptTrigger", label, value, widget:Types.RADIO, options:"click|单击,dblclick|双击", summary:"触发脚本代码的方式（通常是点击）"})
const TEXT_ALIGN    = (label="文本对齐", value="left")=>({id:"textAlign", label, value, widget:Types.RADIO, options:"left|靠左,center|居中,right|靠右"})
const FONT_SIZE     = (label="字体大小", value=14)=>({id:"font-size", label, widget:Types.NUMBER, value, suffix:"px"})

// ----------------------------- START 控件清单 START -----------------------------
const _INPUT = {
    id:"INPUT", label:"文本输入", icon:TextWidth, value:"",
    items:[
        basicProperty("文本框"),
        specialProperty([PLACEHOLDER(), CLEARABLE(), PREFIX(), SUFFIX(), SHOW_COUNT(), MIN_LENGTH(), MAX_LENGTH(), ROWS()])
    ]
}
const _NUMBER = {
    id:"NUMBER", label:"数值输入", icon:Percent,
    items:[
        basicProperty("数字框"),
        specialProperty([PLACEHOLDER(), CLEARABLE(), PREFIX(), SUFFIX(), MIN(), MAX()])
    ]
}
const _TAGS = {
    id:"TAGS", label:"动态标签", icon: Tags,
    items:[
        basicProperty(),
        specialProperty([
            CLOSABLE(true), MAX(undefined, "最大标签数"), TYPE(),
            { id:"round", label:"使用圆角", widget:Types.SWITCH, value: false, summary:"标签圆角显示" }
        ])
    ]
}
const _BUTTON = {
    id:"BUTTON", label:"交互按钮", icon: Square, hideLabel: true, script:true,
    items: [
        basicSimpleProperty(
            { label:"显示文本", id:"label", widget: Types.INPUT, value: "交互按钮" },
            TIP(),
            TYPE(),
            { id:"text", widget:Types.SWITCH, value: false, label:"纯文本样式" },
            { id:"round", widget:Types.SWITCH, value: false, label:"启用圆角" },
            DISABLED()
        ),
        specialProperty([ SCRIPT_TRIGGER(), SCRIPT() ], "事件交互")
    ]
}

const _DATE = {
    id:"DATE", label:"日期选择", icon: CalendarAlt,
    items: [
        basicProperty("日期选择"),
        specialProperty([
            PLACEHOLDER(), CLEARABLE(),
            { id:"type", label:"日期类型", widget:Types.SELECT, value:"date", options:["date|日期（年月日）", "datetime|日期时间", "month|仅月份", "year|仅年份"] },
            { id:"format", label:"格式化", widget:Types.INPUT, value:"yyyy-MM-dd", summary:"日期显示格式，默认为 yyyy-MM-dd（示例 2023-01-01）"}
        ])
    ]
}
const _SELECT = {
    id:"SELECT", label:"下拉选择", icon: Tasks,
    items:[
        basicProperty(),
        specialProperty([
            PLACEHOLDER(), CLEARABLE(), FILTERABLE(),
            { id:"multiple", label:"可多选", widget:Types.SWITCH, value: false },
            { id:"options", label:"选项值", widget:Types.INPUT, value:"", rows: 3 }
        ])
    ]
}
const _SWITCH = {
    id:"SWITCH", label:"开关项框", icon: ToggleOff,
    items:[
        basicProperty(),
        specialProperty([
            { id:"round", label:"圆形按钮", widget:Types.SWITCH, value: true, summary:"不勾选时显示为方形" }
        ])
    ]
}
const _RADIO = {
    id:"RADIO", label:"单选项框", icon: CheckCircleRegular,
    items: [
        basicProperty(),
        specialProperty([
            { id:"button", label:"按钮模式", widget:Types.SWITCH, value:false, summary:"使用按钮组展示，显得更优雅一点"},
            OPTIONS()
        ])
    ]
}
const _CHECK_BOX = {
    id:"CHECKBOX", label:"多选项框", icon: CheckSquareRegular,
    items:[
        basicProperty(),
        specialProperty([ OPTIONS(), MIN(undefined, "最小选择数"), MAX(undefined, "最大选择数") ])
    ]
}
const _RATE = {
    id:"RATE", label:"星级评分", icon:Star,
    items:[
        basicProperty(),
        specialProperty([
            CLEARABLE(),
            { id:"count",label:"星星个数", widget:Types.NUMBER, value:5, min:1, max:10, summary:"显示的星星格式（1-10之间）" },
            { id:"allow-half",label:"允许半个",widget:Types.SWITCH, value:false, summary:"允许只激活一半图标（如 4.5 ）" }
        ])
    ]
}
const _COLOR = {
    id:"COLOR", label:"颜色选择", icon: Palette,
    items:[
        basicProperty(),
        specialProperty([
            CLEARABLE(),
            { id:"swatches", label:"预设颜色", widget:Types.INPUT, rows:4, summary:"一行一个颜色，支持 RGB、RGBA、HEX 格式" }
        ])
    ]
}
const _FILE = {
    id:"FILE", label:"文件上传", icon: FolderRegular,
    items: [
        basicProperty(),
        specialProperty([
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

const _TEXT = {
    id:"TEXT", label:"静态文本", icon: Font, hideLabel: true,
    items: [
        basicSimpleProperty( TEXTAREA() ),
        specialProperty([
            TYPE(), USE_HTML(),
            { id:"strong", label:"加粗", widget:Types.SWITCH, value:false },
            { id:"underline", label:"下划线", widget:Types.SWITCH, value:false },
            { id:"code", label:"代码模式", widget:Types.SWITCH, value:false },
            FONT_SIZE()
        ])
    ]
}
const _ALERT = {
    id:"ALERT", label:"提示信息", icon: BellRegular, hideLabel: true,
    items:[
        basicSimpleProperty(),
        specialProperty([TITLE(), CONTENT("提示内容"),USE_HTML(), TYPE("info"), BORDERED(), CLOSABLE()])
    ]
}
const _DIVIDER = {
    id:"DIVIDER", label:"分割直线", icon: Divide, hideLabel: true, //MinusSquareRegular
    items:[
        basicSimpleProperty( TEXTAREA("内容", "我是分割线", 1) ),
        specialProperty([
            { id:"dashed", label:"使用虚线", widget:Types.SWITCH, value:false },
            { id:"title-placement", label:"标题位置", widget:Types.RADIO, value:"center", options:"left|靠左,center|居中,right|靠右" }
        ])
    ]
}
//图片组件，支持事件交互，其实在 TEXT、ALERT 组件，启用 html 也能进行图片渲染 😄
const _IMAGE = {
    id:"IMAGE", label:"单张图片", icon:Image, hideLabel: true, script:true,
    items:[
        basicSimpleProperty(
            TIP(),
            { id:"height", label:"图片高度", value:"auto", widget:Types.INPUT, summary:"图片展示的最大高度，建议使用 px" },
            { id:"maxHeight", label:"父容器高度", value:"auto", widget:Types.INPUT, summary:"图片父容器的最大高度，可辅助进行裁剪显示" },
            { id:"full", label:"横向铺满", value: false, widget:Types.SWITCH, summary:"勾选后，图片将铺满父容器（可能会被拉伸）" },
            { id:"src", label:"图片地址", widget:Types.INPUT, rows:3, summary:"支持远程地址（http 开头）或者 base64 编码（友好于离线环境）", placeholder:"HTTP(S)地址或者BASE编码" }
        ),
        specialProperty([ SCRIPT_TRIGGER(), SCRIPT() ], "事件交互")
    ]
}
const _CARD = {
    id:"CARD", label:"卡片容器", icon: SquareRegular, container: true, hideLabel: true,
    items:[
        basicSimpleProperty( TITLE("卡片"), BORDERED()),
        specialProperty([
            { id:"width", label:"容器宽度", widget: Types.INPUT, value:"100%" },
            { id:"size", label:"组件尺寸", widget: Types.RADIO, value:'medium', options:"small|小号,medium|中等,large|大号" },
            { id:"grid", label:"容器列数", widget: Types.NUMBER, value: 3, min:1, max: 12, suffix:"列" },
            { id:"labelShow", label:"显示标签", widget: Types.SWITCH, value: true, summary:"是否显示内部表单项的标签" },
            { id:"labelPlacement", label:"标签位置", widget:Types.RADIO, value:"top", options:"top|在顶部,left|在左边" },
            { id:"labelAlign", label:"标签对齐", widget:Types.RADIO, value:"left", options:"left|左对齐,right|右对齐" },
            { id:"labelWidth", label:"标签宽度", widget: Types.INPUT, value:"120px" }
        ])
    ]
}
const _TABLE = {
    id:"TABLE", label:"静态表格", icon: Table, hideLabel: true,
    items:[
        basicSimpleProperty(
            BORDERED(),
            { id:"stripe", label:"斑马条纹", value: true, widget:Types.SWITCH },
            FONT_SIZE(),
            TEXT_ALIGN(),
            CONTENT("列A,列B,列C")
        ),
    ]
}
// ----------------------------- END 控件清单 END -----------------------------

export default [
    { label:"输入组件", items: [ _INPUT, _NUMBER, _TAGS, _BUTTON ] },
    { label:"选择组件", items: [ _DATE, _SELECT, _RADIO, _CHECK_BOX, _SWITCH, _RATE, _COLOR, _FILE ]},
    { label:"展示组件", items: [ _TEXT, _IMAGE, _ALERT, _TABLE, _DIVIDER, _CARD ] },
]

export const buildIcon= (icon, ps={})=> ()=> h(NIcon, Object.assign({component: icon}, ps))

/**
 * 支持自定义脚本的图标颜色
 */
export const scriptColor = "#18b0589f" //"#f0a020af" //
