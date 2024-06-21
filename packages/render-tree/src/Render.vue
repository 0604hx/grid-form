<!--对 WebComponent 的简单封装，方便在 Vue 环境中使用-->
<template>
    <div ref="container"></div>
</template>

<script setup>
    import { ref, onMounted, defineCustomElement } from 'vue'

    import { RenderProps } from '@grid-form/common/render.mixin'

    import Render from './Render.ce.vue'

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
