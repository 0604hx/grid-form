<template>
    <n-form-item>
        <template #label>
            <n-tooltip v-if="summary" placement="left" trigger="hover">
                <template #trigger> <span class="cursor-help">{{label}}</span> </template>
                {{summary}}
            </n-tooltip>
            <template v-else>{{label}}</template>
        </template>

        <n-input v-if="widget=='INPUT'" v-model:value="shadow" placeholder="请输入" @blur="onChange" :rows="rows" :type="rows>1?'textarea':'text'">
            <template v-if="prefix" #prefix>{{prefix}}</template>
            <template v-if="suffix" #suffix>{{suffix}}</template>
        </n-input>
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
    import { ref, watch, toRaw, unref } from 'vue'

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
        options:{type:[String, Array]},
        rows:{type:Number, default: 1 }
    })

    let shadow = ref(props.value)

    // watch(shadow, v=>{
    //     if(props.widget != "SWITCH") return

    //     if(shadow.value != props.value)
    //         emits("update:value", _raw(shadow.value))
    // })
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
</script>
