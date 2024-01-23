<!--文件选择框-->
<!--选择文件-->
<template>
    <el-input v-model="path" :disabled="disabled" :placeholder="placeholder" clearable readonly @click="toSelect" @clear="onClear">
        <template #prefix> <el-tag size="small" type="info" :bordered="false">选择文件</el-tag> </template>
        <template #suffix> <el-tag size="small" :bordered="false">{{maxSize}}MB</el-tag> </template>
    </el-input>
</template>

<script>
    export default { inheritAttrs: false }
</script>

<script setup>
    import { ref } from 'vue'
    import { ElMessage } from 'element-plus'

    import { selectFile  } from '@grid-form/common'

    const emits = defineEmits(['update:modelValue', "select"])
    const props = defineProps({
        modelValue:{type:[String, Object, File]},
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
        emits('update:modelValue', v)
    }

    let toSelect = ()=> {
        if(props.disabled === true) return

        selectFile(props).then(({name, result})=> selectDo(name, result)).catch(msg=> ElMessage(msg))
    }

    let onClear = e=>{
        e.stopPropagation()
        emits('update:modelValue', "")
    }
</script>
