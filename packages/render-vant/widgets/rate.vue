<template>
    <van-field :label="label" :disabled="disabled">
        <template #input>
            <van-rate v-model="shadow" :allow-half :count @change="onChange" />
        </template>
    </van-field>
</template>

<script>
    export default { inheritAttrs: false }
</script>

<script setup>
    import { ref, watch } from 'vue'
    import { Field as VanField, Rate as VanRate } from 'vant'

    const emits = defineEmits(['update:modelValue'])
    const props = defineProps({
        modelValue:{type: Number, default:undefined},
        label:{type:String, default:"评分"},
        disabled:{type:Boolean, default: false},
        "allow-half":Boolean,
        count:Number
    })

    let shadow = ref(props.modelValue)
    watch(()=> props.modelValue, ()=> shadow.value = props.modelValue)
    const onChange = v=> emits("update:modelValue", v)
</script>
