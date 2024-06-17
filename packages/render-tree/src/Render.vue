<template>
    <!-- <FormRender :form :initValue @submit="onSubmit" @failed="onFailed" @inited="onInited" debug lockLabelPlacement="left"/> -->
    <div ref="container"></div>
</template>

<script setup>
    import { ref, onMounted, defineCustomElement } from 'vue'

    import { useData } from 'vitepress'

    import { RenderProps } from '@grid-form/common/render.mixin'

    import Render from './Render.ce.vue'

    const { isDark } = useData()

    const props = defineProps(Object.assign(RenderProps, {
        onSubmit: {type:Function},
        onInited: {type:Function},
        onFailed: {type:Function}
    }))
    const container = ref()

    onMounted(() => {
        customElements.define("render-tree", defineCustomElement(Render))

        const render = document.createElement('render-tree')
        Object.assign(render, props)

        render.debug = true

        props.onSubmit && render.addEventListener("submit", e=> props.onSubmit(...e.detail))
        props.onFailed && render.addEventListener("failed", e=> props.onFailed(...e.detail))
        props.onInited && render.addEventListener("inited", e=> props.onInited(...e.detail))

        container.value.appendChild(render)
    })
</script>
