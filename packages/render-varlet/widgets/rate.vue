<template>
    <div style="display: flex;">
        <Span :text="placeholder" />
        <div>
            <Rate v-model="shadow" @change="onChange" :count :half />
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'

    import { Rate } from '@varlet/ui'

    import Span from "./span.vue"
    const emits = defineEmits(['update:modelValue', 'change'])
    const props = defineProps({
        modelValue:{type: Boolean, default:undefined},
        placeholder: String,
        count:{type:Number, default:5},
        half:Boolean
    })

    let shadow = ref(props.modelValue)
    watch(()=> props.modelValue, ()=> shadow.value = props.modelValue)
    const onChange = v=> emits("update:modelValue", v)
</script>
