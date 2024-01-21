<template>
    <Basic :onRefresh title="表单渲染示例（Naive UI）">
        <template #left="{ form, onSubmit, onFailed, onInited }">
            <FormRender :renders="RenderFuncs" :form="form" @submit="onSubmit" @failed="onFailed" @inited="onInited" debug />
        </template>

        <template #result="{ type, title, data }">
            <n-tag :type>{{title}}</n-tag>{{data}}
        </template>
    </Basic>
</template>

<script setup>
    import { useMessage } from 'naive-ui'

    import { FormRender, RenderFuncs } from "@grid-form/render-naive"

    import Basic from "./basic.vue"

    const message = useMessage()

    const onRefresh = ()=> message.info(`表单已刷新`)
</script>

