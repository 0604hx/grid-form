import { h } from 'vue'

import {
    Input, Textarea, Tag, InputNumber, InputTag, Button, Switch, Select, Card,
    RadioGroup, CheckboxGroup, Alert, DatePicker, Divider, Rate, ColorPicker
} from '@arco-design/web-vue'
import { buildOptions  } from '@grid-form/common'

import FileSelector from "./widgets/FileSelector.vue"
import FormRender from "./Render.vue"

const buildTag = text=> ()=>h(Tag, {type:"", size:"small"}, ()=>text)

const buildSlotWithPrefixAndSuffix = props=>{
    let slots = {}
    if(!!props.prefix)
        slots.prefix = buildTag(props.prefix)
    if(!!props.suffix)
        slots.suffix = buildTag(props.suffix)

    delete props.prefix
    delete props.suffix
    return slots
}

const buildWidthFull = props=> props.style = { width:"100%" }

const RenderFuncs = {
    "INPUT"     : props=>{
        return h(props.rows > 1?Textarea : Input, props, buildSlotWithPrefixAndSuffix(props))
    },
    "NUMBER"    : props=>{
        return h(InputNumber, props, buildSlotWithPrefixAndSuffix(props))
    },
    "TAGS"      : props=>{
        return h(InputTag, props)
    },
    "BUTTON"    : props=>{
        buildWidthFull(props)
        if(props.tip)   props.title = props.tip
        // arco design 默认的按钮类型为 secondary
        if(!props.type || props.type=='default')
            props.type = "secondary"
        return h(Button, props, ()=> props.label)
    },
    "SWITCH"    : props=> Switch,
    "SELECT"    : props=>{
        props.options = buildOptions(props.options)
        return h(Select, props)
    },
    "RADIO"     : props=>{
        props.options = buildOptions(props.options)
        if(props.button === true)   props.type="button"

        console.debug(props)
        return h(RadioGroup, props)
    },
    "CHECKBOX"  : props=>{
        let ps = {}
        if(!isNaN(props.max) && props.max>0) ps.max = props.max
        ps.options = buildOptions(props.options)

        return h(CheckboxGroup, ps)
    },
    "DATE"      : props=>{
        buildWidthFull(props)
        props['value-format'] = props.format
        return h(DatePicker, props)
    },
    "TEXT"      : (props, attrs)=> {
        let ps = { }
        ps[attrs._html===true?"innerHTML":"innerText"] = attrs._value
        return h('div', ps)
    },
    "FILE"      : FileSelector,
    "ALERT"     : (props, attrs)=>{
        let content = props.content
        delete props.content
        return h(Alert, props, ()=> attrs._html===true?h('div', {innerHTML: content}): content)
    },
    "DIVIDER"   : (props, attrs)=> h(Divider, props, ()=> attrs._value),
    "RATE"      : Rate,
    "COLOR"     : (props)=>{
        if(!!props.swatches) props['preset-colors'] = props.swatches.trim().split("\n")
        return h(ColorPicker, props)
    },
    "CARD"      : props=>h(Card, props),
}

export {
    FormRender,
    RenderFuncs
}
