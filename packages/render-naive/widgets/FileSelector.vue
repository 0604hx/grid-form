<template>
    <n-input v-model:value="path" :disabled="disabled" :placeholder="placeholder" clearable readonly @click="toSelect" @clear="onClear">
        <template #prefix> <n-tag size="small" type="default" :bordered="false">选择文件</n-tag> </template>
        <template #suffix> <n-tag size="small" type="primary" :bordered="false">{{maxSize}}MB</n-tag> </template>
    </n-input>
</template>

<script>
    export default { inheritAttrs: false }
</script>

<script setup>
    import { ref } from 'vue'
    import { useMessage, NInput, NTag } from "naive-ui"

    import { selectFile  } from '@grid-form/common'

    const message = useMessage()

    const emits = defineEmits(['update:value', "select"])
    const props = defineProps({
        value:{type:[String, Object, File]},
        placeholder: {type:String, default:"请选择文件"},
        accept:{type:String, default:"image/*"},
        acceptCustom:{type:String, default:undefined},
        maxSize:{type:Number, default: 5 },
        disabled:{type:Boolean, default: false},
        dataType:{type:String, default:""}
    })

    let path = ref(props.value)

    let selectDo = (name, v)=>{
        path.value = name
        emits('update:value', v)
    }

    let toSelect = ()=> {
        if(props.disabled === true) return

        selectFile(props).then(({name, result})=> selectDo(name, result)).catch(msg=> message.warning(msg))
    }

    let onClear = e=>{
        e.stopPropagation()
        emits('update:value', "")
    }
</script>
