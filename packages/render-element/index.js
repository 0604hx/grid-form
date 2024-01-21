import { h } from 'vue'

import { ElInput, ElTag, ElAlert, ElCard, ElInputNumber } from "element-plus"
import { buildOptions  } from '@grid-form/common'

import FormRender from "./Render.vue"

const buildTag = text=> ()=>h(ElTag, {type:"primary", size:"small"}, text)

const buildSlotWithPrefixAndSuffix = props=>{
    return {
        prefix: props.prefix? buildTag(props.prefix): undefined,
        suffix: props.suffix? buildTag(props.suffix): undefined
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
    // "TAGS"      : (props)=>{
    //     return h(NDynamicTags, props)
    // },

    // "SWITCH"    : NSwitch,
    // "SELECT"    : (props, attrs)=>{
    //     props.options = buildOptions(props.options)
    //     return h(NSelect, props)
    // },
    // "RADIO"     : (props, attrs)=>{
    //     let options = buildOptions(props.options)
    //     let com = props.button===true? NRadioButton:NRadio
    //     props.value = attrs._value
    //     return h(NRadioGroup, props, ()=> options.map(o=> h(com, o)))
    // },
    // "CHECKBOX"  : (props, attrs)=>{
    //     let options = buildOptions(props.options)
    //     let ps = {}
    //     if(!isNaN(props.min) && props.min>0) ps.min = props.min
    //     if(!isNaN(props.max) && props.max>0) ps.max = props.max

    //     return h(NCheckboxGroup, ps, ()=> options.map(o=> h(NCheckbox, {value: o.value, label:o.label})))
    // },
    // "DATE"      : props=> {
    //     buildWidthFull(props)
    //     return h(NDatePicker, props)
    // },

    // "TEXT"      : (props, attrs)=>{
    //     props.style = { fontSize: props['font-size']+"px"}
    //     return h(NText, props, ()=> {
    //         return attrs._html===true? h('div', {innerHTML: attrs._value}) : attrs._value
    //     })
    // },
    // "FILE"      : FileSelector,
    "ALERT"     : (props, attrs)=>{
        buildWidthFull(props)

        props.showIcon = true
        let content = props.content
        delete props.content
        buildClosable(props)

        console.debug(props)
        return h(ElAlert, props, ()=> attrs._html===true? h('div', {innerHTML: content}) : content)
    },
    // "DIVIDER"   : (props, attrs)=>h(NDivider, props, ()=> attrs._value),
    // "RATE"      : NRate,
    // "COLOR"     : (props, attrs)=>{
    //     if(!!props.swatches) props.swatches = props.swatches.trim().split("\n")
    //     return h(NColorPicker, props)
    // },
    "CARD"      : props=> h(ElCard, { header: props.title, style:{ width:"100%"} })
}

export {
    FormRender,
    RenderFuncs
}
