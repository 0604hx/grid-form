<!--图片上传组件，事先转换为 BASE4（需后端进行文件还原）-->
<template>
    <van-field :label="label">
        <template #input>
            <van-uploader v-model="shadow" :disabled="disabled" :after-read="onChange" :accept="accept" :max-size="maxSize" :preview-size="120" :max-count="maxCount" />
        </template>
    </van-field>
</template>

<script>
    export default { inheritAttrs: false }
</script>

<script setup>
    import { ref } from 'vue'
    import { Field as VanField, Uploader as VanUploader } from 'vant'

    const emits = defineEmits(['update:modelValue', 'change'])
    const props = defineProps({
        modelValue:{type: Object, default:undefined},
        label:{type:String, default:"下拉选择"},
        placeholder: {type:String, default:"请选择"},
        accept:{type:String, default:"image/*"},
        maxSize:{type:Number, default: 5*1024*1024 },
        disabled:{type:Boolean, default: false},
        maxCount: {type:Number, default: 1}
    })

    let show = ref(false)
    let shadow = ref(props.modelValue)

    let onChange = d=> emits("update:modelValue", { data: d.content, name: d.file.name, size: d.file.size })
</script>
