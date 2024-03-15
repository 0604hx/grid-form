<template>
    <FormRender :renders="RenderFuncs" :form :initValue @submit="onSubmit" @failed="onFailed" @inited="onInited" debug />
</template>

<script setup>
    import { ref } from 'vue'

    import { FormRender, RenderFuncs } from "@grid-form/render-naive"
    import { renderProps } from "."

    const props = defineProps(renderProps)
</script>
