<!--文件选择框-->
<!--选择文件-->
<template>
    <n-input v-model:value="path" placeholder="点此选择文件或者目录" clearable readonly @click="toSelect" @clear="onClear">
        <template #prefix>选择文件</template>
    </n-input>
</template>

<script setup>
    import { ref } from 'vue'

    const props = defineProps({
        value:{type:String}
    })
    const emits = defineEmits(['update:value'])

    let path = ref(props.value)

    let selectDo = v=>{
        path.value = v
        emits('update:value', v)
    }

    let toSelect = ()=> {
        //使用原生 JS 选择文件
        let input = document.createElement("input")
        input.type = 'file'
        input.click()
        input.onchange = ()=>{
            console.debug(input.value)
            selectDo(input.value)
        }
    }

    let onClear = e=>{
        e.stopPropagation()
        emits('update:value', "")
    }
</script>
