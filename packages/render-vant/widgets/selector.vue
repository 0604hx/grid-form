<!--弹出选择器-->
<template>
    <van-field v-model="shadow" is-link readonly name="picker" :label="label" :placeholder="placeholder" @click="show = true" />
    <van-popup v-model:show="show" position="bottom">
        <van-picker :columns="options" @confirm="onConfirm" @cancel="show = false" />
    </van-popup>
</template>

<script setup>
    import { ref } from 'vue'

    const emits = defineEmits(['update:modelValue', 'change'])
    const props = defineProps({
        modelValue:{type: String, default:undefined},
        label:{type:String, default:"下拉选择"},
        placeholder: {type:String, default:"请选择"},
        options:{type:[String, Array, Object]}
    })

    let show = ref(false)
    let shadow = ref(props.modelValue)

    let onConfirm = ({ selectedOptions }) => {
        show.value = false
        let item = selectedOptions[0]
        emits("update:modelValue", item.value)
        shadow.value = item.text
    }
</script>
