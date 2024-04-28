<!--二次封装数字输入-->
<template>
    <Input :placeholder :variant :clearable v-model="shadow" type="number" @change="onChange" />
</template>

<script setup>
    import { ref, watch } from 'vue'

    import { Input } from '@varlet/ui'

    import Span from "./span.vue"
    const emits = defineEmits(['update:modelValue'])
    const props = defineProps({
        modelValue:{type: [String, Number], default:undefined},
        placeholder: String,
        variant:{ type:String, default: "standard"},
        clearable:Boolean,
    })

    const toVal = ()=>`${props.modelValue}`

    let shadow = ref(toVal())
    watch(()=> props.modelValue, ()=> shadow.value = toVal())
    const onChange = v=> emits("update:modelValue", Number(v))
</script>
