import { h } from 'vue'
import { NInput, NInputNumber, NDatePicker, NSwitch, NSelect, NText, NRadioGroup, NRadio, NRadioButton, NAlert, NDivider, NRate, NCheckboxGroup, NCheckbox, NColorPicker, NDynamicTags } from 'naive-ui'

import FileSelector from "./widgets/FileSelector.vue"
import FormRender from "./Render.vue"

const buildSlotWithPrefixAndSuffix = props=>{
    let slots = {}
    if(!!props.prefix){
        let prefix = props.prefix
        slots.prefix = ()=> prefix
    }
    if(!!props.suffix){
        let suffix = props.suffix
        slots.suffix = ()=> suffix
    }
    delete props.prefix
    delete props.suffix
    return slots
}

const buildWidthFull = props=> props.style = { width:"100%" }

const RenderFuncs = {
    "INPUT"     : props=>{
        if(props.rows > 1)  props.type = "textarea"

        return h(NInput, props, buildSlotWithPrefixAndSuffix(props))
    },
    "NUMBER"    : props=>{
        buildWidthFull(props)
        return h(NInputNumber, props, buildSlotWithPrefixAndSuffix(props))
    },
    "TAGS"      : (props)=>{
        return h(NDynamicTags, props)
    },

    "SWITCH"    : NSwitch,
    "SELECT"    : (props, attrs)=>{
        props.options = buildOptions(props.options)
        return h(NSelect, props)
    },
    "RADIO"     : (props, attrs)=>{
        let options = buildOptions(props.options)
        let com = props.button===true? NRadioButton:NRadio
        props.value = attrs._value
        return h(NRadioGroup, props, ()=> options.map(o=> h(com, o)))
    },
    "CHECKBOX"  : (props, attrs)=>{
        let options = buildOptions(props.options)
        let ps = {}
        if(!isNaN(props.min) && props.min>0) ps.min = props.min
        if(!isNaN(props.max) && props.max>0) ps.max = props.max

        return h(NCheckboxGroup, ps, ()=> options.map(o=> h(NCheckbox, {value: o.value, label:o.label})))
    },
    "DATE"      : props=> {
        buildWidthFull(props)
        return h(NDatePicker, props)
    },

    "TEXT"      : (props, attrs)=>{
        props.style = { fontSize: props['font-size']+"px"}
        return h(NText, props, ()=> {
            return attrs._html===true? h('div', {innerHTML: attrs._value}) : attrs._value
        })
    },
    "FILE"      : FileSelector,
    "ALERT"     : (props, attrs)=>{
        buildWidthFull(props)

        let content = props.content
        delete props.content
        return h(NAlert, props, ()=> attrs._html===true? h('div', {innerHTML: content}) : content)
    },
    "DIVIDER"   : (props, attrs)=>h(NDivider, props, ()=> attrs._value),
    "RATE"      : NRate,
    "COLOR"     : (props, attrs)=>{
        if(!!props.swatches) props.swatches = props.swatches.trim().split("\n")
        return h(NColorPicker, props)
    }
}

export {
    FormRender,
    RenderFuncs
}
