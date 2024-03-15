<template>
    <FormRender :renders="RenderFuncs" :form :initValue @submit="onSubmit" @failed="onFailed" @inited="onInited" debug />
</template>

<script setup>
    import { ref } from 'vue'
    import 'element-plus/dist/index.css'
    import 'element-plus/theme-chalk/dark/css-vars.css'

    import { FormRender, RenderFuncs } from "@grid-form/render-element"

    import { renderProps } from "."

    const props = defineProps(renderProps)
</script>
