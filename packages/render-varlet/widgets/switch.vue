<template>
    <div style="display: flex;">
        <Span :text="placeholder" />
        <Switch :variant="variant!='standard'" v-model="shadow" @change="onChange" />
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'

    import { Switch } from '@varlet/ui'

    import Span from "./span.vue"
    const emits = defineEmits(['update:modelValue', 'change'])
    const props = defineProps({
        modelValue:{type: Boolean, default:undefined},
        placeholder: String,
        variant:{ type:String, default: "standard"}
    })

    let shadow = ref(props.modelValue)
    watch(()=> props.modelValue, ()=> shadow.value = props.modelValue)
    const onChange = v=> emits("update:modelValue", v)
</script>
