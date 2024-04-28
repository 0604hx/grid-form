<template>
    <FormRender :renders="RenderFuncs" :form :initValue @submit="onSubmit" @failed="onFailed" @inited="onInited" debug lockLabelPlacement="left"/>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    import { StyleProvider, Themes } from '@varlet/ui'
    import '@varlet/touch-emulator'
    import '@varlet/ui/es/style'

    import { FormRender, RenderFuncs } from "@grid-form/render-varlet"

    import { useData } from 'vitepress'

    import { renderProps } from "."

    const { isDark } = useData()

    const props = defineProps(renderProps)

    onMounted(() => {
        StyleProvider(isDark==true ? Themes.md3Dark : Themes.md3Light)
    })
</script>
