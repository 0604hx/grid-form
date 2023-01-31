<template>
    <van-field :label="label">
        <template #input>
            <van-switch v-model="shadow" @change="onChange" />
        </template>
    </van-field>
</template>

<script setup>
    import { ref } from 'vue'

    const emits = defineEmits(['update:modelValue', 'change'])
    const props = defineProps({
        modelValue:{type: Boolean, default:undefined},
        label:{type:String, default:"开关项"},
    })

    let shadow = ref(props.modelValue)
    const onChange = v=> emits("update:modelValue", v)
</script>
