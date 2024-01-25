<!--在 JS 中直接使用从 vant 导入的 Field 不能继承父 van-form 的对齐方式，通过 SFC 的方式则OK-->
<template>
    <van-field v-model="shadow" :label="label" :placeholder="placeholder" :required="required"
        :showWordLimit="showWordLimit" :clearable="clearable" :disabled="disabled" :rows="rows"
        :maxlength="maxlength" :type="type" @update:model-value="v=>emits('update:modelValue', v)" />
</template>

<script>
    export default { inheritAttrs: false }
</script>

<script setup>
    import { ref, watch } from 'vue'

    const emits = defineEmits(['update:modelValue', 'change'])
    const props = defineProps({
        modelValue:{type: [Number, String], default:undefined},
        label:{type:String},
        required:{type:Boolean, default:false},
        placeholder:{type:String, default:"请输入"},
        showWordLimit:{type:Boolean, default:false},
        clearable:{type:Boolean, default: false},
        disabled:{type:Boolean, default: false},
        rows:{type:Number},
        maxlength:{type:[Number, String]},
        type:{type:String, default:"text"}
    })

    let shadow = ref(props.modelValue)
    watch(()=> props.modelValue, ()=> shadow.value = props.modelValue)
</script>
