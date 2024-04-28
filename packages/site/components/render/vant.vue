<template>
    <config-provider :theme="isDark?'dark':''">
        <FormRender :renders="RenderFuncs" :form :initValue @submit="onSubmit" @failed="onFailed" @inited="onInited" debug lockLabelPlacement="left"/>
    </config-provider>
</template>

<script setup>
    import { ref } from 'vue'
    import { ConfigProvider } from 'vant'
    import 'vant/lib/index.css'

    import { FormRender, RenderFuncs } from "@grid-form/render-vant"

    import { useData } from 'vitepress'

    import { renderProps } from "."

    const { isDark } = useData()

    const props = defineProps(renderProps)
</script>
