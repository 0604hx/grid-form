<template>
    <FormRender :renders="RenderFuncs" :form :initValue @submit="onSubmit" @failed="onFailed" @inited="onInited" debug />
</template>

<script setup>
    import { ref } from 'vue'
    import '@arco-design/web-vue/dist/arco.css'

    import { FormRender, RenderFuncs } from "@grid-form/render-arco"
    import { renderProps } from "."

    const props = defineProps(renderProps)
</script>
