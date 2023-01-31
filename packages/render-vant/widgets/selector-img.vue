<!--图片上传组件，事先转换为 BASE4（需后端进行文件还原）-->
<template>
    <van-field :label="label">
        <template #input>
            <van-uploader v-model="shadow" :after-read="onChange" :before-read="dealWithFile" :preview-size="120" :max-count="maxCount" />
        </template>
    </van-field>
</template>

<script setup>
    import { ref } from 'vue'
    import { showDialog } from 'vant'

    import Compressor from 'compressorjs'
    import { formatFileSize } from "@grid-form/common"

    const emits = defineEmits(['update:modelValue', 'change'])
    const props = defineProps({
        modelValue:{type: Object, default:undefined},
        label:{type:String, default:"下拉选择"},
        placeholder: {type:String, default:"请选择"},
        options:{type:[String, Array, Object]},
        maxSize:{type:Number, default: 5*1024*1024 },
        maxCount: {type:Number, default: 1}
    })

    let show = ref(false)
    let shadow = ref(props.modelValue)

    let dealWithFile = (file, detail)=>{
        return new Promise((ok, fail)=>{
            if(file.size > props.maxSize){
                showDialog({ title: `图片不能超过${formatFileSize(props.maxSize)}`, message:`当前选择图片 ${formatFileSize(file.size)}`})
                return fail()
            }
            ok(file)
            // new Compressor(file, {
            //     quality : 0.8,
            //     success : result=>ok(result),
            //     error   : e=> showDialog({ title: '图片预处理出错', message: e.message})
            // })
        })
    }

    let onChange = d=> emits("update:modelValue", { data: d.content, name: d.file.name, size: d.file.size })
</script>
