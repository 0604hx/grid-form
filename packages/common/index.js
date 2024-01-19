import { h, toRaw, unref } from 'vue'

/**
 * @typedef {Object} Widget
 * @property {String} id - 组件ID
 * @property {String} label - 组件名称
 * @property {String} icon - 组件图标
 * @property {Array<Object>} items - 组件属性
 * @property {*} value - 组件默认值
 * @property {Boolean} container - 是否为容器组件（能够装载表单项），默认为 false
 * @property {Boolean} hideLabel - 是否在渲染时隐藏表单标签，默认为 false
 */

/**
 * @typedef {Object} FormItem
 * @property {String} _widget - 组件类型编号
 * @property {String} _uuid - 表单项UUID
 * @property {String} _text - 表单项标签
 * @property {String} _value - 表单项默认值
 * @property {Boolean} _watch - 是否监听变化
 * @property {Boolean} _container - 是否为容器
 * @property {Boolean} _required - 是否为必填项目
 */


export function createFormBean(ps={}){
    return Object.assign({
        size:"medium",                          //整体表单尺寸，可选值：small、medium、large
        width: "100%",
        grid: 3,                                //栅栏格数（1到24之间）
        labelWidth: 120,
        labelShow: true,
        labelPlacement:"top",                   //标签位置，可选值：top（顶部）、left 左边
        labelAlign: "left",                     //标签对齐方式：left、right
        items: [],
    }, ps)
}
/**
 * 创建 Form 数据对象
 * @param {*} ps
 * @returns
 */
export function createForm(ps={}){
    return createFormBean(
        Object.assign({
            submitText:"提交数据",
            url:"",
            okText:"",
            onLoad:"",
            onSubmit:"",
            onChange:"",
            afterSubmit:"",
            hides:[],                           //表单默认值（隐藏项），包含`id`、`value`两个属性
            buttons:[]                          //额外按钮，Object类型，属性包含：text（显示文本）、type（事件类型，post、download、script）、theme（配色）、code（脚本）
        }, ps)
    )
}

let ID_COUNTER = 1
/**
 * 构建新表单项
 * @param {Widget} widget
 * @returns {FormItem}
 */
export function createFormItem(widget) {
    let _widget = widget.id
    if(!_widget)    throw Error(`参数 widget 的 id 不能为空`)

    let item = { _widget, ...(widget.container === true? createFormBean():{}) }
    if(Array.isArray(widget.items)) {
        for(let i of widget.items){
            if(Array.isArray(i.items)){
                for(let ii of i.items){
                    if(ii.value != undefined)   item[ii.id] = ii.value
                }
            }
        }
    }
    if("_uuid" in item)
        item._uuid = _widget.toLowerCase() + "_"+(`${1000 + ID_COUNTER++}`.substring(1))
    if("_text" in item){
        if(!!widget.label) item._text = widget.label
    }

    // 赋予默认值
    if(item._value == undefined) item._value = widget.value
    // 容器组件，设置其 childs
    if(widget.container === true) {
        item.items = []
        item._container = true
    }
    if(widget.hideLabel === true)   item._hideLabel = true
    return item
}

/**
 * 新建额外按钮数据对象
 * @returns
 */
export const createExtraButton = ()=>({text:"按钮", theme:"default", type:"post", code:""})

export const createHideItem = (id="", value="")=>({ id, value})

/**
 * 构建适配于 naive-ui 的下拉框选择内容，示例：[{label:"选项一",value:"01"}]
 *
 * 参数 text 类型可以是 Array、String、Object
 *  Array   ["01|选项一","02|选项二"]
 *  String  01|选项一,02|选项二
 *  Object  {"01":"选项一", "02":"选项二"}
 *
 * 处理逻辑：
 *  1、将参数 text 转换为 Array<String>（key与value 用英文 | 隔开）
 *  2、遍历上述数组元素转换为 { label, value }
 *  3、若参数没有区分 key 跟 value 则二者相同
 *
 * @param {*} text
 * @param {*} valueField    默认为 value
 * @param {*} labelField    默认为 label
 */
export function buildOptions(text, valueField="value", labelField="label") {
    let options = []
    if(!text)   return options

    if(Array.isArray(text))
        options = text
    else if(typeof(text) === 'string'){
        options = text.replace(/ /g, "").split(",")
    }
    else if(typeof(text) === 'object'){
        options = Object.keys(text).map(k=> `${k}|${text[k]}`)
    }
    else
        throw Error(`${text} 不是有效的 options 数据内容，请参考文档进行配置`)

    return options.map(o=> {
        let i = o.indexOf("|")
        let obj = {}
        if(i==-1)
            obj[valueField] = obj[labelField] = o
        else{
            obj[labelField] =  o.substring(i+1)
            obj[valueField] = o.substring(0, i)
        }

        return obj
    })
}

/**
 *
 * @param {FormItem} item
 * @param {Object|Function} widget - 渲染函数或者组件
 * @param {Boolean} track - 是否显示debug信息
 * @returns
 */
export function buildComponent(item, widget, track=true){
    if(!item._widget) return console.error(`[渲染组件] 必须存在 _widget 属性...`, item)
    if(!widget) throw Error(`渲染组件 ${item._widget} 失败：无效的组件（请先注册相应的 Widgets）`)
    if(track)   (typeof(track)==='function'? track:console.debug)("绘制组件", toRaw(unref(item)))

    //基础属性
    let attrs = {}
    //组件 props
    let _props = {}

    for(let key in item){
        if(key[0]=="_"){
            attrs[key] = item[key]
            continue
        }
        else
            _props[key] = item[key]
    }

    if(typeof(widget)==='function')
        return widget(_props, attrs)
    return h(widget, _props)
}

export function withHtmlNode (html){
    return ()=> h('div', {innerHTML: html})
}

export function formatFileSize(mem, fixed=2){
    var G = 0
    var M = 0
    var KB = 0
    mem >= (1 << 30) && (G = (mem / (1 << 30)).toFixed(fixed))
    mem >= (1 << 20) && (mem < (1 << 30)) && (M = (mem / (1 << 20)).toFixed(fixed))
    mem >= (1 << 10) && (mem < (1 << 20)) && (KB = (mem / (1 << 10)).toFixed(fixed))
    return G > 0
        ? G + 'GB'
        : M > 0
            ? M + 'MB'
            : KB > 0
                ? KB + 'KB'
                : mem + 'B'
}

/**
 * 将指定数据写入到系统粘贴板
 * @param {Object|String} obj   如果为非字符串，事先进行 JSON 转换
 * @returns
 */
export const copyText = (obj, pretty=false)=> {
    let text = typeof(obj)=='string'? obj: JSON.stringify(obj, null, pretty?4:0)
    // 仅在 localhost 或者 https 环境下才能使用该 API
    if(navigator.clipboard)
        navigator.clipboard.writeText(text)
    else {
        const textarea = document.createElement('textarea')
        textarea.addEventListener('focusin', (event) => event.stopPropagation())
        textarea.value = text
        textarea.setAttribute('readonly', '')
        textarea.style.cssText =  'position:fixed; pointer-events:none; z-index:-9999; opacity:0;'

        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
    }
}

export * from './runtime'
