<template>
    <van-field :label="label" :disabled="disabled">
        <template #input>
            <van-radio-group @change="onChange" v-model="shadow" :direction="vertical?'vertical':'horizontal'">
                <van-radio v-for="item in options" :name="item.value">{{item.label}}</van-radio>
            </van-radio-group>
        </template>
    </van-field>
</template>

<script>
    export default { inheritAttrs: false }
</script>

<script setup>
    import { ref, watch } from 'vue'
    import { Field as VanField, RadioGroup as VanRadioGroup, Radio as VanRadio } from 'vant'

    const emits = defineEmits(['update:modelValue'])
    const props = defineProps({
        modelValue:{type: [String, Number], default:undefined},
        label:{type:String, default:"单选框"},
        options:{type:Array},
        disabled:{type:Boolean, default: false},
        vertical:{type:Boolean, default:false}
    })

    let shadow = ref(props.modelValue)
    watch(()=> props.modelValue, ()=> shadow.value = props.modelValue)
    const onChange = v=> emits("update:modelValue", v)
</script>
