<template>
    <button>{{form.title}}</button>
</template>

<script setup>
    import { onMounted } from 'vue'
    import { buildComponent, buildOptions } from '@grid-form/common'
    import { default as RenderMixin, RenderEvent, RenderProps } from '@grid-form/common/render.mixin'

    const emits = defineEmits(RenderEvent)
    const props = defineProps(RenderProps)

    onMounted(() => {
        console.debug(props.form)
    })
</script>
