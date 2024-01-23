import { h } from 'vue'

import { ElInput, ElTag, ElAlert, ElCard, ElInputNumber, ElSwitch, ElSelect, ElOption, ElRadioGroup, ElRadioButton, ElRadio, ElCheckboxGroup, ElCheckbox, ElDatePicker, ElText, ElButton, ElRate, ElColorPicker, ElDivider } from "element-plus"
import { buildOptions  } from '@grid-form/common'

import Tags from "./widgets/tags.vue"
import FileSelector from "./widgets/fileSelector.vue"
import FormRender from "./Render.vue"

const buildTag = text=> ()=>h(ElTag, {type:"", size:"small"}, ()=>text)

const buildSlotWithPrefixAndSuffix = props=>{
    let _prefix = props.prefix
    let _suffix = props.suffix

    delete props.prefix
    delete props.suffix
    return {
        prefix: _prefix? buildTag(_prefix): undefined,
        suffix: _suffix? buildTag(_suffix): undefined
    }
}

const buildWidthFull = props=> props.style = { width:"100%" }
const buildClosable = props=> props.closable = props.closable === true

const RenderFuncs = {
    "INPUT"     : props=>{
        let isTextarea = props.rows>1
        if(isTextarea)      props.type = 'textarea'
        props["show-word-limit"]    = props['show-count'] === true

        return h(
            ElInput,
            props,
            // prefix,suffix 只对非 textarea 有效
            isTextarea? undefined: buildSlotWithPrefixAndSuffix(props)
        )
    },
    "NUMBER"    : props=>{
        buildWidthFull(props)
        return h(ElInputNumber, props)
    },
    "TAGS"      : (props)=>h(Tags, props),
    "BUTTON"    : props=>{
        buildWidthFull(props)
        if(props.tip)   props.title = props.tip
        return h(ElButton, props, ()=> props.label)
    },

    "SWITCH"    : ElSwitch,
    "SELECT"    : (props)=>{
        return h(ElSelect, props, ()=> buildOptions(props.options).map(o=> h(ElOption, o)))
    },
    "RADIO"     : (props)=>{
        let options = buildOptions(props.options)
        let com = props.button===true? ElRadioButton:ElRadio
        // props.value = attrs._value
        return h(ElRadioGroup, props, ()=> options.map(o=> h(com, o)))
    },
    "CHECKBOX"  : (props)=>{
        let options = buildOptions(props.options)
        let ps = {}
        if(!isNaN(props.min) && props.min>0) ps.min = props.min
        if(!isNaN(props.max) && props.max>0) ps.max = props.max

        return h(ElCheckboxGroup, ps, ()=> options.map(o=> h(ElCheckbox, {label: o.value}, ()=>o.label)))
    },
    "DATE"      : props=> {
        buildWidthFull(props)
        if(props.format.indexOf("yyyy")>=0) props.format = props.format.toUpperCase()
        props.valueFormat = props.format
        return h(ElDatePicker, props)
    },
    "FILE"      : FileSelector,
    "RATE"      : props=>{
        props.max = props.count
        return h(ElRate, props)
    },
    "COLOR"     : (props, attrs)=>{
        if(!!props.swatches) {
            props.predefine = props.swatches.trim().split("\n")
            delete props.swatches
        }
        return h(ElColorPicker, props)
    },

    "TEXT"      : (props, attrs)=>{
        props.style = { fontSize: props['font-size']+"px"}
        return h(ElText, props, ()=> {
            return attrs._html===true? h('div', {innerHTML: attrs._value}) : attrs._value
        })
    },

    "ALERT"     : (props, attrs)=>{
        buildWidthFull(props)

        props.showIcon = true
        let content = props.content
        delete props.content
        buildClosable(props)

        return h(ElAlert, props, ()=> attrs._html===true? h('div', {innerHTML: content}) : content)
    },
    "DIVIDER"   : (props, attrs)=>{
        if(props.dashed==true)  props['border-style'] ="dashed"
        props['content-position'] = props['title-placement']
        return h(ElDivider, props, ()=> attrs._value)
    },
    "CARD"      : props=> h(ElCard, { header: props.title, style:{ width:"100%"} })
}

export {
    FormRender,
    RenderFuncs
}
