<template>
    <n-form-item>
        <template #label>
            <n-tooltip v-if="summary" placement="left" trigger="hover">
                <template #trigger> <span style="cursor: help;">{{label}}</span> </template>
                {{summary}}
            </n-tooltip>
            <template v-else>{{label}}</template>
        </template>

        <n-space v-if="widget=='INPUT'" vertical size="small" style="width:100%">
            <n-input v-model:value="shadow" placeholder="请输入" @blur="onChange" :rows="rows" :size="isTextarea?'small':'medium'" :type="isTextarea?'textarea':'text'" :show-count="isTextarea">
                <template v-if="prefix" #prefix>{{prefix}}</template>
                <template v-if="suffix" #suffix>{{suffix}}</template>
            </n-input>
            <div v-if="isTextarea" style="text-align: right;">
                <n-button quaternary size="tiny" @click="largeEdit">大屏编辑</n-button>
            </div>
        </n-space>
        <n-input-number v-else-if="widget=='NUMBER'" class="w-full" v-model:value="shadow" placeholder="请输入数值" @blur="onChange" :min="min" :max="max">
            <template v-if="prefix" #prefix>{{prefix}}</template>
            <template v-if="suffix" #suffix>{{suffix}}</template>
        </n-input-number>
        <n-switch v-else-if="widget=='SWITCH'" v-model:value="shadow"  :on-update:value="onSwitchChange"/>
        <n-select v-else-if="widget=='SELECT'" v-model:value="shadow" :options="buildOptions(options)" :on-update:value="onSwitchChange" />
        <n-radio-group v-else-if="widget=='RADIO'" v-model:value="shadow" :on-update:value="onSwitchChange">
            <n-radio-button v-for="item in buildOptions(options)" :value="item.value" :label="item.label" />
        </n-radio-group>
    </n-form-item>
</template>

<script setup>
    import { ref, watch, toRaw, unref, h, nextTick } from 'vue'
    import { useDialog, NInput, NSpace, NTag } from 'naive-ui'

    import { buildOptions } from '@grid-form/common'

    const emits = defineEmits(["update:value"])
    const props = defineProps({
        label:{type:String},
        summary:{type:String},
        value:{ type:[String, Object, Array, Number, Boolean] },
        widget: {type: String, default:"INPUT"},
        prefix: {type:String},
        suffix: {type:String},
        min:{type:Number, default:undefined},
        max:{type:Number, default:undefined},
        options:{type:[String, Array, Object]},
        rows:{type:Number, default: 1 }
    })
    const dialog = useDialog()

    let shadow = ref(props.value)
    let isTextarea = ref(props.rows>1)

    let bigInput = ""

    /**
     * 对于 SWTICH 控件，单独处理（on-update:value 机制与其他不一样 =.=）
     */
    const onSwitchChange = v=>{
        if(v != props.value){
            shadow.value = v
            emits("update:value", v)
        }
    }
    const onChange = v=> {
        if(shadow.value != props.value)
            emits("update:value", toRaw(unref(shadow.value)))
    }

    const largeEdit = ()=>{
        dialog.create({
            showIcon: false,
            style:{width: "85%"},
            title: ()=>h(NSpace, {}, ()=>[h(NTag, {bordered:false, type:"primary"}, ()=>"大屏编辑"), props.label]),
            maskClosable:false,
            positiveText:"编辑完成",
            content: ()=> h(
                NInput,
                {
                    size:"small",
                    rows:20,
                    showCount:true,
                    type:"textarea",
                    defaultValue: shadow.value,
                    "on-update:value": v=> bigInput = v,
                    "on-keyup": e=>console.debug(e)
                }
            ),
            onPositiveClick: ()=> {
                shadow.value = bigInput
                onChange(bigInput)

                nextTick(()=> bigInput = "")
            }
        })
    }
</script>
