import { h } from 'vue'

import { buildOptions  } from '@grid-form/common'

import { Divider, CellGroup, Button } from 'vant'

import Input from "./widgets/input.vue"
import SelectorDate from "./widgets/selector-date.vue"
import SelectorImage from "./widgets/selector-img.vue"
import Selector from "./widgets/selector.vue"
import Alert from "./widgets/alert.vue"
import Checkbox from "./widgets/checkbox.vue"
import Radio from "./widgets/radio.vue"
import Switch from "./widgets/switch.vue"
import Rate from "./widgets/rate.vue"

import FormRender from "./Render.vue"

const fixType = p=> {
    if(p.type == 'error')   p.type = 'danger'
}

const inputField = (props, attrs)=>{
    let ps = {
        label               : attrs._text,
        required            : attrs._required,
        placeholder         : props.placeholder,
        showWordLimit       : props["show-count"],
        clearable           : props.clearable,
        disabled            : props.disabled,
        rows                : props.rows,
        maxlength           : props.maxlength,
        type                : attrs._widget=='NUMBER'?"number":"text"
    }
    // return h(Field, ps)
    return h(Input, ps)
}

const _toProps = (props, attrs, ps={})=>{
    return Object.assign({label:attrs._text, disabled:props.disabled, required: attrs._required}, ps)
}

const RenderFuncs = {
    "INPUT"     : inputField,
    "NUMBER"    : inputField,
    //暂无对动态标签的实现
    "TAGS"      : (props, attrs)=> undefined,
    "BUTTON"    : props=>{
        fixType(props)
        if(!!props.tip){
            props.title = props.tip
            delete props.tip
        }
        props.plain = props.text === true
        props.block = true
        props.text = props.label
        return h('div', {style:{margin:"0px 16px 0px 16px"}}, h(Button, props))
    },

    "SELECT"    : (props, attrs)=> h(Selector, _toProps(props, attrs, {placeholder:props.placeholder, multiple:props.multiple, options:buildOptions(props.options, "value", "text")})),
    "CHECKBOX"  : (props, attrs)=> h(Checkbox, _toProps(props, attrs, {options:buildOptions(props.options), max:props.max})),
    "RADIO"     : (props, attrs)=> h(Radio, _toProps(props, attrs, {options:buildOptions(props.options)})),
    "SWITCH"    : (props, attrs)=> h(Switch, _toProps(props, attrs)),
    "DATE"      : (props, attrs)=> {
        let ps = _toProps(props, attrs, {placeholder:props.placeholder})
        if(props.type=='month') ps.type=['year','month']
        if(props.type=='year')  ps.type=['year']

        return h(SelectorDate, ps)
    },
    "RATE"      : (props, attrs)=>{
        return h(Rate, _toProps(props, attrs, { count: props.count, half: !!props['allow-half'] }))
    },
    "COLOR"     : props=> undefined,

    "FILE"      : (props, attrs)=>{
        return h(SelectorImage, _toProps(props, attrs))
    },
    "TEXT"      : (props, attrs)=> {
        let ps = {
            style:{padding:"10px"},
        }
        ps[attrs._html===true?"innerHTML":"innerText"] = attrs._value
        return h('div', ps)
    },
    "ALERT"     : (props, attrs)=> h(Alert, {title:props.title, type:props.type, closeable:props.closeable }, {
        default: ()=> attrs._html===true?h('div', {innerHTML:props.content}): props.content
    }),
    "DIVIDER"   : (props, attrs)=> h(Divider, {dashed: props.dashed, "content-position":props['title-placement']}, ()=>attrs._value),
    "CARD"      : (props)=> h(CellGroup, { title: props.title, inset: true, border: props.bordered, style:{padding:'2px'} } )
}

export { FormRender, RenderFuncs }
