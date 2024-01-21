<template>
    <Basic :onRefresh title="表单渲染示例（Element Plus）">
        <template #left="{ form, onSubmit, onFailed, onInited }">
            <FormRender :renders="RenderFuncs" :form="form" @submit="onSubmit" @failed="onFailed" @inited="onInited" debug />
        </template>

        <template #result="{ type, title, data }">
            <el-tag :type>{{title}}</el-tag>{{data}}
        </template>
    </Basic>
</template>

<script setup>
    import { onMounted } from 'vue'
    import { ElMessage } from 'element-plus'

    import { FormRender, RenderFuncs } from "@grid-form/render-element"

    import Basic from "./basic.vue"

    const onRefresh = ()=> ElMessage(`表单已刷新`)

    onMounted(() => {
        ElMessage(`主页已经加载`)
    })
</script>

