<template>
    <van-field :label="label" :disabled="disabled">
        <template #input>
            <van-checkbox-group v-model="shadow" @change="onChange" :max="max">
                <van-space wrap :direction="vertical?'vertical':'horizontal'">
                    <van-checkbox v-for="(op, opIndex) in options" :name="op.value" shape="square">{{op.label}}</van-checkbox>
                </van-space>
            </van-checkbox-group>
        </template>
    </van-field>
</template>

<script>
    export default { inheritAttrs: false }
</script>

<script setup>
    import { ref, watch } from 'vue'
    import { Field as VanField, CheckboxGroup as VanCheckboxGroup, Space as VanSpace, Checkbox as VanCheckbox } from 'vant'

    const emits = defineEmits(['update:modelValue'])
    const props = defineProps({
        modelValue:{type: Array, default:undefined},
        label:{type:String, default:"复选框"},
        options:{type:Array},
        disabled:{type:Boolean, default: false},
        vertical:{type:Boolean, default:false},
        max:{type:Number, default:0}
    })

    let shadow = ref(props.modelValue)
    watch(()=> props.modelValue, ()=> shadow.value = props.modelValue)
    const onChange = names=> emits("update:modelValue", names)
</script>
