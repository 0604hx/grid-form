<template>
    <FormRender :renders="RenderFuncs" :form @submit="onSubmit" @failed="onFailed" @inited="onInited" debug />
</template>

<script setup>
    import { ref } from 'vue'
    import 'element-plus/dist/index.css'
    import 'element-plus/theme-chalk/dark/css-vars.css'

    import { FormRender, RenderFuncs } from "@grid-form/render-element"

    const props = defineProps({
        form: {type:Object, default:{}},
        onSubmit: {type:Function},
        onInited: {type:Function},
        onFailed: {type:Function}
    })
</script>
