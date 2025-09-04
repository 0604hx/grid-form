<template>
    <Input v-model:value="path" :disabled="disabled" :placeholder="placeholder" clearable readonly @click="toSelect" @clear="onClear">
        <template #prefix> <Tag size="small" type="default" :bordered="false">选择文件</Tag> </template>
        <template #suffix> <Tag size="small" type="primary" :bordered="false">{{maxSize}}MB</Tag> </template>
    </Input>
</template>

<script>
    export default { inheritAttrs: false }
</script>

<script setup>
    import { ref } from 'vue'
    import { Input, Tag } from '@arco-design/web-vue'

    import { selectFile  } from '@grid-form/common'

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

        selectFile(props).then(({name, result})=> selectDo(name, result))
    }

    let onClear = e=>{
        e.stopPropagation()
        emits('update:value', "")
    }
</script>
