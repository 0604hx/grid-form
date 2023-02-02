<!--文件选择框-->
<!--选择文件-->
<template>
    <n-input v-model:value="path" :placeholder="placeholder" clearable readonly @click="toSelect" @clear="onClear">
        <template #prefix> <n-tag size="small" type="default" :bordered="false">选择文件</n-tag> </template>
        <template #suffix> <n-tag size="small" type="primary" :bordered="false">{{maxSize}}MB</n-tag> </template>
    </n-input>
</template>

<script setup>
    import { ref } from 'vue'
    import { useMessage } from "naive-ui"

    const message = useMessage()

    const emits = defineEmits(['update:value', "select"])
    const props = defineProps({
        value:{type:[String, Object, File]},
        placeholder: {type:String, default:"请选择文件"},
        accept:{type:String, default:"image/*"},
        acceptCustom:{type:String, default:undefined},
        maxSize:{type:Number, default: 5 },
        dataType:{type:String, default:""}
    })

    let maxFileSize = props.maxSize * 1024 * 1024

    let path = ref(props.value)

    let selectDo = (name, v)=>{
        path.value = name
        emits('update:value', v)
    }

    let toSelect = ()=> {
        //使用原生 JS 选择文件
        let input = document.createElement("input")
        input.type = 'file'
        input.accept = props.accept
        input.click()
        input.onchange = e=>{
            let file = e.target.files[0]
            if(!!file){
                if(file.size >= maxFileSize)  return message.warning(`${file.name}超出大小限制（${props.maxSize} MB）`)

                if(props.dataType!=""){
                    let reader = new FileReader()
                    reader.onload = ee=>{
                        let { readyState, result } = ee.target
                        selectDo(file.name, result)
                    }

                    if(props.dataType == 'base64')
                        reader.readAsDataURL(file)
                    else if(props.dataType === 'text')
                        reader.readAsText(file)
                    else
                        reader.readAsBinaryString(file)
                }
                else
                    selectDo(file.name, file)
            }
        }
    }

    let onClear = e=>{
        e.stopPropagation()
        emits('update:value', "")
    }
</script>
