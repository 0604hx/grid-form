<template>
    <!-- <FormRender :form :initValue @submit="onSubmit" @failed="onFailed" @inited="onInited" debug lockLabelPlacement="left"/> -->
    <div ref="container"></div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { ConfigProvider } from 'vant'
    import 'vant/lib/index.css'

    import { register } from "@grid-form/render-tree"

    register()
    import { useData } from 'vitepress'

    import { renderProps } from "."

    const { isDark } = useData()

    const props = defineProps(renderProps)

    const container = ref()

    onMounted(() => {
        const render = document.createElement('render-tree')
        Object.assign(render, props)

        render.debug = true

        props.onSubmit && render.addEventListener("submit", e=> props.onSubmit(...e.detail))
        props.onFailed && render.addEventListener("failed", e=> props.onFailed(...e.detail))
        props.onInited && render.addEventListener("inited", e=> props.onInited(...e.detail))

        container.value.appendChild(render)
    })
</script>
