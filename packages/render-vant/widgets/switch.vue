<template>
    <van-field :label="label" :disabled="disabled">
        <template #input>
            <van-switch v-model="shadow" @change="onChange" />
        </template>
    </van-field>
</template>

<script>
    export default { inheritAttrs: false }
</script>

<script setup>
    import { ref, watch } from 'vue'
    import { Field as VanField, Switch as VanSwitch } from 'vant'

    const emits = defineEmits(['update:modelValue', 'change'])
    const props = defineProps({
        modelValue:{type: Boolean, default:undefined},
        disabled:{type:Boolean, default: false},
        label:{type:String, default:"开关项"},
    })

    let shadow = ref(props.modelValue)
    watch(()=> props.modelValue, ()=> shadow.value = props.modelValue)
    const onChange = v=> emits("update:modelValue", v)
</script>
