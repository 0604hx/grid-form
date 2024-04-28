import { h } from 'vue'

import { buildOptions  } from '@grid-form/common'

import FormRender from './Render.vue'
import Span from "./widgets/span.vue"
import Switch from "./widgets/switch.vue"
import SelectorDate from "./widgets/selector-date.vue"
import SelectorImage from "./widgets/selector-img.vue"
import Rate from "./widgets/rate.vue"
import Alert from "./widgets/alert.vue"
import Card from "./widgets/card.vue"
import Number from "./widgets/number.vue"

import { Input, Button, Select, Option, Checkbox, CheckboxGroup, RadioGroup, Radio, Divider } from '@varlet/ui'

const toLabel = text=> h(Span, { text })

const fixType = p=> {
    if(p.type == 'error')   p.type = 'danger'
}

const _toProps = (props, attrs, ps={})=>Object.assign({
    placeholder : attrs._text,
    disabled    : props.disabled,
    variant     : window.VARLET_VARIANT || "standard",
    clearable   : props.clearable,
    disabled    : props.disabled,
}, ps)

/**
 * 可以通过设置全局变量 VARLET_VARIANT 配置输入框的样式
 * @param {Object} props
 * @param {Object} attrs
 * @returns
 */
const inputField = (props, attrs)=> {
    let isNum = attrs._widget=='NUMBER'
    let ps = {
        showWordLimit       : props["show-count"],
        rows                : props.rows,
        maxlength           : props.maxlength,
        textarea            : props.rows>1,
        type                : isNum?"number":"text"
    }
    return h(isNum? Number:Input, _toProps(props, attrs, ps))
}

const RenderFuncs = {
    "INPUT": inputField,
    "NUMBER": inputField,
    //暂无对动态标签的实现
    "TAGS"      : (props, attrs)=> undefined,
    "BUTTON"    : props=>{
        fixType(props)
        if(!!props.tip){
            props.title = props.tip
            delete props.tip
        }
        // 默认就是圆角，若配置了 true 则添加外边框
        if(props.round === true){
            props.outline = true
            delete props.round
        }
        props.block = true
        return h(Button, props, ()=> props.label)
    },

    "SELECT"    : (props, attrs)=> h(Select, _toProps(props, attrs, {multiple:props.multiple}), ()=>buildOptions(props.options).map(v=>h(Option, v))),
    "CHECKBOX"  : (props, attrs)=> h(
        CheckboxGroup,
        _toProps(
            props,
            attrs,
            {max:props.max}
        ),
        ()=>{
            let opts = buildOptions(props.options).map(v=> h(Checkbox, { checkedValue: v.value }, ()=> v.label))
            opts.unshift(toLabel(attrs._text))
            return opts
        }
    ),
    "RADIO"     : (props, attrs)=> h(RadioGroup, _toProps(props, attrs), ()=>{
        let opts = buildOptions(props.options).map(v=>h(Radio, { checkedValue:v.value}, ()=>v.label))
        opts.unshift(toLabel(attrs._text))
        return opts
    }),
    "SWITCH"    : (props, attrs)=> h(Switch, _toProps(props, attrs)),
    "DATE"      : (props, attrs)=> {
        let ps = _toProps(props, attrs)
        if(props.type=='month') ps.type=['year','month']
        if(props.type=='year')  ps.type=['year']

        return h(SelectorDate, ps)
    },
    "RATE"      : (props, attrs)=> h(Rate, _toProps(props, attrs, { count: props.count, half: !!props['allow-half'] })),
    "COLOR"     : props=> undefined,

    "FILE"      : (props, attrs)=>{
        return h(SelectorImage, _toProps(props, attrs))
    },
    "TEXT"      : (props, attrs)=> {
        let ps = { }
        ps[attrs._html===true?"innerHTML":"innerText"] = attrs._value
        return h('div', ps)
    },
    "ALERT"     : (props, attrs)=> h(Alert, {title:props.title, type:props.type, closeable:props.closeable }, {
        default: ()=> attrs._html===true?h('div', {innerHTML:props.content}): props.content
    }),
    "DIVIDER"   : (props, attrs)=> h(Divider, {dashed: props.dashed, description: attrs._value}),
    "CARD"      : (props)=> h(Card, { title: props.title, bordered: props.bordered } )
    // "CARD"      : (props)=> h(Collapse, ()=> h(CollapseItem, { title: props.title }))
}

export { FormRender, RenderFuncs }
